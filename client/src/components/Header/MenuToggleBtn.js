import styles from "./MenuToggleBtn.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";

function MenuToggleBtn({ toggleBtn, setToggleBtn }) {
  const toggleMenu = () => {
    setToggleBtn(true);
  };

  return (
    <div>
      <button className={styles.openBtn} onClick={toggleMenu}>
        <GiHamburgerMenu />
      </button>
    </div>
  );
}

export default MenuToggleBtn;
