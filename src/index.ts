window.JS_SCRIPTS = new Set();
const LOCALHOST_BASE = 'http://localhost:3000/';
const EXTERNAL_SERVER_LOAD_BASE = '';

/**
 * Sets an object `window.isLocal` and adds all the set scripts using the `window.JS_SCRIPTS` Set
 */
const addJS = () => {
  window.isLocal = false;
  fetch(LOCALHOST_BASE)
    .then((response) => {
      if (response.ok) {
        window.isLocal = true;
      }
    })
    .finally(() => {
      const base = window.isLocal ? LOCALHOST_BASE : EXTERNAL_SERVER_LOAD_BASE;
      window.JS_SCRIPTS?.forEach((url) => {
        const script = document.createElement('script');
        script.src = base + url;
        script.defer = true;
        document.body.appendChild(script);
      });
    });
};

// init
addJS();
