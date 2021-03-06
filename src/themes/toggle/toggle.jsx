import styled from 'styled-components';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';
import { t } from 'i18next';

import '../../pages/Search/SettingsPanel/style.css'

export const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';

  return (
    <ToggleContainer lightTheme={!isLight} onClick={toggleTheme}>
      <div><DarkOn /></div>
      <div><DarkOff /></div>
    </ToggleContainer>
  );
};

const DarkOff = () => (
  <li>
    <button className="dark-off" role="menuitem" tabIndex="-1" alt="Settings" onClick={() => window.location.reload(false)}>
      {t('search.footer.dark_theme.off')}
      <SunIcon className="sun-icon"/>
    </button>
 </li>
);
  
const DarkOn = () => (
  <li>
    <button className="dark-on" role="menuitem" tabIndex="-1" alt="Settings" onClick={() => window.location.reload(false)}>
      {t('search.footer.dark_theme.on')}
      <MoonIcon className="moon-icon"/>
    </button>
  </li>
);

const ToggleContainer = styled.button`
  div {
    &:first-child {
      display: ${({ lightTheme }) => lightTheme ? 'none' : 'block' };
    }

    &:nth-child(2) {
      display: ${({ lightTheme }) => lightTheme ? 'block' : 'none' };
    }
  }
`;
