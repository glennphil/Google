import Search from './pages/Search';
import PageNotFound from './pages/404';
import SignUp from './pages/SignUp';
import SignInEmail from './pages/SignIn/Email';
import SignInPassword from './pages/SignIn/Password';
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

import Test from './pages/test';

export default function App() {
  const [theme] = useTheme();

  const ProtectedRoute = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      return <Outlet />
    }
    return <Navigate to="/signin/identifier/" />
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
          <Route exact path="/" element={<Search />}/>
          <Route path="/signin/identifier/" element={<SignInEmail />} />
          <Route path="/signin/challenge/" element={<SignInPassword />} />
          <Route path="/signup/" element={<SignUp />} />
          <Route path="/test/" element={<Test />} />
          <Route path="*" element={<PageNotFound />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/myaccount/" element={<Account />} />
            <Route path="/myaccount/personalinfo/" element={<PersonalInfo />} />
            <Route path="/myaccount/data-and-personalization/" element={<DataPrivacy />} />
            <Route path="/myaccount/deleteaccount/" element={<DeleteAccount />} />
            <Route path="/myaccount/name/" element={<Name />} />
            <Route path="/myaccount/birthday/" element={<Birthday />} />
            <Route path="/myaccount/gender/" element={<Gender />} />
            <Route path="/myaccount/email/" element={<Email />} />
            <Route path="/myaccount/password/" element={<Password />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
    </ThemeProvider>
    </>
  )
}
