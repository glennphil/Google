import Logo from './Logo/index';
import Header from './Header/index';
import PageLanguage from './PageLanguage/index';
import Footer from './Footer/index';
import Form from './Form/index';

export default function Search() {
  return (
    <main className="dark-bg">
      <Header />
      <Logo />
      <Form />
      <PageLanguage />
      <Footer  />
    </main>
  )
}
