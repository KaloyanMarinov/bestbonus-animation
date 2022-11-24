export default class Common {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  moreOptions(buttons: HTMLButtonElement[]): void {
    if (buttons) {
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const parent: HTMLElement = btn.parentElement;
          const hideOptions: HTMLElement[] = [].slice.call(parent.querySelectorAll('.d-n'));
          hideOptions.forEach(option => {
            option.classList.remove('d-n');
          });
          btn.remove();
        })
      });
    }
  }

  removeMoreOptions(buttons: HTMLFrameElement[]): void {
    console.log(buttons)
    if (buttons) {
      buttons.forEach((btn) => {
        btn.removeEventListener('click', null);
      })
    }
  }
}