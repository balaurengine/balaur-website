import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// The search box takes one chord per platform: ⌘K on a Mac, Ctrl+K everywhere
// else. This adds the other one, so both keys open search on any machine, the
// way the editor answers to both.
if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    // The theme's own listener is on `document`, so it has already run and
    // claimed the chord this platform owns. Matched on `key`, as that one is,
    // so the two behave alike on a layout that moves the letter.
    if (event.defaultPrevented || (event.key ?? '').toLowerCase() !== 'k') return;
    if (event.altKey || event.shiftKey || !(event.metaKey || event.ctrlKey)) return;
    const input = document.querySelector<HTMLInputElement>('.navbar__search-input');
    if (input === null) return;
    event.preventDefault();
    input.focus();
  });
}
