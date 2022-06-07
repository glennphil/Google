import axios from 'axios';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import { useState } from 'react';

import './style.css';
import './../../../components/SignPage/Container/style.css';
import './../../../components/SignPage/NextButton/style.css';
import './../../../components/SignPage/Heading/style.css';
import './../../../components/SignPage/SignInForm/style.css';

export default function SignInEmail({ Logo, value, setValue, register, handleSubmit, onSubmit, Next }) {
  const [user, setUser] = useState();

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  }

  async function uniqueEmail() {
    const response = await axios.get("https://my-json-server.typicode.com/paq000/google/users/");
    const userInput = (value.email).toLowerCase();

    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].email === userInput) {
        console.log("email matches");
        axios.get("https://my-json-server.typicode.com/paq000/google/users?email=" + value.email).then((response) => {
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
      <Form
        uniqueEmail={uniqueEmail}
        handleSubmit={handleSubmit} 
        value={value} 
        onSubmit={onSubmit} 
        handleChange={handleChange} 
        register={register} 
      />
      <Note />
      <div className="flex-row">
        <CreateAccount />
        <Next />
      </div>
    </div>
  )
}

const Heading = () => (
  <>
    <center><h1 className="heading">{t('sign-in.sign_in')}</h1></center>
    <center><h4 className="sub-heading">{t('sign-in.email.subheading')}</h4></center>
  </>
);

const Form = ({ handleSubmit, onSubmit, handleChange, value, register, uniqueEmail }) => (
  <form onSubmit={handleSubmit(onSubmit)} className="signin-form email-form" noValidate>
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
  </form>
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
  <Link to="/Google/signup/">
    <button className="create-account">
      {t('sign-in.email.create_account')}
    </button>
  </Link>
);
