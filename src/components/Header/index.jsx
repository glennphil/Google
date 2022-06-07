import ToggleApps from './../AppsPanel/ToggleApps';
import ToggleUser from '../UserPanel/ToggleUser';
import { t } from 'i18next';
import { Link } from 'react-router-dom';

import './style.css';

export default function HeaderIcons() {
  let user = JSON.parse(localStorage.getItem('user'));

  return (
    <ul>
      <ToggleApps/>
      { user !== null ? <ToggleUser /> : <SignIn /> }
    </ul>
  )
}

const SignIn = () => (
  <li>
    <Link to="/signin/">
      <button className="sign-in" target="_top">
        {t('sign-in.sign_in')}
      </button>
    </Link> 
  </li>
);