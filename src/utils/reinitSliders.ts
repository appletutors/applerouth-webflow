export const reInitSliders = () => {
  // TODO: `redraw` function not fully re-initializing the sliders
  // window.Webflow.require('slider').redraw();

  // resize event triggering the slider refresh
  window.dispatchEvent(new Event('resize'));
};
