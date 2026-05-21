// ── Terminal Event Bus ──────────────────────────────────
// Lets any component inject "ghost" commands into the terminal without coupling to React state. Components emit, Terminal subscribes.

export interface TerminalEvent {
  command: string;
  output: string[];
  isError?: boolean;
  animated?: boolean;
}

type Listener = (event: TerminalEvent) => void;

const listeners = new Set<Listener>();

/** Subscribe to terminal events (used by Terminal component) */
export function onTerminalEvent(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Emit a ghost command into the terminal.
 * Example: terminalEmit("theme cyberpunk", ["✨ Theme switched..."])
 */
export function terminalEmit(
  command: string,
  output: string[],
  opts?: { isError?: boolean; animated?: boolean }
) {
  const event: TerminalEvent = {
    command,
    output,
    isError: opts?.isError,
    animated: opts?.animated,
  };
  listeners.forEach((fn) => fn(event));
}
