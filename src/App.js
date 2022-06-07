import Search from './pages/Search';
import PageNotFound from './pages/404';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Account from './pages/MyAccount/Home';
import PersonalInfo from './pages/MyAccount/PersonalInfo';
import Name from './pages/MyAccount/Name';
import Birthday from './pages/MyAccount/Birthday';
import Gender from './pages/MyAccount/Gender';
import Email from './pages/MyAccount/Email';
import Password from './pages/MyAccount/Password';
import DataPrivacy from './pages/MyAccount/DataPrivacy';
import DeleteAccount from './pages/MyAccount/DeleteAccount';
import UserContextProvider from './usercontext';
import { darkTheme, lightTheme, GlobalStyles, ThemeProvider, useTheme } from './themes';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function App() {
  const [theme] = useTheme();

  const UserRoute = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
      return <Outlet />
    }
    return <Navigate to="/myaccount/" />
  }

  const NoUserRoute = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      return <Outlet />
    }
    return <Navigate to="/signin/" />
  }

  return (
    <>
    <Helmet>
      <title>Google</title>
    </Helmet>
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <GlobalStyles />
    <UserContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={() => (<Navigate to='/Google/' />)} />
          <Route path="/Google/" element={<Search />}/>
          <Route path="/Google/*" element={<PageNotFound />} />
          <Route element={<UserRoute />}>
            <Route path="/Google/signin/" element={<SignIn />} />
            <Route path="/Google/signup/" element={<SignUp />} />
          </Route>
          <Route element={<NoUserRoute />}>
            <Route path="/Google/myaccount/" element={<Account />} />
            <Route path="/Google/myaccount/personalinfo/" element={<PersonalInfo />} />
            <Route path="/Google/myaccount/data-and-personalization/" element={<DataPrivacy />} />
            <Route path="/Google/myaccount/deleteaccount/" element={<DeleteAccount />} />
            <Route path="/Google/myaccount/name/" element={<Name />} />
            <Route path="/Google/myaccount/birthday/" element={<Birthday />} />
            <Route path="/Google/myaccount/gender/" element={<Gender />} />
            <Route path="/Google/myaccount/email/" element={<Email />} />
            <Route path="/Google/myaccount/password/" element={<Password />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
    </ThemeProvider>
    </>
  )
}
