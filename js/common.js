import { pages } from './data/pages.js';

const navbar = document.getElementById('navbar');
const infoContainer = document.getElementById('info');
const locationLink = window.location.href;
const currentPage = locationLink.substring(
  locationLink.lastIndexOf('/') + 1,
  locationLink.lastIndexOf('.')
);

const renderNavBar = () => {
  for (let i = 0; i < pages.length; i++) {
    const { name, link } = pages[i];
    let classes = 'text-25 nav-tab text-white text-light';

    if (
      currentPage.includes(name.toLowerCase()) ||
      (currentPage.includes('index') && name.toLowerCase() === 'home')
    ) {
      classes += ' text-bold';
    }

    const html = `
      <li class="${classes}">
        <a class="nav-link text-white" href=${link}>${name}</a>
      </li>
   `;

    navbar.innerHTML += html;
  }
};

const renderInfoText = () => {
  const html = `
    <p class="text-bold text-30 margin-top-0 padding-top-50">
        🚧 Our developers are hard at work building this feature for you! 🚧
    </p>
  `;

  infoContainer.innerHTML += html;
};

renderNavBar();

if (currentPage !== 'index') {
  renderInfoText();
}
