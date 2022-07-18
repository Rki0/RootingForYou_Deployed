import styles from "./Write.module.scss";
import { useState, useRef } from "react";
import { HiOutlineCheckCircle, HiCheckCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

function Write() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const userName = useRef();

  const titleInput = (e) => {
    setTitle(e.target.value);
  };

  const textInput = (e) => {
    setText(e.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitAll = (e) => {
    e.preventDefault();

    // 게시물이 등록되는 시간을 파악하기 위함
    let postingTime = new Date();

    let now = postingTime.toLocaleString();

    let body = {
      // 익명으로 설정했을 때는 input에 있는 value값을 가져와야함. 익명이 아니더라도 그렇게 설정하는 편이 훨씬 깔끔할 것 같다.
      // readOnly로 설정해놨기 때문에 onChange를 적용하기가 힘들다. useRef로 가져오는 건 어떨까?
      name: userName.current.value,
      // name: user.userData.name,
      email: user.userData.email,
      // 회원 탈퇴시 해당 유저의 모든 게시물을 삭제하기 위해, 동일한 키 값이 필요함
      // 회원의 _id를 활용할 것. 같은 email로 다른 계정 생성이 가능하기 때문에 email로 삭제하는건 좋지않아보임.
      // 굳이 email을 기준으로 하고 싶으면 DB에 회원가입 정보를 넣을 때 email을 unique하게 만들어줘야할듯.
      userId: user.userData._id,
      title: title,
      text: text,
      time: now,
    };

    dispatch(addPost(body)).then((response) => {
      if (response.payload.addPostsuccess) {
        navigate("/");
      } else {
        alert("Failed to Write");
      }
    });

    setTitle("");
    setText("");
  };

  // 리덕스 스토어에서 가져옴에도 불구하고 새로고침 때마다 값이 사라지는 현상 발생
  // useEffect로 재렌더링마다 데이터를 불러오도록 하자....는 실패! 어떻게 해결해야할까?
  // 해결법 : useState로 밖에 state를 만들고, useEffect 안에서 setState로 할당하면 됨
  // 참고사이트(https://stackoverflow.com/questions/56155959/what-does-it-mean-to-move-this-variable-directly-inside-useeffect-in-this-erro)
  // 그런데 굳이 할 필요는 없을 것 같다..
  const user = useSelector((state) => state.user);

  // 익명 선택 여부를 판별하기 위한 state
  const [anonymous, setAnonymous] = useState(false);

  const changeAnonymous = () => {
    setAnonymous((prev) => !prev);
  };

  return (
    <div className={styles.topDiv}>
      <form onSubmit={submitAll} className={styles.overallForm}>
        <div className={styles.divStyle}>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            maxLength={10}
            value={anonymous ? "비밀스러운 누군가" : user.userData.name}
            className={styles.userInput}
            ref={userName}
            id="name"
            // 익명상태 제외하고는 이름 못 바꾸게 설정
            // form 전달은 가능하지만, 수정은 못함
            readOnly
          />
        </div>

        <div className={styles.divStyle}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            placeholder="제목을 달아주세요(20자까지)"
            maxLength={20}
            value={title}
            onChange={titleInput}
            className={styles.titleInput}
            id="title"
          />
        </div>

        <textarea
          type="text"
          placeholder="하고 싶은 말을 적어주세요(500자까지)"
          maxLength={500}
          value={text}
          onChange={textInput}
          className={styles.textInput}
        />

        <div className={styles.anonymousDiv}>
          {/* label을 사용해서 UX 향상 */}
          <label
            htmlFor="anonymous"
            onClick={changeAnonymous}
            className={styles.pleaseAnonymous}
          >
            익명으로 해주세요
          </label>

          <label htmlFor="anonymous" className={styles.checkLabel}>
            {anonymous ? (
              <HiCheckCircle onClick={changeAnonymous} />
            ) : (
              <HiOutlineCheckCircle onClick={changeAnonymous} />
            )}
          </label>

          <input type="checkbox" id="anonymous" />
        </div>

        <div className={styles.btnDiv}>
          <button type="submit">등록하기</button>
        </div>
      </form>
    </div>
  );
}

export default Write;
