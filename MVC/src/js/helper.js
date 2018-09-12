export const empty = (target) => {
  while (target.hasChildNodes()) {
    target.removeChild(target.firstChild);
  };
}