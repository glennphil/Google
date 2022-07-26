import Form from './Form';
import { t } from 'i18next';
import { UserCircleIcon } from '@heroicons/react/outline';

import './style.css';
import '../../../components/SignPage/Container/style.css';
import '../../../components/SignPage/Heading/style.css';

export default function SignUpDetails({ value, setValue, register, handleSubmit, errors, watch, Next, Logo }) {
  return (
    <>
      <section className="form-container">
        <Logo />
        <Heading value={value}/>
        <Form
          value={value} 
          Next={Next} 
          setValue={setValue} 
          register={register} 
          handleSubmit={handleSubmit} 
          errors={errors} 
          watch={watch} 
        />
      </section>
      <AccountLogo />
    </>
  )
}

const Heading = ({ value }) => (
  <>
    <h1 className="heading">
      {value.firstName}, {t("sign-up.detail.heading")}
    </h1>
    <div className="welcome-subhead">
    <UserCircleIcon className="sidebar-icon"/>
    <div className="welcome-subhead-email">{value.email}</div>
    </div>
  </>
);

export const Information = () => (
  <a target="_blank" rel="noreferrer" href="https://support.google.com/accounts/answer/1733224?hl=en" className="create-account no-deco">
    {t("sign-up.detail.info_button")}
  </a>
);

export const Back = () => (
  <button className="create-account" onClick={() => window.location.reload()}>
    {t("back")}
  </button>
);

const AccountLogo = () => (
  <section className="account-app-icon">
    <figure className="account-app-figure">
      <picture src="" alt="logo" className="personal-logo" />
      <figcaption className="fig-heading">
        {t("sign-up.detail.figure_caption")}
      </figcaption>
    </figure>
  </section>
);
