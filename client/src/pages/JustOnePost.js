import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showDetail } from "../_actions/user_action";
import styles from "./JustOnePost.module.scss";

function JustOnePost() {
  // 게시물의 _id로 하나의 게시물만 찾아서 보여줘야함
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state) => state.post);

  useEffect(() => {
    let body = {
      postId: params.postid,
    };

    dispatch(showDetail(body))
      .then((response) => response.payload)
      .catch((err) => console.log(err));
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  // 좋아요 기능

  // 스크랩 기능

  return (
    <div className={styles.singlePost}>
      {post.showDetailSuccess ? (
        <div className={styles.postDiv}>
          <p className={styles.thisAuthor}>글쓴이 : {post.detailedPost.name}</p>
          <h1 className={styles.thisTitle}>{post.detailedPost.post.title}</h1>
          <p className={styles.thisTime}>{post.detailedPost.post.time}</p>
          <p className={styles.thisText}>{post.detailedPost.post.text}</p>
        </div>
      ) : (
        <div>데이터를 불러오는 중입니다.</div>
      )}
      <div className={styles.btnDiv}>
        <button className={styles.likeBtn}>좋아요</button>
        <button className={styles.scrapBtn}>스크랩</button>
        <button className={styles.backBtn} onClick={goBack}>
          뒤로 가기
        </button>
      </div>
    </div>
  );
}

export default JustOnePost;
