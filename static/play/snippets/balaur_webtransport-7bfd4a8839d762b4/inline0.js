
export function bt_open(url, hashes, on_open, on_reliable, on_datagram, on_closed) {
  const options = {};
  // A self-signed server is pinned by hash, which is the only form a browser
  // accepts for one — and only while the certificate is under two weeks old.
  if (hashes && hashes.length) {
    options.serverCertificateHashes = hashes.map(
      (value) => ({ algorithm: "sha-256", value })
    );
  }
  let wt;
  try {
    wt = new WebTransport(url, options);
  } catch (e) {
    on_closed(String(e));
    return null;
  }
  const handle = { wt, reliable: null, datagrams: null, closed: false };
  const die = (e) => { handle.closed = true; on_closed(String(e)); };
  wt.closed.then(() => die("the peer closed the session")).catch(die);
  wt.ready.then(async () => {
    const stream = await wt.createBidirectionalStream();
    handle.reliable = stream.writable.getWriter();
    handle.datagrams = wt.datagrams.writable.getWriter();
    on_open();
    pipe(stream.readable.getReader(), on_reliable, die);
    pipe(wt.datagrams.readable.getReader(), on_datagram, die);
  }).catch(die);
  return handle;
}

// One read loop per channel. A reader that ends is the session ending, which
// `wt.closed` reports too, so this only has to stop.
async function pipe(reader, deliver, die) {
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) return;
      if (value) deliver(value);
    }
  } catch (e) { die(e); }
}

export function bt_send(handle, bytes, reliable) {
  if (!handle || handle.closed) return;
  const writer = reliable ? handle.reliable : handle.datagrams;
  // Before `ready` settles there is no writer; the engine refuses sends until
  // the link reports Open, so this is belt and braces.
  if (writer) writer.write(bytes).catch(() => {});
}

export function bt_close(handle) {
  if (!handle || handle.closed) return;
  handle.closed = true;
  try { handle.wt.close(); } catch (e) { /* already gone */ }
}
