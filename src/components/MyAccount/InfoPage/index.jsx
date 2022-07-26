import AccountHeader from "../../../components/MyAccount/Header";
import AccountSideBar from "../../../components/MyAccount/SideBar";
import AccountNavBar from "../../../components/MyAccount/NavBar";
import { Helmet } from "react-helmet";

export const InfoPage = (props) => {
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <main>
      <AccountHeader />
      <AccountNavBar />
      <section className="account-page-wrap">
        <AccountSideBar />
          <section className="account-flex">
            <div className="blue-wrap">
              <section className="account-main-wrap">
                {props.children}
            </section>
            <div className="red-wrap" />
          </div>
        </section>
      </section>
      </main>
    </>
  )
};