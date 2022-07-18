import styles from "./JoinPage.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

function JoinPage() {
  const [nickname, setNickname] = useState("");

  const [userId, setUserId] = useState("");

  const [userPswd, setUserPswd] = useState("");

  const [checkPswd, setCheckPswd] = useState("");

  const nicknameHandler = (e) => {
    setNickname(e.target.value);
  };

  const idHandler = (e) => {
    setUserId(e.target.value);
  };

  const pswdHandler = (e) => {
    setUserPswd(e.target.value);
  };

  const checkPswdHandler = (e) => {
    setCheckPswd(e.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitOccur = (e) => {
    e.preventDefault();

    if (userPswd !== checkPswd) {
      return alert("비밀번호가 다릅니다. 다시 확인해주세요");
    }

    let body = {
      name: nickname,
      email: userId,
      password: userPswd,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("이미 가입된 이메일입니다.");
      }
    });

    setNickname("");
    setUserId("");
    setUserPswd("");
    setCheckPswd("");
  };

  return (
    <div className={styles.topDiv}>
      <div className={styles.titleDiv}>
        <h1 className={styles.joinTitle}>새로운 "나"를 만들어보세요</h1>
      </div>

      <form onSubmit={submitOccur}>
        <div className={styles.styledDiv}>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={nicknameHandler}
          />
        </div>

        <div className={styles.styledDiv}>
          <label htmlFor="userId">아이디</label>
          <input
            id="userId"
            type="e-mail"
            placeholder="이메일을 입력해주세요"
            value={userId}
            onChange={idHandler}
          />
        </div>

        <div className={styles.styledDiv}>
          <label htmlFor="userPswd">비밀번호</label>
          <input
            id="userPswd"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={userPswd}
            onChange={pswdHandler}
          />
        </div>

        <div className={styles.styledDiv}>
          <label htmlFor="checkPswd">비번확인</label>
          <input
            id="checkPswd"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            value={checkPswd}
            onChange={checkPswdHandler}
          />
        </div>

        <div className={styles.btnDiv}>
          <button type="submit">만들기</button>
        </div>
      </form>
    </div>
  );
}

export default JoinPage;
