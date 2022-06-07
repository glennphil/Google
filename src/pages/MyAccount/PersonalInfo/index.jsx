import AccountHeader from "../../../components/MyAccount/Header";
import AccountSideBar from "../../../components/MyAccount/SideBar";
import AccountNavBar from "../../../components/MyAccount/NavBar";
import { Arrow } from "../Home";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { t } from 'i18next';

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
    <>
      <Helmet>
        <title>{t("my-account.personal-info.personal_info")}</title>
      </Helmet>
      <main>
      <AccountHeader />
      <AccountNavBar />
      <section className="account-page-wrap">
        <AccountSideBar />
          <section className="account-flex">
            <div className="blue-wrap">
              <section className="account-main-wrap">
                <Heading />
                <Card />
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
                <Card2 />
                <PasswordInfo
                  password={password}
                />
            </section>
            <div className="red-wrap" />
          </div>
        </section>
      </section>
      </main>
    </>
  )
}

const Heading = () => (
  <>
    <div className="account-page-head align-center">
      {t("my-account.personal-info.personal_info")}
    </div>
    <div className="account-page-subhead align-center">
      {t("my-account.personal-info.subheading")}
    </div>
  </>
)

const Card = () => (
  <div className="personal-card-1">
    <div>
      <div className="account-page-head">
        {t("my-account.personal-info.profile_info_head")}
      </div>
      <div className="account-page-subhead">
        {t("my-account.personal-info.profile_info_subheading")}
      </div>
    </div>
    <div className="personal-scene-img-contain">
      <div className="personal-scene-img" />
    </div>
  </div>
)

const BasicInfo = ({ firstName, lastName, month, day, year, gender }) => (
  <div className="info-card">
    <div className="h3">
      {t("my-account.personal-info.basic_info")}
    </div>
    <div className="h3-note">
      {t("my-account.personal-info.basic_info_note")}&nbsp;
      <a href="https://support.google.com/accounts/answer/6304920" target="_blank" rel="noreferrer" className="learn-more no-deco">
        {t("more_information")}
      </a>
    </div>
    <button className="info-button">
      <Link to="/Google/myaccount/name/" className="no-deco">
        <div className="info-wrap-divide" />
        <div className="info-wrap">
          <div className="info-title">
            {t("my-account.personal-info.personal-name.name")}
          </div>
          <div className="info-value">
            {firstName}&nbsp;{lastName}
          </div>
          <Arrow />
        </div>
      </Link>
    </button>
    <button className="info-button">
      <Link to="/Google/myaccount/birthday/" className="no-deco">
        <div className="info-wrap-divide" />
        <div className="info-wrap">
          <div className="info-title">
            {t("my-account.personal-info.personal-birthday.birthday")}
          </div>
          <div className="info-value">
            {month}&nbsp;{day},&nbsp;{year}
          </div>
          <Arrow />
        </div>
      </Link>
    </button>
    <button className="info-button">
      <Link to="/Google/myaccount/gender/" className="no-deco">
        <div className="info-wrap-divide" />
        <div className="info-wrap info-wrap-bottom">
          <div className="info-title">
            {t("my-account.personal-info.personal-gender.gender")}
          </div>
          <div className="info-value capitalize">
            {gender}
          </div>
          <Arrow />
        </div>
      </Link>
    </button>
  </div>
)

const ContactInfo = ({ email }) => (
  <div className="info-card">
    <div className="h3">
      {t("my-account.personal-info.contact_info")}
    </div>
    <div className="h3-note" />
    <button className="info-button">
      <Link to="/Google/myaccount/email/" className="no-deco">
        <div className="info-wrap-divide" />
        <div className="info-wrap info-wrap-bottom">
          <div className="info-title">
            {t("my-account.personal-info.personal-email.email")}
          </div>
          <div className="info-value undercase">
            {email}
          </div>
          <Arrow />
        </div>
      </Link>
    </button>
  </div>
)

const Card2 = () => (
  <div className="personal-card-1">
  <div>
    <div className="account-page-head">
      {t("my-account.personal-info.other_info_head")}
    </div>
    <div className="account-page-subhead">
      {t("my-account.personal-info.other_info_subheading")}
    </div>
  </div>
  <div className="personal-scene-img-contain">
    <div className="personal-scene-pref-img" />
  </div>
</div>
)

const PasswordInfo = ({ password }) => (
  <div className="info-card account-bottom-marg">
    <div className="h3">
      {t("my-account.personal-info.personal-password.password")}
    </div>
      <div className="h3-note">
        {t("my-account.personal-info.password_note")}
      </div>
      <button className="info-button">
      <Link to="/Google/myaccount/password/" className="no-deco">
        <div className="info-wrap-divide" />
        <div className="info-wrap info-wrap-bottom">
          <div className="info-title">
            {t("my-account.personal-info.personal-password.password")}
          </div>
          <div className="info-value password">
            {password}
          </div>
          <Arrow />
        </div>
      </Link>
    </button>
  </div>
)
