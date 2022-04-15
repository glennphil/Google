import OutsideClickHandler from 'react-outside-click-handler';
import SettingsPanel from './../../SettingsPanel';
import { useState } from 'react';
import { t } from 'i18next';

import './style.css';

export default function TogglePanel() {
  const [show, setShow] = useState(false);

  return (
    <li>
      <OutsideClickHandler onOutsideClick={() => { setShow(false); }}>
        <button onClick={() => setShow(!show)} className="settings" alt="Settings">
          {t('settings')}
        </button>
        { show ? <SettingsPanel/> : null }
      </OutsideClickHandler>
    </li>
  )
}