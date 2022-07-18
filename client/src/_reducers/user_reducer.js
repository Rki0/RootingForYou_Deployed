import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  CHANGE_PASSWORD,
  DELETE_USER,
} from "../_actions/types";

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case REGISTER_USER:
      return { ...state, register: action.payload };

    case AUTH_USER:
      // user_action.js에서 action이 AUTH_USER인 함수가 반환하는 값을 userData에 넣음
      return { ...state, userData: action.payload };

    case LOGOUT_USER:
      return { ...state, logoutSuccess: action.payload };

    case CHANGE_PASSWORD:
      return { ...state, passwordCheckSuccess: action.payload };

    case DELETE_USER:
      return { ...state, deleteUserSuccess: action.payload };

    default:
      return state;
  }
}
