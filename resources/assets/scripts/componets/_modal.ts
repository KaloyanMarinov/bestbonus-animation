export default class Modal {
  body: HTMLBodyElement;
  modals: HTMLElement[];

  constructor() {
    this.body = document.querySelector('body');
    this.modals = [].slice.call(document.querySelectorAll('.js-modal'));
    this.onShowModal();
  }

  onShowModal(): void {
    if (this.modals) {
      this.modals.forEach(btn => {
        btn.addEventListener('click', () => {
          const modalID = btn.dataset.modal;
          const modal = document.querySelector(modalID) as HTMLDivElement;
          const close = modal.querySelector('.modal__close');
  
          this.body.style.overflow = 'hidden';
          modal.style.display = 'block';
          
          if (close) {
            close.addEventListener('click', () => {
              this.body.style.overflow = null;
              modal.style.display = null;
            })
          }
        });

      });
    }
  }
}