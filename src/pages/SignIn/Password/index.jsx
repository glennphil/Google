import axios from 'axios';
import { ShowPassword } from '../../../components/SignPage/ShowPassword';
import { useContext } from 'react';
import { UserContext } from '../../../usercontext';
import { t } from 'i18next';

import './style.css';
import './../../../components/SignPage/Container/style.css';
import './../../../components/SignPage/NextButton/style.css';
import './../../../components/SignPage/Heading/style.css';
import './../../../components/SignPage/SignInForm/style.css';
import './../../../components/SignPage/ShowPassword/style.css';

export default function SignInPassword({ Logo, value, setValue, register, handleSubmit, errors, Next }) {
  const { setUser } = useContext(UserContext);

  const currentUser = async () => {
    let URL = "https://google-frontend.herokuapp.com/users?email=" + value.email;
    let response = await axios.get(URL);
    return response.data;
  };

  async function matchPassword() {
    const response = await axios.get("https://google-frontend.herokuapp.com/users?email=" + value.email);
    const userInput = (value.password);

    if (response.data[0].password === userInput) {
      console.log("password matches");
      return true;
    }
  }

  const onSubmit = async() => {
    setTimeout(function () {
      window.location.href = "http://paq000.github.io/Google/";
    }, 250);
    const user = await currentUser();
      setUser(user);
  }

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  }

  console.log(errors);

  return (
    <div className="form-container">
      <Logo />
      <Heading value={value} />
      <Form
        matchPassword={matchPassword}
        handleSubmit={handleSubmit} 
        value={value} 
        onSubmit={onSubmit} 
        handleChange={handleChange} 
        register={register} 
      />
      <ShowPassword />
      <div className="flex-row">
        <div />
        <Next />
      </div>
    </div>
  )
}

const Heading = ({ value }) => (
  <center>
    <h1 className="heading">
      {t("sign-in.password.heading")}&nbsp; firstName
    </h1>
    <div className="email-name">
      {value.email}
    </div>
  </center>
);

const Form = ({ handleSubmit, onSubmit, handleChange, value, register, matchPassword }) => (
  <form onSubmit={handleSubmit(onSubmit)} className="signin-form pass-form" noValidate>
    <input 
      {...register("password", {
        required: true,
        minLength: 8,
        validate: {
          checkPassword: async () => await matchPassword(),
        }
      })}
      autoComplete="off"
      name="password"
      id="password"
      type="password"
      value={value.password}
      onChange={handleChange}
      className="input-email"
    />
    <span className="input-placeholder">
      {t("sign-in.password.form_placeholder")}
    </span>
  </form>
);
