import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePswd, logoutUser } from "../_actions/user_action";
import styles from "./ChangePswdPage.module.scss";

function ChangePswdPage() {
  const [currPswd, setCurrPswd] = useState("");
  const [postPswd, setPostPswd] = useState("");
  const [checkPswd, setCheckPswd] = useState("");

  const currPswdHandler = (e) => {
    setCurrPswd(e.target.value);
  };

  const postPswdHandler = (e) => {
    setPostPswd(e.target.value);
  };

  const checkPswdHandler = (e) => {
    setCheckPswd(e.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const changePswdHandler = () => {
    // 변경하려는 비밀번호 입력과 비밀번호 확인 입력이 같지 않으면 return
    if (postPswd !== checkPswd) {
      return alert("비밀번호가 다릅니다!");
    }

    let body = {
      // 로그인 되어있는 유저 email을 활용하여 기존 비밀번호 정보 가져옴
      // 아이디를 활용하는게 굳이 필요한 과정인가 싶긴한데...아직은 비밀번호만 가지고 라우팅하는걸 모르겠으니까 이렇게라도 해보자!
      userId: user.userData._id,
      email: user.userData.email,
      password: currPswd,
      changePassword: postPswd,
    };

    dispatch(changePswd(body))
      .then((response) => {
        if (!response.payload.passwordCheckSuccess) {
          return alert("현재 비밀번호를 다시 입력해주세요.");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // 변경된 비밀번호로 다시 로그인하도록 강제 로그아웃
    dispatch(logoutUser()).then((response) => {
      if (response.payload.logoutSuccess) {
        navigate("/login");
      } else {
        return alert("오류 발생. 다시 시도해주세요.");
      }
    });

    setCurrPswd("");
    setPostPswd("");
    setCheckPswd("");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.topDiv}>
      <h1 className={styles.title}>비밀번호 변경</h1>
      <div className={styles.inputDiv}>
        <label className={styles.styledLabel}>현재 비밀번호 입력</label>
        <input
          className={styles.styledInput}
          type="password"
          placeholder="현재 비밀번호를 입력해주세요"
          value={currPswd}
          onChange={currPswdHandler}
        />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.styledLabel}>새로운 비밀번호 입력</label>
        <input
          className={styles.styledInput}
          type="password"
          placeholder="새로운 비밀번호를 입력해주세요"
          value={postPswd}
          onChange={postPswdHandler}
        />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.styledLabel}>새로운 비밀번호 확인</label>
        <input
          className={styles.styledInput}
          type="password"
          placeholder="다시 한번 입력해주세요"
          value={checkPswd}
          onChange={checkPswdHandler}
        />
      </div>
      <div className={styles.btnDiv}>
        <button className={styles.changeBtn} onClick={changePswdHandler}>
          변경
        </button>
        <button className={styles.backBtn} onClick={goBack}>
          뒤로가기
        </button>
      </div>
    </div>
  );
}

export default ChangePswdPage;
