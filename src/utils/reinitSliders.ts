export const reInitSliders = () => {
  window.Webflow?.require('slider').redraw();

  // resize event triggering the slider refresh
  window.dispatchEvent(new Event('resize'));
};
