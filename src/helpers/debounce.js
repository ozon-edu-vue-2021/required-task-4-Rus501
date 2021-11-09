export function debounce(f, t) {
  let timer;

  return function (args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => f(args), t);
  };
}
