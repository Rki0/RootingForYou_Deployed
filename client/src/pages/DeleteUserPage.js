import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../_actions/user_action";
import { logoutUser, deleteWholePost } from "../_actions/user_action";
import styles from "./DeleteUserPage.module.scss";

function DeleteUserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const agreeDelete = () => {
    // 회원탈퇴 후 로그아웃을 시키면, 로그아웃 라우터에서 필요한 정보가 없어져서 오류가 발생하므로
    // 로그아웃을 시킨 뒤 회원탈퇴를 진행시키는 것으로 해보자
    // 회원 탈퇴 시, 해당 유저의 게시물도 모두 삭제해야함
    // 유저 로그아웃 -> 해당 유저 게시물 전부 삭제 -> 회원 탈퇴

    // 로그아웃 전, 현재 로그인된 유저의 _id를 미리 저장해놓자
    let body = {
      userId: user.userData._id,
    };

    // 강제 로그아웃
    dispatch(logoutUser()).then((response) => {
      if (response.payload.logoutSuccess) {
        navigate("/");
      } else {
        return alert("오류 발생. 다시 시도해주세요.");
      }
    });

    // 해당 유저 게시물 전부 삭제
    dispatch(deleteWholePost(body))
      .then((response) => response.payload)
      .catch((err) => alert("오류 발생!"));

    // 회원탈퇴 action 디스패치
    dispatch(deleteUser(body))
      .then((response) => response.payload)
      .catch((err) => alert("회원 탈퇴가 실패했습니다. 다시 시도해주세요."));

    // 홈으로 이동시킴
    navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.deleteDiv}>
      <h1 className={styles.deleteUserTitle}>회원 탈퇴</h1>
      <p className={styles.deleteP}>
        회원님께서 작성하신 모든 게시물과 회원 정보가 삭제됩니다.
        <br />
        <strong>정말 탈퇴하시겠습니까?</strong>
      </p>
      <div className={styles.btnDiv}>
        <button className={styles.selectBtn} onClick={agreeDelete}>
          네
        </button>
        <button className={styles.selectBtn} onClick={goBack}>
          아니오
        </button>
      </div>
    </div>
  );
}

export default DeleteUserPage;
