import { pages } from './data/pages-data.js';

const navbar = document.getElementById('navbar');
const locationLink = window.location.href;

const renderNavBar = () => {
  const currentPage = locationLink.substring(
    location.lastIndexOf('/') + 1,
    location.lastIndexOf('.')
  );

  for (let i = 0; i < pages.length; i++) {
    const { name, link } = pages[i];
    let classes = 'text-25 nav-tab';

    if (currentPage.includes(name.toLowerCase())) {
      classes += ' text-bold';
    }

    const html = `
      <li class="${classes}">
        <a class="nav-link" href=${link}>${name}</a>
      </li>
   `;

    navbar.innerHTML += html;
  }
};

renderNavBar();
