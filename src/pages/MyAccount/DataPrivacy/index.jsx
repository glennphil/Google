import { TrashIcon } from "@heroicons/react/outline";
import { Arrow, InfoSection, Heading } from "../Home";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { InfoPage } from "../../../components/MyAccount/InfoPage";

import './style.css';

export default function DataPrivacy() {
  return (
    <InfoPage
      title={t("my-account.data-privacy.data_and_privacy")}
    >
      <Heading 
        title={t("my-account.data-privacy.data_and_privacy")}
        description={t("my-account.data-privacy.subheading")}
      />
      <InfoSection 
        title={t("my-account.data-privacy.options")}
        description={t("my-account.data-privacy.options_subheading")}
        img="data-scene-img"
      />
      <DeleteAccount 
        TrashIcon={TrashIcon}
      />
    </InfoPage>
  )
}

const DeleteAccount = ({ TrashIcon }) => (
  <div className="info-card info-card-no-pad account-bottom-marg">
    <button className="info-button">
      <Link to="/myaccount/deleteaccount/" className="no-deco">
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
);