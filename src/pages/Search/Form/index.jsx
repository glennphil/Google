import { useState } from 'react';
import { SearchIcon, MicrophoneIcon, XIcon } from '@heroicons/react/solid';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import './style.css';

export default function Form() {
  const [value, setValue] = useState({
    searchInput: ''
  });

  const {register, handleSubmit } = useForm({
    defaultValues: {
      searchInput: ''
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    delayError: 0,
  });

  const handleReset = () => {
    setValue(() => '')
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} method="get" action="https://www.google.com/search">
      <div className="search-container">
        <div className="search-bar">
          <SearchIcon className="search-icon" />
          <Input
            value={value}
            setvalue={setValue}
            register={register}
          />
          <ClearButton />
          <VoiceButton />
        </div>
      </div>
        <ul className="search-button">
          <GoogleSearch />
          <LuckySearch />
        </ul>
    </form>
  )
}

const Input = ({ register, value }) => (
  <input
    {...register("password", {
      required: true,
      minLength: 1,
      validate: (value) => {
        return !!value.trim()
      }
    })}
    type="search"
    title={t('search.searchbar_title')}
    className="searchInput"
    name="q"
    role="search"
    placeholder=" "
    maxLength="2048"
    autoComplete="off"
    spellCheck="false"
    aria-label="Search"
    setvalue={value.searchInput}
  />
)

const GoogleSearch = () => (
  <li>
    <button className="google-search" name="" type="submit">
      {t('search.google_search')}
    </button>
  </li>
)

const LuckySearch = () => (
  <li>
    <button className="lucky-search" name="btnI" type="submit">
      {t('search.lucky_search')}
    </button>
  </li>
);

const ClearButton = () => (
  <div className="clear-button">
    <button className="clear tip" type="reset" value='reset' aria-label="clear">
      <XIcon className="x-icon" />
      <span className="clear">
        {t('search.clear')}
      </span>
    </button>
  </div>
);

const VoiceButton = () => (
  <a href="https://www.google.com/" type="" className="tip" aria-label="search by voice">
    <MicrophoneIcon className="microphone-icon" />
    <span className="microphone">
      {t('search.search_by_voice')}
    </span>
  </a>
);
