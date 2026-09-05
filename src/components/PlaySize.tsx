import type {ReactNode} from 'react';
import size from '@site/src/play-size.json';

// The engine module the site serves under /play/ — what /editor and the
// examples run — as the download a player pays for. scripts/gen-play-size.mjs measures it on every build.
const mb = (bytes: number) => (bytes / 1048576).toFixed(1);

export default function PlaySize(): ReactNode {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <code>balaur_bg.wasm</code>
            {size.engine ? ` (engine ${size.engine})` : ''}
          </th>
          <th>MB</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>raw</td>
          <td>{mb(size.raw)}</td>
        </tr>
        <tr>
          <td>gzip</td>
          <td>{mb(size.gzip)}</td>
        </tr>
        <tr>
          <td>brotli</td>
          <td>{mb(size.brotli)}</td>
        </tr>
      </tbody>
    </table>
  );
}
