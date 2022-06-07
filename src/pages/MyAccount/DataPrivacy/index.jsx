import AccountHeader from "../../../components/MyAccount/Header";
import AccountSideBar from "../../../components/MyAccount/SideBar";
import AccountNavBar from "../../../components/MyAccount/NavBar";
import { TrashIcon } from "@heroicons/react/outline";
import { Arrow } from "../Home";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { t } from "i18next";

import './style.css';

export default function DataPrivacy() {
  return (
    <>
      <Helmet>
        <title>{t("my-account.data-privacy.data_and_privacy")}</title>
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
                <DeleteAccount 
                  TrashIcon={TrashIcon}
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
    <div className="account-page-head align-center">{t("my-account.data-privacy.data_and_privacy")}</div>
    <div className="account-page-subhead data-subheading">{t("my-account.data-privacy.subheading")}</div>
  </>
)

const Card = () => (
  <div className="personal-card-1">
    <div>
      <div className="account-page-head">{t("my-account.data-privacy.options")}</div>
      <div className="account-page-subhead">{t("my-account.data-privacy.options_subheading")}</div>
    </div>
    <div className="personal-scene-img-contain">
      <div className="data-scene-img" />
    </div>
  </div>
)

const DeleteAccount = ({ TrashIcon }) => (
  <div className="info-card info-card-no-pad account-bottom-marg">
    <button className="info-button">
    <Link to="/Google/myaccount/deleteaccount/" className="no-deco">
        <div className="info-wrap info-wrap-bot-top">
          <TrashIcon className="trash-icon"/>
          <div className="wrap-column">
            <div className="info-title info-title-width data-title">
              {t("my-account.data-privacy.delete_account")}
            </div>
            <div className="info-value data-value">
              {t("my-account.data-privacy.delete_data")}
            </div>
          </div>
          <div className="wrap-row-space" />
          <Arrow />
        </div>
      </Link>
    </button>
  </div>
)