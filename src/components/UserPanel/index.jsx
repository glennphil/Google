import { t } from "i18next";
import { Link } from "react-router-dom";

import './style.css';

export default function UserPanel() {
  const obj = JSON.parse(localStorage.getItem('user'));
  const email = obj[0].email;
  const firstName = obj[0].firstName;
  const lastName = obj[0].lastName;
  const letter = firstName.charAt(0).toUpperCase();

  const SignOut = () => {
    localStorage.setItem('user', null);
    setTimeout(function () {
      window.location.reload();
    }, 150);
  }

  return (
    <div className="user-panel">
      <LargeProfileIcon letter={letter} />
      <div className="user-info">
        <div className="user-info-name">
          {firstName}&nbsp;{lastName}
        </div>
        <div className="user-info-email">
          {email}
        </div>
      </div>
      <button className="manage-account-button">
        <Link to="/Google/myaccount/">
          {t("user-panel.manage_account")}
        </Link>
      </button>
      <button className="signout-button" onClick={SignOut}>
      {t("user-panel.sign_out")}
      </button>
      <div className="user-links">
        <Privacy />
        <span className="user-panel-link-dot">&nbsp;•&nbsp;</span>
        <Terms />
      </div>
    </div>    
  )
}

const Privacy = () => (
  <button className="user-panel-link">
    <a rel="noreferrer" target="_blank" href="https://policies.google.com/privacy?hl=en">
      {t("user-panel.privacy")}
    </a>
  </button>
)

const Terms = () => (
  <button className="user-panel-link">
    <a rel="noreferrer" target="_blank" href="https://policies.google.com/terms?hl=en">
      {t("user-panel.terms")}
    </a>
  </button>
)

const LargeProfileIcon = ({ letter }) => {
  return (
    <div className="user-icon-2">
      {letter}
    </div>
  );
}