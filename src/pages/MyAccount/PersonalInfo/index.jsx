import { Arrow, InfoSection, Heading } from "../Home";
import { Link } from "react-router-dom";
import { t } from 'i18next';
import { InfoPage } from "../../../components/MyAccount/InfoPage";

import './style.css';

export default function PersonalInfo() {
  const obj = JSON.parse(localStorage.getItem('user'));
  const email = obj[0].email;
  const firstName = obj[0].firstName;
  const lastName = obj[0].lastName;
  const gender = obj[0].gender;
  const month = obj[0].month;
  const day = obj[0].day;
  const year = obj[0].year;
  const password = obj[0].password;

  return (
    <InfoPage
      title={t("my-account.personal-info.personal_info")}
    >
      <Heading 
        title={t("my-account.personal-info.personal_info")}
        description={t("my-account.personal-info.subheading")}
      />
      <InfoSection 
        title={t("my-account.personal-info.profile_info_head")}
        description={t("my-account.personal-info.profile_info_subheading")}
        img="personal-scene-img"
      />
      <BasicInfo 
        firstName={firstName}
        lastName={lastName}
        month={month}
        day={day}
        year={year}
        gender={gender}
      />
      <ContactInfo 
        email={email}
      />
      <InfoSection
        title={t("my-account.personal-info.other_info_head")}
        description={t("my-account.personal-info.other_info_subheading")}
        img="personal-scene-pref-img"
      />
      <PasswordInfo
        password={password}
      />
    </InfoPage>
  )
}

const InfoButton = (props) => (
  <button className="info-button">
    <Link to={props.path} className="no-deco">
      <div className="info-wrap-divide" />
      <div className={props.style}>
        <div className="info-title">{props.title}</div>
        <div className={props.valueStyle}>{props.value}&nbsp;{props.value2}&nbsp;{props.value3}</div>
        <Arrow />
      </div>
    </Link>
  </button>
);

const InfoButtonTop = (props) => (
  <>
    <div className="h3">
      {props.title}
    </div>
    <div className="h3-note">
      {props.description}
    </div>
  </>
);

const BasicInfo = ({ firstName, lastName, month, day, year, gender }) => (
  <div className="info-card">
    <InfoButtonTop 
      title={t("my-account.personal-info.basic_info")}
      description={t("my-account.personal-info.basic_info_note")}
    />
    <InfoButton 
      path="/myaccount/name/"
      style="info-wrap"
      title={t("my-account.personal-info.personal-name.name")}
      valueStyle="info-value"
      value={firstName}
      value2={lastName}
    />
    <InfoButton 
      path="/myaccount/birthday/"
      style="info-wrap"
      title={t("my-account.personal-info.personal-birthday.birthday")}
      valueStyle="info-value"
      value={month}
      value2={day}
      value3={year}
    />
    <InfoButton 
      path="/myaccount/gender/"
      style="info-wrap info-wrap-bottom"
      title={t("my-account.personal-info.personal-gender.gender")}
      valueStyle="info-value"
      value={gender}
    />
  </div>
);

const ContactInfo = ({ email }) => (
  <div className="info-card">
    <InfoButtonTop 
      title={t("my-account.personal-info.contact_info")}
    />
    <InfoButton 
      path="/myaccount/email/"
      style="info-wrap info-wrap-bottom"
      title={t("my-account.personal-info.personal-email.email")}
      valueStyle="info-value undercase"
      value={email}
    />
  </div>
);

const PasswordInfo = ({ password }) => (
  <div className="info-card account-bottom-marg">
    <InfoButtonTop 
      title={t("my-account.personal-info.personal-password.password")}
      description={t("my-account.personal-info.password_note")}
    />
    <InfoButton 
      path="/myaccount/password/"
      style="info-wrap info-wrap-bottom"
      title={t("my-account.personal-info.personal-password.password")}
      valueStyle="info-value password"
      value={password}
    />
  </div>
);
