const setScrollX = (total) => {
  const bodyTag = window.document.querySelector('body');
  bodyTag.style.overflowY = 'scroll';
  if (!total) bodyTag.style.overflowY = 'auto';
};
export default setScrollX;
