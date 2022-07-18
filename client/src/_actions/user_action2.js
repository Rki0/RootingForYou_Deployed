import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_POST,
  LOAD_POST,
  LOAD_MY_POST,
  DELETE_POST,
  CHANGE_PASSWORD,
  DELETE_USER,
  DELETE_USER_WHOLE_POST,
  SEARCH_POST,
  INIT_SEARCH,
  SHOW_DETAIL,
} from "./types";

const URI = "https://rootingforyou.herokuapp.com";

// 로그인
export function loginUser(dataToSubmit) {
  // server/index.js에 작성한 라우트와 통신
  const request = axios
    .post(`${URI}/api/users/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

// 회원가입
export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${URI}/api/users/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

// 인증
export function authUser() {
  // 서버와 통신해서 받아온 값을 request에 넣음
  const request = axios
    .get(`${URI}/api/users/auth`)
    .then((response) => response.data);

  // request를 action의 payload로 넣어서, user_reducer.js의 AUTH_USER에 보냄
  return {
    type: AUTH_USER,
    payload: request,
  };
}

// 로그아웃
export const logoutUser = () => {
  const request = axios
    .get(`${URI}/api/users/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
};

// 비밀번호 변경 할 때
export function changePswd(dataToSubmit) {
  const request = axios
    .post(`${URI}/api/users/changepassword`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: CHANGE_PASSWORD,
    payload: request,
  };
}

// 회원 탈퇴 할 때
export function deleteUser(dataToSubmit) {
  const request = axios
    .post(`${URI}/api/users/withdrawal`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: DELETE_USER,
    payload: request,
  };
}

// 게시물 등록할 때
export function addPost(dataToSubmit) {
  const request = axios
    .post(`${URI}/api/users/posting`, dataToSubmit)
    .then((response) => response.data);

  // 이게 바로 action에 들어가는 값들
  return {
    type: ADD_POST,
    payload: request,
  };
}

// 전체 게시물 불러올 때
export function loadPost() {
  const request = axios
    .get(`${URI}/api/users/loadpost`)
    .then((response) => response.data);

  return {
    type: LOAD_POST,
    payload: request,
  };
}

// 내 게시물 불러올 때
export function loadMyPost(dataToSubmit) {
  const request = axios
    .post(`${URI}/api/users/loadmypost`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOAD_MY_POST,
    payload: request,
  };
}

// 특정 유저 게시물 검색으로 불러올 때
export function searchPost(dataToSubmit) {
  const request = axios
    .post(`${URI}/api/users/searchpost`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: SEARCH_POST,
    payload: request,
  };
}

// 특정 게시물 상세보기
export function showDetail(dataToSubmit) {
  const request = axios
    .post(`${URI}/api/users/showdetail`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: SHOW_DETAIL,
    payload: request,
  };
}

// 검색 후 뒤로가기 시 검색된 데이터 초기화할 때
// 얘는 따로 DB에서 동작해야하는게 아니라, 리덕스 스토어에 있는 값을 지우는 것이 목적이므로
// type만 리턴해서 사용할 것임.
export function initSearch() {
  return {
    type: INIT_SEARCH,
  };
}

// 게시물 삭제할 때
export function deletePost(dataToSubmit) {
  const request = axios
    .post(`${URI}/api/users/deletemypost`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: DELETE_POST,
    payload: request,
  };
}

// 회원 탈퇴 시 해당 유저 게시물 전체 삭제
export function deleteWholePost(dataToSubmit) {
  const request = axios
    .post(`${URI}/api/users/deleteuserwholepost`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: DELETE_USER_WHOLE_POST,
    payload: request,
  };
}
