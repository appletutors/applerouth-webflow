// TODO: auto load local v/s uploaded version
// TODO: auto-add main geolocation model to all pages body element
// TODO: create a common Event query class and another base query class that sends API queries to the applerouth server

// isLocal Window property type

const JS_SCRIPTS_HEAP: Set<string> = new Set();
const LOCALHOST_BASE = 'http://localhost:3000/';
const EXTERNAL_SERVER_LOAD_BASE = '';
const JS_LOAD_EVENT_NAME = 'load-js';

/**
 * Sets an object `window.isLocal` and dispatches event when checking is done to load all the scripts respectively
 */
const setJSSource = () => {
  window.isLocal = false;
  fetch(LOCALHOST_BASE)
    .then((response) => {
      if (response.ok) {
        window.isLocal = true;
      }
    })
    .finally(() => {
      // window.dispatchEvent(new Event(JS_LOAD_EVENT_NAME));
      JS_SCRIPTS_HEAP.forEach((url) => {
        const script = document.createElement('script');
        script.src = url;
        script.defer = true;
        document.body.appendChild(script);
      });
    });
};

// init
setJSSource();

/**
 * Loads a script
 * @param path The path of the script to load
 */
const addJS = (path: [string]) => {
  const base = window.isLocal ? LOCALHOST_BASE : EXTERNAL_SERVER_LOAD_BASE;

  path.forEach((scriptPath) => {
    JS_SCRIPTS_HEAP.add(base + scriptPath);
  });

  // window.addEventListener(JS_LOAD_EVENT_NAME, () => {
  //   // JS_LOAD_HEAP.forEach((url) => {
  //     const script = document.createElement('script');
  //     script.src = url;
  //     script.defer = true;
  //     document.body.appendChild(script);
  //   // });
  // });
};
