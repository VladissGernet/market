const nav = document.querySelector('.tabs__navigation');

const navItems = document.querySelectorAll('.tabs__navigation-link');

const pages = document.querySelectorAll('.tabs__page');

const setActivePage = (anchor) => {
  if (!anchor) return;

  navItems.forEach((navItem) => {
    navItem.classList.toggle('tabs__navigation-link--active', anchor === navItem.getAttribute("href"));
  });

  pages.forEach((page) => {
    page.classList.toggle('tabs__page--active', anchor === ('#' + page.id));
  });
}

const navClickHandler = (evt) => {
  const item = evt.target.closest('a');

  if (!item) {
    return;
  }

  const anchor = item.getAttribute("href");
  setActivePage(anchor);

}

const init = () => {
  nav.addEventListener('click', navClickHandler);
}


init();
