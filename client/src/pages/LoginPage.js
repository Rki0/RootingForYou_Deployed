import styles from "./Loginpage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/user_action";

function MyPage() {
  const [userEmail, setUserEmail] = useState("");

  const [userPswd, setUserPswd] = useState("");

  const changeEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const changePswd = (e) => {
    setUserPswd(e.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitOccur = (e) => {
    e.preventDefault();

    let body = {
      email: userEmail,
      password: userPswd,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("로그인 실패");
      }
    });

    setUserEmail("");
    setUserPswd("");
  };

  return (
    <div className={styles.topDiv}>
      <form onSubmit={submitOccur}>
        <div className={styles.styledDiv}>
          <label htmlFor="userEmail">이메일</label>
          <input
            type="e-mail"
            placeholder="이메일을 입력해주세요"
            className={styles.userId}
            id="userEmail"
            value={userEmail}
            onChange={changeEmail}
          />
        </div>

        <div className={styles.styledDiv}>
          <label htmlFor="userPswd">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            id="userPswd"
            value={userPswd}
            onChange={changePswd}
          />
        </div>

        <div className={styles.loginBtn}>
          <button type="submit">로그인</button>
        </div>
      </form>

      <Link to="/join" className={styles.joinLink}>
        회원가입
      </Link>
    </div>
  );
}

export default MyPage;
