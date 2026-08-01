"use client";

import { useEffect } from "react";

export function useKeyboardShortcuts(shortcuts: Array<{ key: string; meta?: boolean; ctrl?: boolean; shift?: boolean; handler: () => void }>) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const match = shortcuts.find((shortcut) =>
        event.key.toLowerCase() === shortcut.key.toLowerCase() &&
        !!shortcut.meta === event.metaKey &&
        !!shortcut.ctrl === event.ctrlKey &&
        !!shortcut.shift === event.shiftKey,
      );
      if (match) {
        event.preventDefault();
        match.handler();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shortcuts]);
}
