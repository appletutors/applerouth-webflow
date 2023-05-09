declare global {
  interface Window {
    isLocal?: boolean;
    JS_SCRIPTS?: Set<string>;
  }
}
export {};
