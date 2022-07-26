import axios from "axios";
import { t } from 'i18next';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useContext } from 'react';
import { UserContext } from "../../../usercontext";
import { FormChangePage } from "../Home";

export default function DeleteAccount() {
  const [agree, setAgree] = useState(false);
  const { setUser } = useContext(UserContext);

  const obj = JSON.parse(localStorage.getItem('user'));
  const id = obj[0].id;
  const URL = "https://google-frontend.herokuapp.com/users/" + id;

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
        window.location.href = "/Google/";
      }, 250);
      localStorage.setItem('user', null);
    } catch(error) {
      console.log(error.response.data)
    }
    const user = await currentUser();
      setUser(user);
  }

  return (
    <FormChangePage
      title={t("my-account.data-privacy.data-delete.delete_account")}
      subheadPath="/myaccount/data-and-personalization/"
      note={t("my-account.data-privacy.data-delete.subheading")}
      notePath="https://support.google.com/accounts/answer/27442"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DeleteInput 
          register={register}
          setAgree={setAgree}
        />
        <Buttons
          agree={agree}
        />
    </form>
    </FormChangePage>
  )
}

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
);

const Buttons = ({ agree }) => (
  <div className="form-button-row">
    <Link to="/myaccount/data-and-personalization/">
      <button className="cancel">
        {t("cancel")}
      </button>
    </Link>
    <button type="submit" className="next uppercase" disabled={!agree}>
      {t("my-account.data-privacy.data-delete.delete_account")}
    </button>
  </div>
);