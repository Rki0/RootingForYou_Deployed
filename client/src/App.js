import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./Layout/Header";
import Write from "./pages/Write";
import LoginPage from "./pages/LoginPage";
import SearchBar from "./components/SearchHeader/SearchBar";
import SearchPage from "./pages/SearchPage";
import JoinPage from "./pages/JoinPage";
import MyPage from "./pages/MyPage";
import MyPostPage from "./pages/MyPostPage";
import ChangePswdPage from "./pages/ChangePswdPage";
import DeleteUserPage from "./pages/DeleteUserPage";
import JustOnePost from "./pages/JustOnePost";
import Auth from "./hoc/auth";

function App() {
  // 누구나 접근 가능
  const AuthenticHome = Auth(Home, null);
  const AuthenticSearch = Auth(SearchPage, null);
  const AuthenticJustOnePost = Auth(JustOnePost, null);

  // 로그인한 사람만 접근 가능
  const AuthenticWrite = Auth(Write, true);
  const AuthenticMypage = Auth(MyPage, true);
  const AuthenticMyPostpage = Auth(MyPostPage, true);
  const AuthenticChangePswdPage = Auth(ChangePswdPage, true);
  const AuthenticDeleteUserPage = Auth(DeleteUserPage, true);

  // 로그인한 사람은 접근 불가능
  const AuthenticLogin = Auth(LoginPage, false);
  const AuthenticJoin = Auth(JoinPage, false);

  // Netlify에 연결하기 위해서
  // package.json의 homepage를 Netlify에서 얻은 홈페이지 주소로 변경
  // 이렇게 하면 client 폴더에 관련된 것은 연결이 됨
  // 중요한 것은 백엔드(heroku)와 연결을 해야 완성이 된다는 것.

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<AuthenticHome />} />
        <Route path="/write" element={<AuthenticWrite />} />
        <Route path="/mypage" element={<AuthenticMypage />} />
        <Route path="/mypage/mypost" element={<AuthenticMyPostpage />} />
        <Route
          path="/mypage/changepswd"
          element={<AuthenticChangePswdPage />}
        />
        <Route
          path="/mypage/deleteuser"
          element={<AuthenticDeleteUserPage />}
        />
        <Route path="/login" element={<AuthenticLogin />} />
        <Route path="/join" element={<AuthenticJoin />} />
        <Route path="/showdetail/:postid" element={<AuthenticJustOnePost />} />
      </Route>

      <Route path="/" element={<SearchBar />}>
        <Route path="/search" element={<AuthenticSearch />} />
      </Route>
    </Routes>
  );
}

export default App;
