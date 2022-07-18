// import { useEffect } from "react";
// import axios from "axios";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadPost } from "../_actions/user_action";
import { Link } from "react-router-dom";
// import axios from "axios";

function Home() {
  const dispatch = useDispatch();

  const [postingData, setPostingData] = useState([]);

  // 백엔드와의 연결 확인용
  // axios
  //   .get("https://rootingforyou.herokuapp.com")
  //   .then((response) => console.log("server is linked"))
  //   .catch((err) => console.log("error", err));

  useEffect(() => {
    dispatch(loadPost()).then((response) => {
      // DB에는 최신 글이 가장 뒤에 저장되므로
      // state에 저장할 때는 역순으로 바꿔서, 최신 글이 앞으로 오게 해줌
      setPostingData(response.payload.wholePost.reverse());
    });
  }, []);

  return (
    <div className={styles.wholePost}>
      {/* 데이터를 받아오기 전에 렌더링이 되면 map이 정상적으로 작동하기 힘들기 때문에, postingData의 데이터 유무를 기준으로 렌더링을 나눠줌 */}
      {/* 안전한 방법 같긴한데 아직까지 렌더링 전에 데이터가 안 오는 상황이 없었기 때문에 킵! */}
      {/* {postingData ? (
        postingData.map((item, index) => (
          <div key={index}>
            <p>{item.name}</p>
            <h1>{item.post.title}</h1>
            <p>{item.post.text}</p>
          </div>
        ))
      ) : (
        <h1>데이터가 없습니다</h1>
      )} */}

      {postingData.map((item, index) => (
        <Link
          key={index}
          className={styles.singlePost}
          to={`/showdetail/${item._id}`}
        >
          <p className={styles.author}>글쓴이 : {item.name}</p>
          <h1>{item.post.title}</h1>
          <p>{item.post.text}</p>
        </Link>
      ))}
    </div>
  );
}

export default Home;
