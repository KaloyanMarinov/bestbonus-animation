export default class Button {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  state(selector: string) : void {
    const elements = [].slice.call(document.querySelectorAll(selector));

    elements.forEach((btn: HTMLElement) => {
      btn.addEventListener('click', () => {
        const parentSelector = btn.dataset.parent;
        
        if (btn.classList.contains('active')) {
          btn.classList.remove('active');
        } else {
          btn.classList.add('active');
        }
  
        if (parentSelector) {
          const parent = btn.closest(parentSelector);
  
          if (parent.classList.contains('active')) {
            parent.classList.remove('active');
          } else {
            parent.classList.add('active');
          }
        }
      });
    });
  }
}
