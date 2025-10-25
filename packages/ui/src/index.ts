export function Button(props: { children?: unknown }) {
  // Minimal placeholder for the UI package used by the monorepo.
  return { type: 'button', props } as unknown;
}

export default {
  Button,
};
