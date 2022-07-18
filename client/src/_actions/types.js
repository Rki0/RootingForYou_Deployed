// action의 type만 관리하는 곳

// 회원 정보 관련 //
// 로그인
export const LOGIN_USER = "login_user";

// 회원가입
export const REGISTER_USER = "register_user";

// 인증
export const AUTH_USER = "auth_user";

// 로그아웃
export const LOGOUT_USER = "logout_user";

// 비밀번호 변경
export const CHANGE_PASSWORD = "change_password";

// 회원 탈퇴
export const DELETE_USER = "delete_user";

// 게시물 관련 //
// 게시물 등록
export const ADD_POST = "add_post";

// 게시물 호출
export const LOAD_POST = "load_post";

// 내 게시물 호출
export const LOAD_MY_POST = "load_my_post";

// 특정 유저 게시물 검색 및 호출
export const SEARCH_POST = "search_post";

// 특정 게시물 상세보기
export const SHOW_DETAIL = "show_detail";

// 검색 후 뒤로가기 시 검색된 데이터 초기화
export const INIT_SEARCH = "init_search";

// 게시물 삭제
export const DELETE_POST = "delete_post";

// 회원 탈퇴 시 특정 유저 전체 게시물 삭제
export const DELETE_USER_WHOLE_POST = "delete_user_whole_post";
