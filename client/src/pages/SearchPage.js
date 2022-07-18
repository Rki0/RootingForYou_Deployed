import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./SearchPage.module.scss";

function SearchPage() {
  const [searchedPost, setSearchedPost] = useState([]);

  const post = useSelector((state) => state.post);

  useEffect(() => {
    setSearchedPost(post.thisUserPost);
  }, [post?.thisUserPost]);

  return (
    <div className={styles.wholePost}>
      {searchedPost ? (
        searchedPost.map((item, index) => (
          // <div key={index} className={styles.singlePost}>
          //   <p className={styles.author}>글쓴이 : {item.name}</p>
          //   <h1>{item.post.title}</h1>
          //   <p>{item.post.text}</p>
          // </div>

          <Link
            key={index}
            className={styles.singlePost}
            to={`/showdetail/${item._id}`}
          >
            <p className={styles.author}>글쓴이 : {item.name}</p>
            <h1>{item.post.title}</h1>
            <p>{item.post.text}</p>
          </Link>
        ))
      ) : (
        <h1>닉네임으로 검색해주세요.</h1>
      )}
    </div>
  );
}

export default SearchPage;
