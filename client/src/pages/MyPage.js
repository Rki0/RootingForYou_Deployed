import { Link } from "react-router-dom";
import styles from "./MyPage.module.scss";

function MyPage() {
  return (
    <div className={styles.mypageListDiv}>
      <ul className={styles.mypageUl}>
        <li>
          <Link to="/mypage/mypost" className={styles.linkTag}>
            내가 작성한 글
          </Link>
        </li>
        <li>
          <Link to="/mypage/changepswd" className={styles.linkTag}>
            비밀번호 변경
          </Link>
        </li>
        <li>
          <Link to="/mypage/deleteuser" className={styles.linkTag}>
            회원 탈퇴
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MyPage;
