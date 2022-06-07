import axios from 'axios';
import { Information, Back, ErrorLogo } from '..';
import { t } from 'i18next';
import { useContext } from 'react';
import { UserContext } from '../../../../usercontext';

export default function Form({ value, setValue, register, handleSubmit, errors, watch, Next }) {
  const { setUser } = useContext(UserContext);

  const currentUser = async () => {
    let URL = "https://my-json-server.typicode.com/paq000/google/usersemail=" + value.email;
    let response = await axios.get(URL);
    return response.data;
  };

  const onSubmit = async() => {
    try {
      await axios({
        method: "post",
        url: "https://my-json-server.typicode.com/paq000/google/users/",
        data: {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          password: value.password,
          gender: value.gender,
          month: value.month,
          day: value.day,
          year: value.year
        },
        headers: { "Content-Type": "application/json"},
      });
      setTimeout(function () {
        window.location.href = "http://paq000.github.com/Google/";
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

  console.log(watch());

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup-form" noValidate>
      <div className="birthday-row">
        <Month 
          register={register}
          value={value}
          handleChange={handleChange}
          errors={errors}
        />
        <Day 
          register={register}
          value={value}
          handleChange={handleChange}
          errors={errors}
        />
        <Year 
          register={register}
          value={value}
          handleChange={handleChange}
          errors={errors}
        />
      </div>
      <BirthdayErrors errors={errors}/>
      <Gender 
        register={register}
        value={value}
        handleChange={handleChange}
        errors={errors}
      />
      <GenderErrors errors={errors}/>
      <Information />
      <div className="button-row">
        <Back />
        <Next/>
      </div>
    </form>
  )
}

const Month = ({ register, value, handleChange, errors }) => (
  <div className="input-container">
    <select 
      {...register("month", {
        required: true
      })}
      className={ errors.month ? "signup-input-error focus-red" : "signup-input focus-blue" }
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
    <div className="signup-input-placeholder-detail">
      {t("month")}
    </div>
  </div>
)

const Day = ({ register, handleChange, value, errors }) => (
  <div className="input-container">
    <input 
      {...register("day", {
        required: true,
        minLength: 1,
        maxLength: 2,
        pattern: /[0-9]$/,
        validate: (value) => {
          return !!value.trim()
        }, max: 31,
      })}
      autoComplete="off"
      name="day"
      type="number"
      value={value.day}
      onChange={handleChange}
      className={ errors.day?.type === "required" ||
        errors.day?.type === "minLength" || 
        errors.day?.type === "maxLength" || 
        errors.day?.type === "max" ? "signup-input-error" : "signup-input" }
    />
    <span className="signup-input-placeholder">
      {t("day")}
    </span>
  </div>
);

const Year = ({ register, value, handleChange, errors }) => (
  <div className="input-container">
    <input 
      {...register("year", {
        required: true,
        minLength: 4,
        maxLength: 4,
        pattern: /[0-9]$/,
        validate: (value) => {
          return !!value.trim()
        }, min: 1900, max: 2020,
      })}
      autoComplete="off"
      name="year"
      type="number"
      value={value.year}
      onChange={handleChange}
      className={ errors.year?.type === "required" ||
        errors.year?.type === "maxLength" || 
        errors.year?.type === "minLength" || 
        errors.year?.type === "min" || 
        errors.year?.type === "max" ? "signup-input-error" : "signup-input" }
    />
    <span className="signup-input-placeholder">
      {t("year")}
    </span>
  </div>
);

const Gender = ({ register, value, handleChange, errors }) => (
  <div className="input-container">
    <select 
      {...register("gender", {
        required: true
      })}
      className={ errors.gender?.type === "required" ? "signup-input-error focus-red input-width" : "signup-input focus-blue input-width" }
      name="gender"
      onChange={handleChange}
      value={value.gender}
    >
      <option value=""defaultValue disabled hidden/>
      <option value="Male">{t("genders.male")}</option>
      <option value="Female">{t("genders.female")}</option>
      <option value="Other">{t("genders.other")}</option>
    </select>
    <div className="signup-input-placeholder-detail">
      {t("gender")}
    </div>
  </div>
)

const BirthdayErrors = ({ errors }) => {
  if ((errors.year?.type === "required" && errors.day?.type === "required" && errors.month?.type === "required") ||
  ((errors.year?.type === "min" || errors.year?.type === "max") && (errors.day?.type === "max"))) {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.detail-errors.valid_birthdate")}</p>
      </div>
    )
  } else if (errors.year?.type === "required" && errors.day?.type === "required") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.detail-errors.day_year")}</p>
      </div>
    )
  } else if (errors.year?.type === "required" && errors.month?.type === "required") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.detail-errors.month_year")}</p>
      </div>
    )
  } else if (errors.day?.type === "required" && errors.month?.type === "required") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.detail-errors.month_day")}</p>
      </div>
    )
  } else if (errors.month?.type === "required") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.detail-errors.month")}</p>
      </div>
    )
  } else if (errors.day?.type === "required") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.detail-errors.day")}</p>
      </div>
    )
  } else if (errors.year?.type === "required") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.detail-errors.year")}</p>
      </div>
    )
  } else if (errors.year?.type === "min" || 
    errors.year?.type === "max") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.detail-errors.valid_year")}</p>
      </div>
    )
  } else if (errors.day?.type === "max") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.detail-errors.valid_day")}</p>
      </div>
    )
  } 
};

const GenderErrors = ({ errors }) => {
  if (errors.gender?.type === "required") {
    return (
      <div className="invalid">
        <ErrorLogo/>
        <p className="invalidtext">{t("sign-up.detail-errors.gender")}</p>
      </div>
    )
  }
}