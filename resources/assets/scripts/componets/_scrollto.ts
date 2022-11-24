const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  if ((t /= d / 2 ) < 1) return c / 2 * t * t + b;

  return -c / 2 * ((--t) * (t - 2) - 1) + b;
};

const requestAnimFrame = (
  () => window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame || (callback => window.setTimeout(callback, 1000 / 60))
)();

export function scrollTo(to: number, offset = 0, duration = 800, callback: any = null): void {
  const move = (amount: number) => {
    document.documentElement.scrollTop = amount;
    (document.body.parentNode as HTMLElement).scrollTop = amount;
    document.body.scrollTop = amount;
  };
  const start = document.documentElement.scrollTop ||
                (document.body.parentNode as HTMLElement).scrollTop ||
                document.body.scrollTop;
  const change = to - start + 10 - offset;
  const increment = 20;
  let currentTime = 0;

  const animateScroll = () => {
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, duration);
    move(val);
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else if (typeof callback === 'function') {
      callback();
    }
  };
  animateScroll();
}

export function scrollToElement(selectior: string, offset = 0, duration = 800): void {
  const element = document.querySelector(selectior) as HTMLElement;
  if (!element) return;

  scrollTo(element.offsetTop, offset, duration);
}