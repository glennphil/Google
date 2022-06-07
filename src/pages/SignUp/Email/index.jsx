import Form from './Form';
import { Link } from 'react-router-dom';
import { t } from 'i18next';

import './style.css';
import '../../../components/SignPage/Container/style.css';
import '../../../components/SignPage/Heading/style.css';
import '../../../components/SignPage/ShowPassword/style.css';

export default function SignUpEmail({value, setValue, errors, handleSubmit, checkEmail, register, watch, Next, onSubmit, Logo}) {
  return (
    <>
      <section className="form-container">
        <Logo />
        <Heading />
        <Form
          value={value}
          Next={Next} 
          setValue={setValue} 
          watch={watch} 
          register={register} 
          handleSubmit={handleSubmit} 
          onSubmit={onSubmit}
          errors={errors}
          checkEmail={checkEmail}
        />
      </section>
      <AccountLogo />
    </>
  )
}

const Heading = () => (
  <h1 className="heading">
    {t("sign-up.title")}
  </h1>
);

export const ErrorLogo = () => (
  <div className="invalidlogo">
    <svg aria-hidden="true" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
    </svg>
  </div>
)

export const SignInInstead = () => (
  <Link to="/signin/">
    <button className="create-account">
      {t("sign-up.email.instead")}
    </button>
  </Link>
);

const AccountLogo = () => (
  <section className="account-app-icon">
    <figure className="account-app-figure">
      <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="" width="244" height="244" />
      <figcaption className="fig-heading">
        {t("sign-up.email.figure_caption")}
      </figcaption>
    </figure>
  </section>
);
