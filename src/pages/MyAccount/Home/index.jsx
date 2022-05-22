import AccountHeader from '../Header';
import AccountSideBar from '../../../components/AccountSideBar';
import AccountNavBar from '../../../components/AccountNavBar';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { t } from 'i18next';
import { ArrowLeftIcon } from '@heroicons/react/solid';

import './style.css';

export default function Account() {
  const obj = JSON.parse(localStorage.getItem('user'));
  const firstName = obj[0].firstName;
  const lastName = obj[0].lastName;
  const letter = firstName.charAt(0).toUpperCase();

  return (
    <>
      <Helmet>
        <title>{t('google_account')}</title>
      </Helmet>
      <main>
        <AccountHeader />
        <AccountNavBar />
        <section className="account-page-wrap">
          <AccountSideBar />
          <section className="account-flex">
            <section className="account-main-wrap">
              <Welcome letter={letter} firstName={firstName} lastName={lastName} />
              <div className="card-row">
                <PrivacyAndPersonalization />
                <PersonalInfo />
              </div>
            </section>
          </section>
        </section>
      </main>
    </>
  );
}

const XLProfileIcon = ({ letter }) => {
  return (
    <div className="user-icon-3">
      {letter}
    </div>
  );
}

const Welcome = ({ letter, firstName, lastName }) => (
  <>
    <XLProfileIcon letter={letter}/>
    <div className="welcome-head">
      {t('welcome')},&nbsp;{firstName}&nbsp;{lastName}
    </div>
    <div className="welcome-subhead">
      {t('account_subheading')}&nbsp;
      <a className="learn-more no-deco">
        {t('learn_more')}
      </a>
    </div>
  </>
)

const PrivacyAndPersonalization = () => (
  <Link exact to="/myaccount/data-and-personalization/" className="no-deco flex-link">
    <section className="welcome-card">
      <div className="welcome-card-top">
        <div className="inner-card-row">
          <div className="welcome-top-card-info">
            <div className="welcome-card-head">
              {t('privacy_and_personalization')}
            </div>
            {t('privacy_detail')}
          </div>
          <div className="personalize-img" />
        </div>
      </div>
      <div className="welcome-card-bottom">
        {t('manage_data')}
      </div>
    </section>
  </Link>
)

const PersonalInfo = () => (
  <Link exact to="/myaccount/personalinfo/" className="no-deco flex-link">
    <section className="welcome-card">
      <div className="welcome-card-top">
        <div className="inner-card-row">
          <div className="welcome-top-card-info">
            <div className="welcome-card-head">
              {t('choose_what_others_see')}
            </div>
            {t('personal_detail')}
          </div>
          <div className="personalinfo-img" />
        </div>
      </div>
      <div className="welcome-card-bottom">
        {t('manage_personal')}
      </div>
    </section>
  </Link>
)

export const BackArrow = () => (
  <Link to="/myaccount/personalinfo/">
    <div className="back-arrow">
      <ArrowLeftIcon className="back-arrow-icon"/>
    </div>
  </Link>
)
