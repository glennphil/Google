import AccountHeader from "../../../components/MyAccount/Header";
import axios from "axios";
import { t } from 'i18next';
import { ErrorLogo } from "../../SignUp/Email";
import { useForm } from "react-hook-form";
import { BackArrow, Cancel } from "../Home";
import { useState, useContext } from 'react';
import { UserContext } from "../../../usercontext";
import { Helmet } from "react-helmet";
import { UsersIcon } from "@heroicons/react/solid";

import './style.css';

export default function Name() {
  const { setUser } = useContext(UserContext);

  const obj = JSON.parse(localStorage.getItem('user'));
  const email = obj[0].email;
  const firstName = obj[0].firstName;
  const lastName = obj[0].lastName;
  const id = obj[0].id;
  const gender = obj[0].gender;
  const month = obj[0].month;
  const day = obj[0].day;
  const year = obj[0].year;
  const password = obj[0].password;
  const URL = "https://my-json-server.typicode.com/paq000/google/users/" + id;

  const [value, setValue] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    gender: gender,
    month: month,
    day: day,
    year: year,
    password: password,
  })

  const {register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      firstName: value.firstName,
      lastName: value.lastName
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
        window.location.href = "http://paq000.github.io/Google/myaccount/personalinfo/";
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

  return (
    <>
      <Helmet>
        <title>{t("my-account.personal-info.personal-name.name")}</title>
      </Helmet>
      <AccountHeader />
      <div className="form-bord-bot" />
      <section className="account-page-row-blue">
        <SubHeading />
        <section className="account-flex-form-wrap">
          <section className="account-flex-form">
            <TopNote />
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FirstName
                value={value}
                handleChange={handleChange}
                register={register}
                errors={errors}
              />
              <LastName
                value={value}
                handleChange={handleChange}
                register={register}
                errors={errors}
              />
              <NameErrors
                errors={errors}
              />
              <Note />
              <Buttons 
                firstName={firstName}
                lastName={lastName}
                value={value}
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
        <div className="account-subhead-text">{t("my-account.personal-info.personal-name.name")}</div>
      </div>
    </div>
  </div>
)

const TopNote = () => (
  <div className="top-note">
      {t("my-account.personal-info.personal-name.top_note")}&nbsp;
    <a href="https://support.google.com/accounts/answer/27442" target="_blank" rel="noreferrer" className="learn-more">
      {t("more_information")}
    </a>
  </div>
)

const FirstName = ({ register, handleChange, value, errors }) => (
  <div className="input-container">
    <input 
      {...register("firstName", {
        required: true,
        minLength: 2,
        maxLength: 16,
        pattern: /^[a-z,A-Z ,.'-]{2,16}$/,
        validate: (value) => {
          return !!value.trim()
        }
      })}
      autoComplete="off"
      name="firstName"
      type="text"
      value={value.firstName}
      onChange={handleChange}
      className={(
        errors.firstName?.type === "pattern" ||
        errors.firstName?.type === "minLength" ||
        errors.firstName?.type === "maxLength" ||
        errors.firstName?.type === "validate" ||
        errors.firstName?.type === "required")
        ? "change-form-input-error" : "change-form-input"
      }
      aria-invalid={errors.firstName ? "true" : "false"}
    />
    <div className="change-form-placeholder">
      {t("sign-up.email.first_name")}
    </div>
  </div>
)

const LastName = ({ register, handleChange, value, errors }) => (
  <div className="input-container">
    <input 
      {...register("lastName", {
        required: true,
        minLength: 2,
        maxLength: 16,
        pattern: /^[a-z,A-Z ,.'-]{2,16}$/,
        validate: (value) => {
          return !!value.trim()
        }
      })}
      autoComplete="off"
      name="lastName"
      type="text"
      value={value.lastName}
      onChange={handleChange}
      className={(
        errors.lastName?.type === "pattern" ||
        errors.lastName?.type === "minLength" ||
        errors.lastName?.type === "maxLength" ||
        errors.lastName?.type === "validate" ||
        errors.lastName?.type === "required")
        ? "change-form-input-error" : "change-form-input"
      }
      aria-invalid={errors.lastName ? "true" : "false"}
    />
    <div className="change-form-placeholder">
      {t("sign-up.email.last_name")}
    </div>
  </div>
)

const NameErrors = ({ errors }) => {
  if ((errors.firstName?.type === "required" && errors.lastName?.type === "required") || 
      (errors.firstName?.type === "validate" && errors.lastName?.type === "validate")) {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.name-errors.enter_first_last")}</p>
      </div>
    )
  } else if (errors.firstName?.type === "pattern" || 
    errors.lastName?.type === "pattern" ||
    errors.firstName?.type === "maxLength" || 
    errors.lastName?.type === "maxLength" || 
    errors.firstName?.type === "minLength" || 
    errors.lastName?.type === "minLength") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.name-errors.enter_correct")}</p>
      </div>
    )
  } else if (errors.firstName && !errors.lastName) {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.name-errors.enter_first")}</p>
      </div>
    )
  } else if (!errors.firstName && errors.lastName) {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.name-errors.enter_last")}</p>
      </div>
    )
  }
}

const Note = () => (
  <>
    <div className="header-note">{t("my-account.personal-info.personal-name.note_head")}</div>
      <div className="users-row">
        <UsersIcon className="users-icon"/>
        <div className="users-note top-note">
          {t("my-account.personal-info.personal-name.note")}&nbsp;
          <a href="https://support.google.com/accounts/answer/6304920" target="_blank" rel="noreferrer" className="learn-more">
            {t("learn_more")}.
          </a>
        </div>
      </div>
  </>
)

const Buttons = ({ firstName, lastName, value }) => (
  <div className="form-button-row">
    <Cancel />
    <button type="submit" className="next" disabled={ firstName === value.firstName && lastName === value.lastName }>{t("save")}</button>
  </div>
)
