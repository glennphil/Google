import AccountHeader from "../../../components/MyAccount/Header";
import axios from "axios";
import { t } from 'i18next';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useContext } from 'react';
import { UserContext } from "../../../usercontext";
import { Helmet } from "react-helmet";
import { ArrowLeftIcon } from "@heroicons/react/solid";

export default function DeleteAccount() {
  const [agree, setAgree] = useState(false);
  const { setUser } = useContext(UserContext);

  const obj = JSON.parse(localStorage.getItem('user'));
  const id = obj[0].id;
  const URL = "http://localhost:5000/users/" + id;

  const {register, handleSubmit } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    delayError: 1000,
  });

  const currentUser = async () => {
    let response = await axios.get(URL);
    return response.data;
  };

  const onSubmit = async() => {
    try {
      await axios({
        method: "delete",
        url: URL,
        headers: { "Content-Type": "application/json"},
      });
      setTimeout(function () {
        window.location.href = "http://localhost:3000/";
      }, 250);
      localStorage.setItem('user', null);
    } catch(error) {
      console.log(error.response.data)
    }
    const user = await currentUser();
      setUser(user);
  }

  return (
    <>
      <Helmet>
        <title>{t("my-account.data-privacy.data-delete.delete_account")}</title>
      </Helmet>
      <AccountHeader />
      <div className="form-bord-bot" />
      <section className="account-page-row-blue">
        <SubHeading />
        <section className="account-flex-form-wrap">
          <SubHeadNote />
          <section className="account-flex-form">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <DeleteInput 
                register={register}
                setAgree={setAgree}
              />
              <Buttons
                agree={agree}
              />
            </form>
          </section>
        </section>
       </section>
    </>
  )
}

const SubHeading = () => (
  <div className="nav-contain-blue nav-contain-no-bord">
    <div className="navbar-form-wrap">
      <div className="account-subhead">
        <Link to="/Google/myaccount/data-and-personalization/">
          <div className="back-arrow">
            <ArrowLeftIcon className="back-arrow-icon"/>
          </div>
        </Link>
        <div className="account-subhead-text">
          {t("my-account.data-privacy.data-delete.delete_account")}
        </div>
      </div>
    </div>
  </div>
)

const SubHeadNote = () => (
  <div className="top-note subhead-note font-16">
    {t("my-account.data-privacy.data-delete.subheading")}&nbsp;
    <a href="https://support.google.com/accounts/answer/27442" target="_blank" rel="noreferrer" className="learn-more">{t("more_information")}</a>
  </div>
)

const DeleteInput = ({ register, setAgree }) => (
  <div className="input-container">
    <label className="pass-container">
      <input 
        {...register("deleteAccount", {
          required: true,
        })}
        name="deleteAccount"
        type="checkbox"
        className="password-checkbox"
        onClick={(e) => setAgree(e.target.checked)}
      />
      <div className="checkmark"/>
      {t("my-account.data-privacy.data-delete.delete_confirm")}
    </label>
  </div>
)

const Buttons = ({ agree }) => (
  <div className="form-button-row">
    <button className="cancel">
      <Link to="/Google/myaccount/data-and-personalization/" className="cancel-link no-deco">
        {t("cancel")}
      </Link>
    </button>
    <button type="submit" className="next uppercase" disabled={!agree}>
      {t("my-account.data-privacy.data-delete.delete_account")}
    </button>
  </div>
)