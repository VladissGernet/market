const formButtons = document.querySelectorAll('.checkout-form button[type=button]');

let prevButton = null;
let nextButton = null;
formButtons.forEach((button) => {
  if (button.dataset.direction === '+1') {
    nextButton = button;
  }
  if (button.dataset.direction === '-1') {
    prevButton = button;
  }
});

const submitButton = document.querySelector('.checkout-form button[type=submit]');
const sections = document.querySelectorAll('.checkout-form__page');
const progressItems = document.querySelectorAll('.progress__item');

const tabsNav = document.querySelector('.tabs__navigation');

const tabsNavItems = document.querySelectorAll('.tabs__navigation-link');
const pages = document.querySelectorAll('.tabs__page');

const tariffPlans = document.querySelectorAll('.tariff-plan');
const tariffPlanControls = document.querySelectorAll('[name="tariff-plan"]');

const paymentMethods = document.querySelectorAll('.payment-method');
const paymentMethodControls = document.querySelectorAll('[name="payment-method"]');

const policy = document.querySelector('#policy');
const payButton = document.querySelector('#pay');

const setActivePage = (anchor) => {
  if (!anchor) return;

  tabsNavItems.forEach((navItem) => {
    navItem.classList.toggle('tabs__navigation-link--active', anchor === navItem.getAttribute("href"));
  });

  pages.forEach((page) => {
    page.classList.toggle('tabs__page--active', anchor === ('#' + page.id));
  });
}

const tabsNavClickHandler = (evt) => {
  const item = evt.target.closest('a');

  if (!item) {
    return;
  }

  const anchor = item.getAttribute("href");
  setActivePage(anchor);
}

const setActiveSection = (direction) => {
  if (!direction) return;

  const activePage = document.querySelector('.checkout-form__page--active');

  const activePageId = activePage ? activePage.id : 'section-1';
  const id = parseInt(activePageId.split('-')[1]);


  const newId = direction === '+1' ? id + 1 : id - 1;

  if (newId === 1) {
    prevButton.setAttribute('hidden', 'hidden');
  }

  if (newId > 1) {
    prevButton.removeAttribute('hidden');
  }

  if (newId < sections.length) {
    nextButton.removeAttribute('hidden');
    submitButton.setAttribute('hidden', 'hidden');
  }

  if (newId === sections.length) {
    nextButton.setAttribute('hidden', 'hidden');
    submitButton.removeAttribute('hidden');
  }

  sections.forEach((page) => {
    page.classList.toggle('checkout-form__page--active', 'section-' + newId === page.id);
  });

  progressItems.forEach((item) => {
    item.classList.toggle('progress__item--active', item.dataset.value === 'section-' + newId);
  });
}

const buttonClickHandler = (evt) => {
  evt.preventDefault();
  const direction = evt.target.dataset.direction;

  if (!direction) {
    return;
  }

  setActiveSection(direction);
}

const setActiveTariff = (value) => {
  tariffPlanControls.forEach((control) => {
    control.checked = control.value === value;
  });

  tariffPlans.forEach((tariff) => {
    tariff.classList.toggle('tariff-plan--active', tariff.id === value);
  });
}

const tariffPlanClickHandler = (evt) => {
  const section = evt.target.closest('section');
  if (!section) {
    return;
  }

  setActiveTariff(section.id);
}

const setActivePaymentMethod = (value) => {
  paymentMethodControls.forEach((control) => {
    control.checked = control.value === value;
  });

  paymentMethods.forEach((paymentMethod) => {
    paymentMethod.classList.toggle('payment-method--active', paymentMethod.id === value);
  });
}

const paymentMethodClickHandler = (evt) => {
  const section = evt.target.closest('section');
  if (!section) {
    return;
  }

  setActivePaymentMethod(section.id);
}

const policyChangeHandler = (evt) => {
  const control = evt.target;
  const label = evt.target.closest('label');
  label.classList.toggle('checkbox--error', !control.checked)
  payButton.toggleAttribute('disabled', !control.checked);
  payButton.classList.toggle('button--disabled', !control.checked);
}

const init = () => {
  formButtons.forEach((button) => {
    button.addEventListener('click', buttonClickHandler);
  });

  tabsNav.addEventListener('click', tabsNavClickHandler);

  tariffPlans.forEach((tariff) => {
    tariff.addEventListener('click', tariffPlanClickHandler);
  });

  paymentMethods.forEach((paymentMethod) => {
    paymentMethod.addEventListener('click', paymentMethodClickHandler);
  });

  policy.addEventListener('change', policyChangeHandler);
}

init();
