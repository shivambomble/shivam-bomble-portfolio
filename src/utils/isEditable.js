// True for elements that accept text input. Global keyboard shortcuts and game
// controls must never intercept keystrokes aimed at these.
export default function isEditable(el) {
  return (
    el instanceof HTMLElement &&
    (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)
  );
}
