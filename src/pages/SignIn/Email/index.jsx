import axios from 'axios';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import { useState } from 'react';

import './style.css';

export default function SignInEmail({ Logo, value, setValue, register, handleSubmit, onSubmit }) {
  const [user, setUser] = useState();

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  }

  async function uniqueEmail() {
    const response = await axios.get("https://google-frontend.herokuapp.com/users");
    const userInput = (value.email).toLowerCase();

    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].email === userInput) {
        console.log("email matches");
        axios.get("https://google-frontend.herokuapp.com/users?email=" + value.email).then((response) => {
          setUser(response.data[0]);
        return true;
      })
      }
    }
  }
  
  return (
    <div className="form-container">
      <Logo />
      <Heading />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="signin-form email-form">
        <input 
          {...register("email", {
            required: true,
            minLength: 2,
            validate: {
              checkEmail: async () => await uniqueEmail(),
            }
          })}
          autoComplete="off"
          name="email"
          type="text"
          value={value.email}
          onChange={handleChange}
          className="input-email"
        />
        <span className="input-placeholder">
          {t('sign-in.email.form_placeholder')}
        </span>
        </div>
        <Note />
        <div className="flex-row">
          <CreateAccount />
          <Next />
        </div>
      </form>
    </div>
  )
}

const Heading = () => (
  <center>
    <h1 className="heading">
      {t('sign-in.sign_in')}
    </h1>
    <h4 className="sub-heading">
      {t('sign-in.email.subheading')}
    </h4>
  </center>
);

const Note = () => (
  <div className="note">
    {t('sign-in.email.note')} 
    <br/>
    <a className="button-blue" href="https://support.google.com/chrome/answer/6130773?hl=en" rel="noreferrer" target="_blank">
      {t('learn_more')}
    </a>
  </div>
);

const CreateAccount = () => (
  <Link to="/signup/">
    <button className="create-account" type="button">
      {t('sign-in.email.create_account')}
    </button>
  </Link>
);

const Next = () => (
  <button type="submit" className="next">
    {t('next')}
  </button>
);
