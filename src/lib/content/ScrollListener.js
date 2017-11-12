export default class ScrollListener {
  constructor(callback) {
    this._callback = callback;
    this._listener = null;
  }
  enable() {
    if (this._listener) {
      return;
    }
    
    let timeoutId = null;
    this._listener = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        timeoutId = null;
        this._callback.call(null);
      }, 200);
    };
    window.addEventListener("scroll", this._listener, {passive: true});
    window.addEventListener("resize", this._listener, {passive: true});
  }
  disable() {
    if (!this._listener) {
      return;
    }
    
    window.removeEventListener("scroll", this._listener, {passive: true});
    window.removeEventListener("resize", this._listener, {passive: true});
    this._listener = null;
  }
}
