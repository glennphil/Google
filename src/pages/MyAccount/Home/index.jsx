import AccountHeader from "../../../components/MyAccount/Header";
import AccountSideBar from "../../../components/MyAccount/SideBar";
import AccountNavBar from "../../../components/MyAccount/NavBar";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { t } from 'i18next';
import { ChevronRightIcon } from '@heroicons/react/solid';
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
        <title>{t('my-account.google_account')}</title>
      </Helmet>
      <main>
        <AccountHeader />
        <AccountNavBar />
        <section className="account-page-wrap">
          <AccountSideBar />
          <section className="account-flex">
            <div className="blue-wrap">
              <section className="account-main-wrap">
                <Welcome letter={letter} firstName={firstName} lastName={lastName} />
                <div className="card-row">
                  <PrivacyAndPersonalization />
                  <PersonalInfo />
                </div>
              </section>
              <div className="red-wrap" />
            </div>
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
      {t('my-account.account-home.welcome')},&nbsp;{firstName}&nbsp;{lastName}
    </div>
    <div className="welcome-subhead">
      <span>{t('my-account.account-home.subheading')}&nbsp;
      <a href="https://www.google.com/account/about/" target="_blank" rel="noreferrer" className="cherry-more no-deco">
        {t('learn_more')}
      </a>
      </span>
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
              {t('my-account.account-home.privacy_and_personalization')}
            </div>
            {t('my-account.account-home.privacy_detail')}
          </div>
          <div className="img-contain">
            <div className="personalize-img" />
          </div>
        </div>
      </div>
      <div className="welcome-card-bottom">
        {t('my-account.account-home.manage_data')}
      </div>
    </section>
  </Link>
)

const PersonalInfo = () => (
  <Link exact to="/myaccount/personalinfo/" className="no-deco flex-link account-bottom-marg">
    <section className="welcome-card">
      <div className="welcome-card-top">
        <div className="inner-card-row">
          <div className="welcome-top-card-info">
            <div className="welcome-card-head">
              {t('my-account.account-home.choose_what_others_see')}
            </div>
            {t('my-account.account-home.personal_detail')}
          </div>
          <div className="img-contain">
            <div className="personalinfo-img" />
          </div>
        </div>
      </div>
      <div className="welcome-card-bottom">
        {t('my-account.account-home.manage_personal')}
      </div>
    </section>
  </Link>
)

export const Arrow = () => (
  <div className="info-arrow">
    <ChevronRightIcon className="chevron-arrow"/>
  </div>
)

export const BackArrow = () => (
  <Link to="/myaccount/personalinfo/">
    <div className="back-arrow">
      <ArrowLeftIcon className="back-arrow-icon"/>
    </div>
  </Link>
)

export const Cancel = () => (
  <button className="cancel">
    <Link to="/myaccount/personalinfo/" className="cancel-link no-deco">
      {t("cancel")}
    </Link>
  </button>
)