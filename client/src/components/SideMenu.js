import classNames from "classnames/bind";
import styles from "./SideMenu.module.scss";
import { GrClose } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logoutUser } from "../_actions/user_action";

function SideMenu({ toggleBtn, setToggleBtn }) {
  const toggleMenu = () => {
    setToggleBtn(false);
  };

  // SideMenu.module.scss를 styles로 사용하고 있는데 그 것을 안 쓸 수 있게 해줌
  // active 같이 특정 조건에 className이 추가되는 상황에 유용하게 사용 가능
  const cx = classNames.bind(styles);

  const [authData, setAuthData] = useState(false);

  const user = useSelector((state) => state.user);

  // 데이터가 존재하기 전에 렌더링되어 오류가 발생하는 것을 막기 위해
  // user.userData를 감시
  // user에 userData가 존재할 때 setAuth를 하기 위해 optional chaining 문법 사용
  useEffect(() => {
    // user가 존재하지 않으면 undefined
    // user에 userData가 존재하지 않으면 undefined
    // 모두 존재하면 isAuth 할당
    setAuthData(user?.userData?.isAuth);
  }, [user?.userData]);

  // 로그아웃
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser()).then((response) => {
      if (response.payload.logoutSuccess) {
        navigate("/");
      } else {
        return alert("로그아웃이 실패했습니다.");
      }
    });
  };
  ////////

  // 메뉴바 이외의 공간 클릭 시 메뉴바 닫히도록 설정

  return (
    <nav className={cx("sideMenu", { active: toggleBtn })}>
      <div className={styles.menuHeader}>
        <button className={styles.closeBtn} onClick={toggleMenu}>
          <GrClose />
        </button>
        <span>메뉴</span>
      </div>

      <ul className={styles.menuList}>
        <li>
          <Link to="/" onClick={toggleMenu} className={styles.linkTag}>
            홈
          </Link>
        </li>
        <li>
          <Link to="/write" onClick={toggleMenu} className={styles.linkTag}>
            글 쓰기
          </Link>
        </li>
        <li>
          <Link to="/mypage" onClick={toggleMenu} className={styles.linkTag}>
            마이페이지
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={toggleMenu} className={styles.linkTag}>
            {/* 로그인 전에는 로그인, 로그인 후에는 마이 페이지로 변경되도록 설정 */}
            {authData ? (
              <button onClick={logoutHandler} className={styles.logOutBtn}>
                로그아웃
              </button>
            ) : (
              "로그인"
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideMenu;
