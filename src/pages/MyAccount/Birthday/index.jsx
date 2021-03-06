import AccountHeader from "../../../components/MyAccount/Header";
import axios from "axios";
import { t } from 'i18next';
import { useForm } from "react-hook-form";
import { BackArrow, Cancel } from "../Home";
import { useState, useContext } from 'react';
import { UserContext } from "../../../usercontext";
import { Helmet } from "react-helmet";

import './style.css';

export default function Birthday() {
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
  const URL = "http://localhost:5000/users/" + id;

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
      month: value.month,
      day: value.day,
      year: value.year,
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
        window.location.href = "http://localhost:3000/myaccount/personalinfo/";
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
        <title>{t("my-account.personal-info.personal-birthday.birthday")}</title>
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
              <div className="birthday-row-change">
                <Month
                  value={value}
                  handleChange={handleChange}
                  register={register}
                  errors={errors}
                />
                <Day
                  value={value}
                  handleChange={handleChange}
                  register={register}
                  errors={errors}
                />
                <Year
                  value={value}
                  handleChange={handleChange}
                  register={register}
                  errors={errors}
                />
              </div>
              <Buttons 
                month={month}
                day={day}
                year={year}
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
        <div className="account-subhead-text">{t("my-account.personal-info.personal-birthday.birthday")}</div>
      </div>
    </div>
  </div>
)

const SubHeadNote = () => (
  <div className="top-note subhead-note font-16">
    {t("my-account.personal-info.personal-birthday.top_note")}&nbsp;
    <a href="https://support.google.com/accounts/answer/27442" target="_blank" rel="noreferrer" className="learn-more">
      {t("more_information")}
    </a>
  </div>
)

const TopNote = () => (
  <div className="top-note font-12 uppercase">
    {t("my-account.personal-info.personal-birthday.update_birthday")}
  </div>
)

const Month = ({ register, handleChange, value }) => (
  <div className="input-container">
    <select 
      {...register("month", {
        required: true
      })}
      className="change-form-input" 
      name="month"
      type="month"
      size="1"
      onChange={handleChange}
      value={value.month}
    >
      <option value="" defaultValue disabled hidden />
      <option value={t("months.1")}>{t("months.1")}</option>
      <option value={t("months.2")}>{t("months.2")}</option>
      <option value={t("months.3")}>{t("months.3")}</option>
      <option value={t("months.4")}>{t("months.4")}</option>
      <option value={t("months.5")}>{t("months.5")}</option>
      <option value={t("months.6")}>{t("months.6")}</option>
      <option value={t("months.7")}>{t("months.7")}</option>
      <option value={t("months.8")}>{t("months.8")}</option>
      <option value={t("months.9")}>{t("months.9")}</option>
      <option value={t("months.10")}>{t("months.10")}</option>
      <option value={t("months.11")}>{t("months.11")}</option>
      <option value={t("months.12")}>{t("months.12")}</option>
    </select>
    <div className="birthday-change-form-placeholder">
      {t("month")}
    </div>
  </div>
)

const Day = ({ register, handleChange, value }) => (
  <div className="input-container">
    <input 
      {...register("day", {
        required: true,
        minLength: 1,
        maxLength: 2,
        pattern: /[0-9]$/,
        validate: (value) => {
          return !!value.trim()
        }
      })}
      autoComplete="off"
      name="day"
      type="number"
      min="0"
      max="32"
      value={value.day}
      onChange={handleChange}
      className="change-form-input"
    />
    <div className="birthday-change-form-placeholder">
      {t("day")}
    </div>
  </div>
)

const Year = ({ register, handleChange, value }) => (
  <div className="input-container">
    <input 
      {...register("year", {
        required: true,
        minLength: 4,
        maxLength: 4,
        pattern: /[0-9]{4}$/,
        validate: (value) => {
          return !!value.trim()
        }
      })}
      autoComplete="off"
      name="year"
      type="number"
      min="1900"
      max="2022"
      value={value.year}
      onChange={handleChange}
      className="change-form-input"
    />
    <div className="birthday-change-form-placeholder">
      {t("year")}
    </div>
  </div>
)

const Buttons = ({ month, year, day, value }) => (
  <div className="form-button-row">
    <Cancel />
    <button type="submit" className="next" disabled={ month === value.month && year === value.year && day === value.day }>
      {t("save")}
    </button>
  </div>
)