import { useEffect } from "react";

// Green arrow cursor SVG encoded as data URI
const CURSOR_ARROW = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M6 4L6 26L12 20L18 28L22 26L16 18L24 18Z' fill='%2310b981' stroke='%23047857' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E") 6 4, auto`;

// Green crosshair cursor for interactive elements
const CURSOR_HAND = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='8' fill='none' stroke='%2310b981' stroke-width='1.5'/%3E%3Cline x1='12' y1='4' x2='12' y2='8' stroke='%2310b981' stroke-width='1.5'/%3E%3Cline x1='12' y1='16' x2='12' y2='20' stroke='%2310b981' stroke-width='1.5'/%3E%3Cline x1='4' y1='12' x2='8' y2='12' stroke='%2310b981' stroke-width='1.5'/%3E%3Cline x1='16' y1='12' x2='20' y2='12' stroke='%2310b981' stroke-width='1.5'/%3E%3C/svg%3E") 12 12, pointer`;

export default function CustomCursor() {
  useEffect(() => {
    if ("ontouchstart" in window) return;

    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent = `
      *, *::before, *::after {
        cursor: ${CURSOR_ARROW} !important;
      }
      a, a *, button, button *, input, textarea, [role="button"], [onclick] {
        cursor: ${CURSOR_HAND} !important;
      }
    `;
    document.head.appendChild(style);

    return () => style.remove();
  }, []);

  return null;
}
