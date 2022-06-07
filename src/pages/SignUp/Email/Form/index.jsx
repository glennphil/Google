import axios from 'axios';
import { ShowPassword } from '../../../../components/SignPage/ShowPassword';
import { SignInInstead, ErrorLogo } from '..';
import { t } from 'i18next';

import '../style.css';

export default function Form({ value, setValue, register, handleSubmit, errors, watch, onSubmit, Next }) {
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  }

  console.log(errors);

  const validPasswordRegex =  /^(?=.*?[A-Z,a-z]).{8,}$/;
  const validEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // user@domain.com //
  const noUsernameRegex = /^@\w+([.-]?\w+)*$/; // @hello //
  const noUsernameDotRegex = /^@\w+([.-]?\w+)*(\.)$/; // @domain. //
  const onlyCharactersRegex = /^\w+([.-]?\w+)*$/; // adsfasdfasdf //
  const noDomainRegex = /^\w+([.-]?\w+)*@$/; // user@ //
  const noAtRegex = /^\w+([.-]?\w+)*(\.)+$/; // user. //
  const noAtWithTopDomainRegex = /^\w+([.-]?\w+)*(\.\w{2,3})+$/; // user.com //
  const emptyStringRegex = /^(?![\s\S])/; // '' //

  async function uniqueEmail(e) {
    const response = await axios.get("https://my-json-server.typicode.com/paq000/google/users/");
    const userInput = (value.email).toLowerCase();

    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].email === userInput) {
        console.log("email matches");
        return false;
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup-form" noValidate>
      <div className="name-row">
        <FirstName 
          register={register}
          value={value} 
          handleChange={handleChange}
          errors={errors}
        />
        <LastName 
          register={register}
          value={value} 
          handleChange={handleChange}
          errors={errors}
        />
      </div>
      <NameErrors errors={errors}/>
      <Email 
          register={register}
          value={value} 
          handleChange={handleChange}
          errors={errors}
          noUsernameRegex={noUsernameRegex}
          noUsernameDotRegex={noUsernameDotRegex}
          onlyCharactersRegex={onlyCharactersRegex}
          validEmailRegex={validEmailRegex}
          noDomainRegex={noDomainRegex}
          noAtRegex={noAtRegex}
          noAtWithTopDomainRegex={noAtWithTopDomainRegex}
          emptyStringRegex={emptyStringRegex}
          uniqueEmail={uniqueEmail}
        />
      <EmailErrors errors={errors}/>
      <div className="name-row">
        <Password
          register={register}
          handleChange={handleChange}
          errors={errors}
          validPasswordRegex={validPasswordRegex} 
          emptyStringRegex={emptyStringRegex}
        />
        <PasswordConfirm
          register={register}
          watch={watch}
          errors={errors}
          validPasswordRegex={validPasswordRegex} 
          emptyStringRegex={emptyStringRegex}
        />
      </div>
      <PasswordNote value={value} errors={errors}/>
      <PasswordErrors errors={errors}/>
      <ShowPassword />
      <div className="button-row">
        <SignInInstead />
        <Next/>
      </div>
    </form>
  )
}

const FirstName = ({ register, value, handleChange, errors }) => (
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
        ? "signup-input-error" : "signup-input"
      }
      aria-invalid={errors.firstName ? "true" : "false"}
    />
    <span className="signup-input-placeholder">
      {t("sign-up.email.first_name")}
    </span>
  </div>
);

const LastName = ({ register, value, handleChange, errors }) => (
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
        ? "signup-input-error" : "signup-input"
      }
      aria-invalid={errors.lastName ? "true" : "false"}
    />
    <span className="signup-input-placeholder">
      {t("sign-up.email.last_name")}
    </span>
  </div>
);

const Email = ({ register, value, handleChange, errors, noUsernameRegex, noUsernameDotRegex, onlyCharactersRegex, validEmailRegex, noDomainRegex, noAtRegex, noAtWithTopDomainRegex, emptyStringRegex, uniqueEmail }) => (
  <div className="input-container">
    <input 
      {...register("email", {
        required: true,
        minLength: 2,
        validate: {
          noUsername: (value) => noUsernameRegex.test(value) ? false : true, // @domain //
          noUsernameDot: (value) => noUsernameDotRegex.test(value) ? false : true, // @domain. //
          onlyCharacters: (value) => onlyCharactersRegex.test(value) ? false : true, // abcdefg //
          validEmail: (value) => validEmailRegex.test(value) ? true : false, // user@domain.com //
          noDomain: (value) => noDomainRegex.test(value) ? false : true, // user@ //
          noAt: (value) => noAtRegex.test(value) ? false : true, // user. //
          noAtWithTopDomain : (value) => noAtWithTopDomainRegex.test(value) ? false : true, // user.com // 
          emptyString: (value) => emptyStringRegex.test(value) ? false : true, // ' ' //
          checkEmail: async () => await uniqueEmail(),
        }
      })}
      autoComplete="off"
      name="email"
      type="email"
      value={value.email}
      onChange={handleChange}
      className={(errors.email?.type === "validEmail" || 
        errors.email?.type === "noUsername" ||
        errors.email?.type === "noUsernameDot" ||
        errors.email?.type === "onlyCharacters" ||
        errors.email?.type === "noDomain" ||
        errors.email?.type === "required" ||
        errors.email?.type === "noAt" ||
        errors.email?.type === "emptyString" ||
        errors.email?.type === "noAtWithTopDomain" ||
        errors.email?.type === "checkEmail")
        ? "signup-input-error" : "signup-input"
      }
      aria-invalid={errors.email ? "false" : "true"}
    />
    <span className="signup-input-placeholder">
      {t("sign-up.email.email")}
    </span>
  </div>
);

const Password = ({ register, handleChange, errors, validPasswordRegex, emptyStringRegex }) => (
  <div className="input-container">
    <input 
      {...register("password", {
        required: true,
        minLength: 8,
        validate: {
          emptyString: (value) => emptyStringRegex.test(value) ? false : true, // ' ' //
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
        errors.password?.type === "required")
        ? "signup-input-error" : "signup-input"
      }
      aria-invalid={errors.password ? "true" : "false"}
    />
    <span className="signup-input-placeholder">
      {t("sign-up.email.password")}
    </span>
  </div>
);

const PasswordConfirm = ({ register, watch, errors, validPasswordRegex, emptyStringRegex }) => (
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
      className={(
        errors.passwordConfirm?.type === "minLength" ||
        errors.passwordConfirm?.type === "required" ||
        errors.passwordConfirm?.type === "passwordConfirm")
        ? "signup-input-error" : "signup-input"
      }
      aria-invalid={errors.passwordConfirm ? "true" : "false"}
    />
    <span className="signup-input-placeholder">
      {t("sign-up.email.confirm")}
    </span>
  </div>
);

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

const EmailErrors = ({ errors }) => {
  if (errors.email?.type === "required" ||
    errors.email?.type === "emptyString") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.email-errors.enter_email")}</p>
      </div>
    )
  } else if (errors.email?.type === "noUsername" || 
    errors.email?.type === "noUsernameDot") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.email-errors.enter_username")}</p>
      </div>
    )
  } else if (errors.email?.type === "onlyCharacters" ||
    errors.email?.type === "noAt" ||
    errors.email?.type === "noAtWithTopDomain") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.email-errors.enter_at")}</p>
      </div>
    )
  } else if (errors.email?.type === "checkEmail") {
    return (
      <div className="invalid">
      <ErrorLogo/>
      <p className="invalidtext">{t("sign-up.email-errors.email_exists")}</p>
    </div>
    )
  } else if (errors.email?.type === "validEmail" && ( 
    errors.email?.type !== "noUsername" ||
    errors.email?.type !== "noUsernameDot" ||
    errors.email?.type !== "onlyCharacters" ||
    errors.email?.type !== "noDomain" ||
    errors.email?.type !== "noAt" ||
    errors.email?.type !== "noAtWithTopDomain")) {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.email-errors.not_valid")}</p>
      </div>
    )
  }
}

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

const PasswordNote = ({ value, errors }) => {
  if ((((value.password) === '' || (value.passwordConfirm) === '') && errors.password?.type !== "minLength") && (errors.password?.type !== "required")) {
    return (
    <div className="signup-note">
      {t("sign-up.email.password_note")}
    </div>
    )
  }
};
