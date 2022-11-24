export default class Tabs {
  tabs: HTMLElement[];

  constructor() {
    this.tabs = [].slice.call(document.querySelectorAll('.js-tabs'));
    this.onClick();
  }
  
  onClick() : void {
    if (this.tabs) {
      this.tabs.forEach((tab, i) => {
        const btns: HTMLButtonElement[] = [].slice.call(tab.querySelectorAll('.js-tab-btn'));

        btns.forEach(btn => {
          btn.addEventListener('click', () => {
            const tab = this.tabs[i].querySelector(btn.dataset.tab);
            const active = this.tabs[i].querySelector('.js-tab.active');
            const activeBtn = this.tabs[i].querySelector('.js-tab-btn.active');
            active.classList.remove('active');
            activeBtn.classList.remove('active');
            tab.classList.add('active');
            btn.classList.add('active');
          });
        });
      });
    }
  }
}