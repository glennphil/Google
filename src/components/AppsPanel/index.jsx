import { t } from 'i18next';

import './style.css';

export default function AppsPanel() {
  return (
    <div className="gapps-panel">
      <ul>
        <App 
          path="https://myaccount.google.com"
          position={{'backgroundPosition': '0 -1587px',}}
          title={t('gapps.account')}
        />
        <App 
          path="https://www.google.com/search/"
          position={{'backgroundPosition': '0 -1794px'}}
          title={t('gapps.search')}
        />
        <App 
          path="https://maps.google.com/maps/"
          position={{'backgroundPosition': '0 -483px',}}
          title={t('gapps.maps')}
        />
        <App 
          path="https://www.youtube.com/"
          position={{'backgroundPosition': '0 -2622px'}}
          title={t('gapps.youtube')}
        />
        <App 
          path="https://play.google.com/"
          position={{'backgroundPosition': '0 -207px',}}
          title={t('gapps.play')}
        />
        <App 
          path="https://news.google.com/"
          position={{'backgroundPosition': '0 -1311px'}}
          title={t('gapps.news')}
        />
        <App 
          path="https://mail.google.com/mail/"
          position={{'backgroundPosition': '0 -2001px',}}
          title={t('gmail')}
        />
        <App 
          path="https://meet.google.com/"
          position={{'backgroundPosition': '0 -690px'}}
          title={t('gapps.meet')}
        />
        <App 
          path="https://chat.google.com/"
          position={{'backgroundPosition': '0 -1656px',}}
          title={t('gapps.chat')}
        />
        <App 
          path="https://contacts.google.com/"
          position={{'backgroundPosition': '0 -2898px'}}
          title={t('gapps.contacts')}
        />
        <App 
          path="https://drive.google.com/"
          position={{'backgroundPosition': '0 -2967px',}}
          title={t('gapps.drive')}
        />
        <App 
          path="https://calendar.google.com/calendar/"
          position={{'backgroundPosition': '0 -2553px'}}
          title={t('gapps.calendar')}
        />
        <App 
          path="https://translate.google.com/"
          position={{'backgroundPosition': '0 -1932px',}}
          title={t('gapps.translate')}
        />
        <App 
          path="https://photos.google.com/"
          position={{'backgroundPosition': '0 -2829px'}}
          title={t('gapps.photos')}
        />
        <App 
          path="https://duo.google.com/"
          position={{'backgroundPosition': '0 -2484px',}}
          title={t('gapps.duo')}
        />
        <App 
          path="https://shopping.google.com/"
          position={{'backgroundPosition': '0 -69px'}}
          title={t('gapps.shopping')}
        />
      </ul>
      <div className="divider" />
      <ul>
        <App 
          path="https://www.google.com/finance/"
          position={{'backgroundPosition': '0 -345px',}}
          title={t('gapps.finance')}
        />
        <App 
          path="https://docs.google.com/document/"
          position={{'backgroundPosition': '0 -1242px'}}
          title={t('gapps.docs')}
        />
        <App 
          path="https://docs.google.com/spreadsheets/"
          position={{'backgroundPosition': '0 -2208px',}}
          title={t('gapps.sheets')}
        />
        <App 
          path="https://docs.google.com/presentation"
          position={{'backgroundPosition': '0 -2277px'}}
          title={t('gapps.slides')}
        />
        <App 
          path="https://books.google.com/"
          position={{'backgroundPosition': '0 -2760px',}}
          title={t('gapps.books')}
        />
        <App 
          path="https://www.blogger.com/"
          position={{'backgroundPosition': '0 -1863px'}}
          title={t('gapps.blogger')}
        />
        <App 
          path="https://hangouts.google.com/"
          position={{'backgroundPosition': '0 -2415px',}}
          title={t('gapps.hangouts')}
        />
        <App 
          path="https://keep.google.com/"
          position={{'backgroundPosition': '0 -276px'}}
          title={t('gapps.keep')}
        />
        <App 
          path="https://jamboard.google.com/"
          position={{'backgroundPosition': '0 -2070px',}}
          title={t('gapps.jamboard')}
        />
        <App 
          path="https://classroom.google.com/"
          position={{'backgroundPosition': '0 -966px'}}
          title={t('gapps.classroom')}
        />
        <App 
          path="https://earth.google.com/web/"
          position={{'backgroundPosition': '0 -1380px',}}
          title={t('gapps.earth')}
        />
        <App 
          path="https://www.google.com/save/"
          position={{'backgroundPosition': '0 -621px'}}
          title={t('gapps.collections')}
        />
        <App 
          path="https://artsandculture.google.com/"
          position={{'backgroundPosition': '0 -1518px',}}
          title={t('gapps.arts_and_culture')}
        />
        <App 
          path="https://ads.google.com/home/"
          position={{'backgroundPosition': '0 -414px'}}
          title={t('gapps.google_ads')}
        />
        <App 
          path="https://podcasts.google.com/"
          position={{'backgroundPosition': '0 -552px',}}
          title={t('gapps.podcasts')}
        />
        <App 
          path="https://one.google.com/"
          position={{'backgroundPosition': '0 -2691px'}}
          title={t('gapps.google_one')}
        />
        <App 
          path="https://www.google.com/travel/"
          position={{'backgroundPosition': '0 -3036px',}}
          title={t('gapps.travel')}
        />
        <App 
          path="https://docs.google.com/forms/"
          position={{'backgroundPosition': '0 -2139px'}}
          title={t('gapps.forms')}
        />
      </ul>
      <AllApps />
    </div>
  )
}

const App = (props) => (
  <li>
    <a className="gapps-link" href={props.path}>
      <div className="gapps-icons-transform">
        <span className="gapps-panel-icons" style={props.position} />
      </div>
      <span className="gapps-panel-labels">{props.title}</span>
    </a>
  </li>
)

const AllApps = () => (
  <div className="more-from-google">
    <a href="https://about.google/products/">
      {t('gapps.more_from_google')}
    </a>
  </div>
);
