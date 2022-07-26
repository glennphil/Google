import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useContext } from 'react';
import { UserContext } from "../../../usercontext";
import { Cancel, FormChangePage } from "../Home";

import './style.css';
import { t } from "i18next";

export default function Gender() {
  const obj = JSON.parse(localStorage.getItem('user'));
  const email = obj[0].email;
  const firstName = obj[0].firstName;
  const lastName = obj[0].lastName;
  const gender = obj[0].gender;
  const month = obj[0].month;
  const day = obj[0].day;
  const year = obj[0].year;
  const password = obj[0].password;
  const id = obj[0].id;
  const URL = "https://google-frontend.herokuapp.com/users/" + id;

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
  })

  const {register, handleSubmit } = useForm({
    defaultValues: {
      gender: value.gender,
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

  return (
    <FormChangePage
      title={t("my-account.personal-info.personal-gender.gender")}
      subheadPath="/myaccount/personalinfo/"
      note={t("my-account.personal-info.personal-gender.top_note")}
      notePath="https://support.google.com/accounts/answer/27442"
      topnote={t("my-account.personal-info.personal-gender.gender")}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <GenderInput 
          register={register}
          handleChange={handleChange}
          value={value}
        />
        <Buttons 
          value={value}
          gender={gender}
        />
      </form>
    </FormChangePage>
  )
}

const GenderInput = ({ register, handleChange }) => (
  <div className="input-container">
    <label htmlFor="Male" className="radio-container">
      <input
        {...register("gender")}
        type="radio"
        name="gender"
        value="Male"
        id="Male"
        onChange={handleChange}
      />
      <div className="radio-circle">
        <span className="radio" />
      </div>
      {t("genders.male")}
    </label>
    <label htmlFor="Female" className="radio-container">
      <input
        {...register("gender")}
        type="radio"
        name="gender"
        value="Female"
        id="Female"
        onChange={handleChange}
      />
      <div className="radio-circle">
        <span className="radio" />
      </div>
      {t("genders.female")}
    </label>
    <label htmlFor="Other" className="radio-container">
      <input
        {...register("gender")}
        type="radio"
        name="gender"
        value="Other"
        id="Other"
        onChange={handleChange}
      />
      <div className="radio-circle">
        <span className="radio" />
      </div>
      {t("genders.other")}
    </label>
  </div>
)

const Buttons = ({ gender, value }) => (
  <div className="form-button-row">
    <Cancel />
    <button type="submit" className="next" disabled={ gender === value.gender }>
      {t('save')}
    </button>
  </div>
)