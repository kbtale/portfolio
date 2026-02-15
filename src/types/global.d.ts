import Lenis from "lenis";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}
