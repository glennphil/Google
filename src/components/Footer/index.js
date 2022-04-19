import TogglePanel from '../SettingsPanel/TogglePanel';
import { t } from 'i18next';

import './style.css';

export default function Footer() {
  return (
    <footer>
      <FooterCountry />
      <div className="footer-content">
        <ul>
          <About />
          <Advertising />
          <Business />
          <HowSearchWorks />
        </ul>
        <ul>
          <Privacy />
          <Terms />
          <TogglePanel />
        </ul>
      </div>
    </footer>
  )
}

const FooterCountry = () => (
  <div className="footer-country">
    Argentina
  </div>
);

const About = () => (
  <li>
    <a href="https://about.google/" alt="About">
      {t('about')}
    </a>
  </li>
);

const Advertising = () => (
  <li>
    <a href="https://ads.google.com/" alt="Advertising">
      {t('advertising')}
    </a>
  </li>
);

const Business = () => (
  <li>
    <a href="https://smallbusiness.withgoogle.com/" alt="Business">
      {t('business')}
    </a>
  </li>
);

const HowSearchWorks = () => (
  <li>
    <a href="https://www.google.com/search/howsearchworks/" alt="How Search Works">
      {t('how_search_works')}
    </a>
  </li>
);

const Privacy = () => (
  <li>
    <a href="https://policies.google.com/privacy?hl=en/" alt="Privacy">
      {t('privacy')}
    </a>
  </li>
);

const Terms = () => (
  <li>
    <a href="https://policies.google.com/terms?hl=en/" alt="Terms">
      {t('terms')}
    </a>
  </li>
);
