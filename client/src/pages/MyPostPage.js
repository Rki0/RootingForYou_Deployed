import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadMyPost, deletePost } from "../_actions/user_action";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./MyPostPage.module.scss";

function MyPostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  // 유저의 이메일 정보를 담기 위한 state
  const [email, setEmail] = useState();

  // 받아온 게시물 정보를 담기 위한 state
  const [myPost, setMyPost] = useState();

  // Home.js에서 불러왔던 것 처럼
  // Home.js에서는 전체 게시물을 불러온 반면, 여기서는 나의 email에 맞는 게시물만 불러와야한다.
  // 따라서 현재 로그인된 유저의 이메일을 보내줘야함.
  useEffect(() => {
    // optional chaining을 통해 받아왔을 경우만 멀쩡한 값이 들어가게 해줌
    // 사실 이건 조건문의 조건에 넣는게 더 나아보임...어떻게 할까?
    setEmail(user?.userData?.email);

    let body = {
      email: email,
    };

    dispatch(loadMyPost(body)).then((response) => {
      setMyPost(response.payload.myPost);
    });
  }, [user?.userData]);

  // 휴지통 아이콘 클릭 시 해당 게시물 삭제
  // prompt로 삭제 여부를 물어보긴 할건데...모달로 하면 훨씬 좋겠지?
  const deleteHandler = (postId) => {
    // confirm 메서드는 유저가 true, false를 선택해서 반환할 수 있음
    const really = window.confirm("정말로 삭제하시겠습니까?");

    let body = {
      _id: postId,
    };

    if (really) {
      // 삭제 action
      dispatch(deletePost(body));

      // 삭제 action 직후 loadPost()를 디스패치 했는데 데이터가 업데이트가 안되는 상황 발생
      // 그로 인해서 재렌더링도 진행이 안됨. 신기한건 새로고침하면 데이터가 업데이트가 됨
      // 따라서, useNavigate()를 활용해서 이 페이지를 다시 들어오는 것으로 해결
      navigate("/mypage/mypost");

      // // 삭제 후 다시 myPost의 state 업데이트
      // dispatch(loadMyPost(body)).then((response) => {
      //   setMyPost(response.payload.myPost);
      // });
    } else {
      return null;
    }
  };

  return (
    <ul className={styles.myPostUl}>
      {myPost?.map((item, index) => (
        <li key={index}>
          <div className={styles.singlePost}>
            <div className={styles.postHeader}>
              <h1 className={styles.postTitle}>{item.post.title}</h1>

              <button
                className={styles.deleteBtn}
                onClick={() => deleteHandler(item._id)}
              >
                <FaTrashAlt />
              </button>
            </div>

            <p className={styles.postTime}>{item.post.time}</p>

            <p className={styles.postText}>{item.post.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MyPostPage;
