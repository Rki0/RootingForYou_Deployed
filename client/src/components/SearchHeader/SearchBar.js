import styles from "./SearchBar.module.scss";
import { GrClose } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPost, initSearch } from "../../_actions/user_action";

function SearchBar() {
  const [searchName, setSearchName] = useState("");

  const searchNameHandler = (e) => {
    setSearchName(e.target.value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 검색창을 껐을 때 홈으로 이동이 아니라, 뒤로가기를 하는 이유
  // 사용자가 어떤 페이지에서 검색창을 이용하게 될지 모르기 때문.
  const goBack = () => {
    // 검색 후 저장된 데이터를 초기화해주지 않으면, 다시 검색창에 들어왔을 때도 데이터가 유지됨(리덕스 스토어)
    // 따라서, 스토어에서 해당 데이터를 초기화해줘야함
    dispatch(initSearch());

    navigate(-1);
  };

  // 유저 name으로 게시물 찾기
  // 다른 유저들이 검색할 때, 가장 접근하기 편한거 닉네임으로 검색하는 것.
  // 유저의 name은 중복 가능함. 고유한 name으로 만들고싶으면 unique 설정하면 됨.
  // 일단은 unique라고 가정하고 코드를 짜보자
  // 한 글자 입력할때마다 탐색을 진행할지, 모두 입력하고 버튼을 누른 후에 탐색을 진행할지?
  // 우선은 후자의 경우를 구현해보자
  const searchingStart = (e) => {
    e.preventDefault();

    let body = {
      name: searchName,
    };

    // 리덕스 스토어에 검색된 게시물 저장
    dispatch(searchPost(body));
  };

  return (
    <>
      <header className={styles.searchBar}>
        <form className={styles.searchForm} onSubmit={searchingStart}>
          <input
            type="text"
            className={styles.textInput}
            placeholder="작성자를 검색해보세요"
            value={searchName}
            onChange={searchNameHandler}
            autoFocus
          />
          <button type="submit" className={styles.submitBtn}>
            <FaSearch />
          </button>
        </form>

        {/* 뒤로가기를 클릭하면 검색을 통해 리덕스 스토어에 저장한 데이터를 초기화해야함 */}
        <GrClose onClick={goBack} />
      </header>

      <Outlet />
    </>
  );
}

export default SearchBar;
