const dropdown = 'js-dropdown';
const dropdownToggle = 'js-dropdown-toggle';

export const dropDown = () => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(dropdownToggle) || target.closest('.' + dropdownToggle)) {
      if (!target.closest('.' + dropdown).classList.contains('show')) {
        hideDropDowns();
        showDropDown(target);
      } else {
        hideDropDowns();
      }
    } else if (!target.classList.contains(dropdown) && !target.closest('.' + dropdown)) {
      hideDropDowns();
    }
  });
};

const showDropDown = (target) => {
  const item = target.closest('.' + dropdown);
  document.querySelector('body').classList.add('dropdown-opened');
  item.classList.add('show');
};

const hideDropDowns = () => {
  const items = [].slice.call(document.querySelectorAll('.' + dropdown + '.show'));
  if (items) {
    document.querySelector('body').classList.remove('dropdown-opened');
    items.map(item => item.classList.remove('show'));
  }
};