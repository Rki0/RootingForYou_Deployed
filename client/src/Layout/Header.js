import { useState } from "react";
import styles from "./Header.module.scss";
import MenuToggleBtn from "../components/Header/MenuToggleBtn";
import SideMenu from "../components/SideMenu";
import SearchBtn from "../components/Header/SearchBtn";
import { Outlet, Link } from "react-router-dom";

function Header() {
  // 메뉴를 여닫기 위한 state
  const [toggleBtn, setToggleBtn] = useState(false);

  return (
    <>
      <header>
        <MenuToggleBtn toggleBtn={toggleBtn} setToggleBtn={setToggleBtn} />
        <Link to="/" className={styles.headTitle}>
          너에게 닿기를
        </Link>
        <SearchBtn />

        <SideMenu toggleBtn={toggleBtn} setToggleBtn={setToggleBtn} />
      </header>

      <Outlet />
    </>
  );
}

export default Header;
