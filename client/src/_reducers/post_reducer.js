import {
  ADD_POST,
  LOAD_MY_POST,
  LOAD_POST,
  DELETE_POST,
  DELETE_USER_WHOLE_POST,
  SEARCH_POST,
  INIT_SEARCH,
  SHOW_DETAIL,
} from "../_actions/types";
import produce from "immer";

export default function postReducer(state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      // post_reducer.js의 리덕스 스토어에 addPostSuccess라는 키값으로 action.payload를 저장함
      return {
        ...state,
        addPostSuccess: action.payload,
        userPost: action.payload,
      };

    case LOAD_POST:
      return { ...state };
    // return { ...state, userPost: action.payload };

    case LOAD_MY_POST:
      return { ...state };

    case DELETE_POST:
      return { ...state };

    case DELETE_USER_WHOLE_POST:
      return { ...state };

    case SEARCH_POST:
      return {
        ...state,
        searchSuccess: action.payload.searchSuccess,
        thisUserPost: action.payload.thisUserPost,
      };

    case SHOW_DETAIL:
      return {
        ...state,
        showDetailSuccess: action.payload.showDetailSuccess,
        detailedPost: action.payload.detailedPost,
      };

    case INIT_SEARCH:
      // immer 라이브러리를 통해, 리덕스 스토어 데이터 초기화 구현
      // 참고 사이트(https://react.vlpt.us/basic/23-immer.html)
      // 참고 사이트(https://blog.naver.com/PostView.nhn?blogId=rkdudwl&logNo=222358835673&categoryNo=0&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView)
      return produce(state, (draft) => {
        const initValue = null;
        draft.thisUserPost = initValue;
      });

    default:
      return state;
  }
}
