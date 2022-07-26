import AccountHeader from "../../../components/MyAccount/Header";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { t } from 'i18next';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { InfoPage } from "../../../components/MyAccount/InfoPage";

import './style.css';

export default function Account() {
  const obj = JSON.parse(localStorage.getItem('user'));
  const firstName = obj[0].firstName;
  const lastName = obj[0].lastName;
  const letter = firstName.charAt(0).toUpperCase();
  return (
    <InfoPage
      title={t('my-account.google_account')}
    >
      <Welcome 
        letter={letter} 
        firstName={firstName} 
        lastName={lastName} 
      />
      <div className="card-row">
        <Card 
          path="/myaccount/data-and-personalization/"
          title={t('my-account.account-home.privacy_and_personalization')}
          detail={t('my-account.account-home.privacy_detail')}
          img="personalize-img"
          buttonTitle={t('my-account.account-home.manage_data')}
        />
        <Card 
          path="/myaccount/personalinfo/"
          title={t('my-account.account-home.choose_what_others_see')}
          detail={t('my-account.account-home.personal_detail')}
          img="personalinfo-img"
          buttonTitle={t('my-account.account-home.manage_personal')}
        />
      </div>
    </InfoPage>
  );
}

const XLProfileIcon = ({ letter }) => (
  <div className="user-icon-3">
    {letter}
  </div>
);

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
);

const Card = (props) => (
  <Link to={props.path} className="no-deco flex-link">
    <section className="welcome-card">
      <div className="welcome-card-top">
        <div className="inner-card-row">
          <div className="welcome-top-card-info">
            <div className="welcome-card-head">{props.title}</div>
            {props.detail}
          </div>
          <div className="img-contain">
            <div className={props.img} />
          </div>
        </div>
      </div>
      <div className="welcome-card-bottom">{props.buttonTitle}</div>
    </section>
  </Link>
);

const SubHeading = (props) => (
  <div className="nav-contain-blue nav-contain-no-bord">
    <div className="navbar-form-wrap">
      <div className="account-subhead">
        <Link to={props.path}>
          <div className="back-arrow">
            <ArrowLeftIcon className="back-arrow-icon"/>
          </div>
        </Link>
        <div className="account-subhead-text">{props.title}</div>
      </div>
    </div>
  </div>
);

const SubHeadNote = (props) => (
  <div className="top-note subhead-note font-16">
    {props.note}&nbsp;
    <a href={props.path} target="_blank" rel="noreferrer" className="learn-more">{t("more_information")}</a>
  </div>
);

const TopNote = (props) => (
  <div className="top-note font-12 uppercase">
    {props.title}
  </div>
);

export const Arrow = () => (
  <div className="info-arrow">
    <ChevronRightIcon className="chevron-arrow"/>
  </div>
);

export const Cancel = () => (
  <Link to="/myaccount/personalinfo/">
    <button className="cancel">
      {t("cancel")}
    </button>
  </Link>
);

export const Heading = (props) => (
  <>
    <div className="account-page-head align-center">
      {props.title}
    </div>
    <div className="account-page-subhead align-center data-subheading">
      {props.description}
    </div>
  </>
);

export const InfoSection = (props) => (
  <div className="personal-card-1">
    <div>
      <div className="account-page-head">{props.title}</div>
      <div className="account-page-subhead">{props.description}</div>
    </div>
    <div className="personal-scene-img-contain">
      <div className={props.img} />
    </div>
  </div>
);

export const FormChangePage = (props) => {
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <AccountHeader />
      <div className="form-bord-bot" />
      <section className="account-page-row-blue">
        <SubHeading 
          title={props.title}
          path={props.subheadPath}
        />
        <section className="account-flex-form-wrap">
          <SubHeadNote 
            note={props.note}
            path={props.notePath}
          />
          <section className="account-flex-form">
            <TopNote 
              title={props.topnote}
            />
            {/* FORM */}
            {props.children}
          </section>
        </section>
      </section>
    </>
  )
};
