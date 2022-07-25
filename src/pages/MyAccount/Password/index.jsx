import AccountHeader from "../../../components/MyAccount/Header";
import axios from "axios";
import { t } from 'i18next';
import { ErrorLogo } from "../../SignUp/Email";
import { useForm } from "react-hook-form";
import { BackArrow, Cancel } from "../Home";
import { useState, useContext } from 'react';
import { UserContext } from "../../../usercontext";
import { Helmet } from "react-helmet";
import { firstName, lastName, email, id, gender, month, day, year, password, URL } from './../index';

export default function Password() {
  const { setUser } = useContext(UserContext);

  const [value, setValue] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    gender: gender,
    month: month,
    day: day,
    year: year,
    password: password,
    passwordConfirm: ''
  })

  const {register, handleSubmit, watch, formState: { errors }} = useForm({
    defaultValues: {
      password: '',
      passwordConfirm: ''
    },
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
        method: "put",
        url: URL,
        data: {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          gender: value.gender,
          month: value.month,
          day: value.day,
          year: value.year,
          password: value.password,
        },
        headers: { "Content-Type": "application/json"},
      });
      var userObject = []
      userObject[0] = { 
        'firstName': value.firstName, 
        'lastName': value.lastName, 
        'email': value.email, 
        'gender': value.gender, 
        'month': value.month, 
        'day': value.day, 
        'year': value.year, 
        'password': value.password, 
        'id': id 
      }
      localStorage.setItem("user", JSON.stringify(userObject));
      setTimeout(function () {
        window.location.href = "/Google/myaccount/personalinfo/";
      }, 250);
    } catch(error) {
      console.log(error.response.data)
    }
    const user = await currentUser();
    setUser(user);
  }

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  }

  const validPasswordRegex =  /^(?=.*?[A-Z,a-z]).{8,}$/;
  const emptyStringRegex = /^(?![\s\S])/; // '' //
  const noSpaceStartOrEndRegex = /^[^\s].+[^\s]$/;

  return (
    <>
      <Helmet>
        <title>{t("my-account.personal-info.personal-password.password")}</title>
      </Helmet>
      <AccountHeader />
      <div className="form-bord-bot" />
      <section className="account-page-row-blue">
      <SubHeading />
        <section className="account-flex-form-wrap">
          <SubHeadNote />
          <section className="account-flex-form">
            <TopNote />
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <PasswordInput
                value={value}
                handleChange={handleChange}
                register={register}
                errors={errors}
                emptyStringRegex={emptyStringRegex}
                noSpaceStartOrEndRegex={noSpaceStartOrEndRegex}
                validPasswordRegex={validPasswordRegex}
              />
              <PasswordConfirmInput
                value={value}
                handleChange={handleChange}
                register={register}
                errors={errors}
                emptyStringRegex={emptyStringRegex}
                watch={watch}
                validPasswordRegex={validPasswordRegex}
              />
              <PasswordErrors
                errors={errors}
              />
              <Note />
              <Buttons 
                value={value}
                password={password}
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
        <BackArrow />
        <div className="account-subhead-text">{t("my-account.personal-info.personal-password.password")}</div>
      </div>
    </div>
  </div>
)

const SubHeadNote = () => (
  <div className="top-note subhead-note font-16">
    {t("my-account.personal-info.personal-password.top_note")}&nbsp;
    <a href="https://support.google.com/accounts/answer/27442" target="_blank" rel="noreferrer" className="learn-more">
      {t("more_information")}
    </a>
  </div>
)

const TopNote = () => (
  <div className="top-note font-12 uppercase">
    {t("my-account.personal-info.personal-password.update_password")}
  </div>
)

const PasswordInput = ({ register, emptyStringRegex, noSpaceStartOrEndRegex, validPasswordRegex, handleChange, errors }) => (
  <div className="input-container">
    <input 
      {...register("password", {
        required: true,
        minLength: 8,
        validate: {
          emptyString: (value) => emptyStringRegex.test(value) ? false : true, // ' ' //
          noSpaceStartOrEnd: (value) => noSpaceStartOrEndRegex.test(value) ? true : false,
          validPassword: (value) => validPasswordRegex.test(value) ? true : false
        }
      })}
      autoComplete="off"
      name="password"
      id="password"
      type="password"
      onChange={handleChange}
      className={(
        errors.password?.type === "minLength" ||
        errors.password?.type === "required" ||
        errors.password?.type === "noSpaceStartOrEnd")
        ? "change-form-input-error" : "change-form-input"
      }
      aria-invalid={errors.password ? "true" : "false"}
    />
    <div className="change-form-placeholder">
      {t("my-account.personal-info.personal-password.new_password")}
    </div>
  </div>
)

const PasswordConfirmInput = ({ register, emptyStringRegex, watch, validPasswordRegex, errors }) => (
  <div className="input-container">
    <input 
      {...register("passwordConfirm", {
        required: true,
        minLength: 8,
        validate: {
          emptyString: (value) => emptyStringRegex.test(value) ? false : true, // ' ' //
          passwordConfirm: (value) => value === watch('password') ? true : false,
          validPassword: (value) => validPasswordRegex.test(value) ? true : false
        }
      })}
      autoComplete="off"
      name="passwordConfirm"
      id="passwordConfirm"
      type="password"
      className={errors.password && (
        errors.passwordConfirm?.type === "minLength" ||
        errors.passwordConfirm?.type === "required" ||
        errors.passwordConfirm?.type !== "passwordConfirm")
        ? "change-form-input-error" : "change-form-input"
      }
      aria-invalid={errors.passwordConfirm ? "true" : "false"}
    />
    <div className="change-form-placeholder">
      {t("my-account.personal-info.personal-password.confirm_new_password")}
    </div>
  </div>
)

const PasswordErrors = ({ errors }) => {
  if ((errors.password?.type === "required") || 
    (errors.password?.type === "required" && 
    errors.passwordConfirm?.type === "required")) {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.password-errors.enter_password")}</p>
      </div>
    )
  } else if (errors.password?.type !== "validPassword" &&
    errors.password?.type !== "minLength" &&
    errors.passwordConfirm?.type === "required") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.password-errors.confirm_password")}</p>
      </div>
    )
  } else if (errors.password?.type !== "validPassword" &&
    errors.passwordConfirm?.type !== "required" && (
    errors.passwordConfirm?.type === "passwordConfirm" ||
    errors.passwordConfirm?.type === "minLength")) {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.password-errors.no_match")}</p>
      </div>
    )
  } else if (errors.password?.type === "minLength") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.password-errors.8_characters")}</p>
      </div>
    )
  }
}

const Note = () => (
  <div className="top-note">
    {t("my-account.personal-info.personal-password.note")}&nbsp;
    <a href="https://support.google.com/accounts/answer/6304920" target="_blank" rel="noreferrer" className="learn-more">
      {t("my-account.personal-info.personal-password.why")}
    </a>
  </div>
)

const Buttons = ({ value, password }) => (
  <div className="form-button-row">
    <Cancel />
    <button type="submit" className="next" disabled={ password === value.password }>
      {t("save")}
    </button>
  </div>
)