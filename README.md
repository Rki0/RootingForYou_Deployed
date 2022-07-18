# 😇 배포 (MERN)

Front-end : React  
Back-end : Node.js, express  
DB : mongoDB, mongoose  
배포 : Netlify(Front), Heroku(Back)

일주일이 걸린 배포 시도가 드디어 성공적으로 끝났다.  
처음에는 Heroku로 시도했다가 mongoDB 관련 지원이 유료로 바뀐 것을 확인하고, AWS EC2로 재시도를 했다. 그러나, AWS EC2도 도메인 부분에서 유료인 부분이 존재했고, HTTPS를 별도로 설정해야하는 문제 때문에 다시 Heroku로 돌아왔다.  
mongoDB 애드온을 사용할 수 없었기 때문에, 순수하게 코드로만 DB 연결을 했다.(이 부분에서 에러가 없었기 때문에, 잘못된 것이 있는지는 솔직히 모르겠다)  
일주일을 넘기는 시간을 배포에만 투자했기 때문에, 내가 밟아온 과정을 기록하고자 한다.

필자는 Front는 Netlify에, Back은 Heroku에 나눠서 배포했다.

[Front-end Github 링크](https://github.com/Rki0/RootingForYou_Front/tree/master/client)  
[Back-end Github 링크](https://github.com/Rki0/Nodejs_Heroku)

## 📂 파일 구조

클라이언트 부분의 파일 구조는 다음과 같다.  
client 폴더만이 Netlify에 배포되었다.(server와 묶어서 배포하지 않았다는 의미입니다!)  
[client 배포 Github 소스 코드](https://github.com/Rki0/RootingForYou_Front)

<img width="170" alt="스크린샷 2022-07-18 오후 2 47 42" src="https://user-images.githubusercontent.com/86224851/179451667-ad18c48a-12a2-41ae-bb5d-881c6d9f3151.png">

다음으로는 서버 부분의 파일 구조이다.  
루트 폴더는 따로 두지않았다. 만들었다면 server라는 이름으로 만들 것 같다.  
[server 배포 Github 소스 코드](https://github.com/Rki0/Nodejs_Heroku)

<img width="164" alt="스크린샷 2022-07-18 오후 2 50 34" src="https://user-images.githubusercontent.com/86224851/179451848-4853cd46-a3f5-4b80-82d2-05d2ecdc7eb6.png">

## 😵 Heroku (Back-end 배포)

필자는 Heroku를 배포할 때 Github에 올려놓은 코드를 연결해서 사용했기 때문에, 굳이 Heroku CLI 같은 것을 사용하지않았다.(안해도 잘 연동되어서, 수정하면 알아서 Deploy를 해줬다..)  
Heroku에 배포할 때, 꼭 해줘야할 것들을 적어보겠다.

### 😛 설정할 것 1 - Config Vars 설정하기

mongoDB를 사용하는 분들이라면, DB에 접속하기 위해 mongoDB 사이트의 아이디와 비밀번호가 들어가 있는 URI를 다들 아실 것이라 생각한다.  
보통 config 폴더를 만들고, 그 안에서 dev 모드와 prod 모드를 나눠서 URI를 받아오도록 설정하고, dev 모드에는 URI를 직접 하드 코딩하므로 .gitignore에 넣어서 해당 파일을 숨긴 뒤에 Github에 push를 한다.  
코드에 대한 설명은 따로 나눠서 작성할 예정이므로 Heroku에 관해서만 언급하겠다.  
prod, 즉, production 모드일 때는 배포된 상태를 말하므로, Heroku에서 이 URI를 받아올 수 있도록 설정해줘야한다. 그게 바로, Config Vars 설정이다.  
본인이 배포한 Heroku 페이지에서 Setting 메뉴에 들어가면 아래와 같은 설정칸을 볼 수 있다.

<img width="1231" alt="스크린샷 2022-07-18 오후 3 01 18" src="https://user-images.githubusercontent.com/86224851/179452904-d9f08dad-c383-4121-844f-a0b5e8c9eeb6.png">

소스 코드에서 어떤 key로 받아올 지 정해놨으면 동일한 문자를 적어줘야한다.  
필자는 config/prod.js 에서 MONGO_URI라는 key로 설정해놨기 때문에, 여기서도 같은 문자를 입력한 것이다.  
붉은 색으로 가려진 부분에는 본인이 연결하고자 하는 mongoDB의 URI를 적어주면 된다.

### 😛 설정할 것 2 - Procfile 생성하기

위에서 언급한 server의 파일 구조에서, Procfile이라는 확장자가 없는 파일을 볼 수 있을 것이다.  
Heroku에서 정상적으로 파일들이 Deploy 되려면 반드시 Procfile을 설정해줘야한다.

```js
web: node index.js
```

이렇게만 적어주면 된다. 필자는 index.js에서 DB, 서버를 연결하고 있기때문에 적어 준 것이다.(다른 분들은 server.js로 많이들 쓰신 것 같다. 즉, 파일명만 맞춰서 적으면 된다는 뜻)

여기까지는 말그대로 Heroku에서 소스 코드를 Deploy 하기 위한 단계로, Front쪽과는 연결을 고려하지 않은 상태다.  
만약, 배포로 인해 에러가 발생한다면 Front 쪽과 연결 문제가 십중팔구이므로...이제부터가 진짜다!

### 😛 설정할 것 3 - PORT 설정, cors 설정 해주기

```js
const port = process.env.PORT || 8000;

const cors = require("cors");

app.use(
  cors({ origin: "https://rootingforyou.netlify.app", credentials: true })
);
```

process.env.PORT는 Heroku가 배포할 때 가지는 port 번호를 의미한다.  
아마, 여러번 배포본을 수정하신 분이라면 아시겠지만, Deploy가 다시 진행될 때마다 port 번호가 바뀌게 된다.  
따라서, 어떤 port를 가지고 올지 모르므로 환경변수로 받아오는 것이다.  
8000번 포트는 dev 모드에서 필자가 사용했던 로컬 port 넘버이다.

Front와 연결하게 되면, CORS 에러가 발생한다. 무슨 뜻인지는 굳이 설명하지 않겠다.  
이를 해결하기 위해 서버쪽 코드에서는 cors 미들웨어를 설치해서 사용한다.  
origin에는 Front쪽 주소를 적어주면 된다.  
credentials까지 true로 설정해줘야지 된다.

### 😛 설정할 것 4 - cookie 설정 해주기

필자가 가장 애먹었던 부분이다.  
필자는 유저 인증을 하는 코드가 있다. 로그인, 로그아웃, 회원가입 등등 관련 기능을 활용하기 위해 인증 라우터를 만들었는데, Redux에서 확인해보면 로컬에서 돌릴 때는 아무런 문제가 없었지만, 배포된 상황에서는 계속 먹통이 되는 것을 확인했다.(token이 cookie에 저장이 안됐다)  
이 문제는 에러조차 뜨지않아서 2-3일 정도 관련 자료들을 찾아본 것 같다.  
이유에 대해서는 참고 사이트를 남겨놓을테니, 여기서는 방법만 보자.  
보통, token 생성은 로그인 기능에서 사용한다. 필자는 token을 cookie에 저장해서 사용하는 방법을 채택해서 진행했었는데, 보안 이슈로 인해서 몇 년전에 구글이 이 부분을 업데이트를 했다고 한다.  
그래서, 배포 후 다른 도메인 간 통신을 하게되면, 추가적인 설정을 해줘야만 cookie를 정상 작동 시킬 수 있었다.

```js
res.cookie("x_auth", user.token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});
```

위 코드는 필자가 로그인 라우터에서 작성한 코드의 일부분이다.  
token을 cookie에 저장하는데, 꼭, 뒤에 해당 옵션을 설정해줘야한다.  
그렇지않으면 배포본끼리 통신은 되어도, cookie가 먹통이 된다.(필자는 이 부분이 에러가 전혀 뜨지않았었다.)

여기까지가 Back-end 배포를 하기 위한 기본 설정이다.  
하나라도 빠뜨리지말고 진행해주자.

### 😛 설정할 것 5 - Heroku Kaffeine

Heroku는 30분 동안 request가 없으면 sleep 모드로 들어간다.  
sleep 모드에 들어가면 재시동 되는데 시간이 걸려서, UX에 좋지않기 때문에 이를 방지해야한다.  
여러가지 방법이 있는데, 필자는 Kaffeine이라고 불리는 방법을 사용할 것이다.  
30분 단위로 request를 보내서 서버를 깨워주는 것이다.  
[Heroku Kaffeine 링크](http://kaffeine.herokuapp.com/)

<img width="1021" alt="스크린샷 2022-07-18 오후 11 55 33" src="https://user-images.githubusercontent.com/86224851/179539777-8e3a99b7-bc5c-4d72-807a-34d58b5d3720.png">

접속하면 위와 같은 페이지를 볼 수 있다.  
rootingforyou라고 써있는 것은 필자가 적어놓은 것으로, 본인의 Heroku 배포 주소에서 저 부분만 붙여넣어주면 된다.  
그리고 아래 하늘색 버튼을 누르면, 그 아래에 초록색 문구가 뜨면서 등록이 완료된다.  
중간에 I want a bedtime! 이라는 문구와 함께 시간을 설정하는 것이 있다.  
이는, 저 시간부터 6시간 동안은 request를 보내지 않겠다고 설정하는 것이다.  
Heroku는 하루 18시간을 무료로 사용할 수 있기에(이는 신용카드 등록으로 해결할 수 있다. 신용카드를 등록만 하면 한달 1000시간으로 늘어나는 모양),  
sleep 모드를 6시간은 해줘야하는데, 저 곳에서 설정한 시간부터 6시간 동안 request를 멈춰서 sleep 모드가 될 수 있게 만들어주는 것이다. 사용자가 없을 법한 시간으로 지정하면 될 것 같다.  
물론, 이건 개인 프로젝트니까 가능한 것이다...  
실제 유저들을 모아야하는 프로젝트에서는 좋지않은 방법이므로 그 때는 AWS로..!!

## 😵 Netlify (Front-end 배포)

Netlify도 정말 간단하게 배포가 가능하다.  
물론, 나는 간단하게 넘어가는 일이 없었다...  
이번에는 Front쪽에서 어떤 것들을 설정해줘야할지 살펴보자.  
필자는 Github에 올린 코드를 가져와서 연결했기 때문에 별도로 CLI를 설치한 것은 없다.

### 😛 설정할 것 1 - Netlify에서 build 명령어 설정하기

<img width="423" alt="스크린샷 2022-07-18 오후 3 29 12" src="https://user-images.githubusercontent.com/86224851/179455603-31f59ef8-7965-49c9-9f0e-f280b9839341.png">

배포를 진행하고자 한다면, build를 세팅하는 단계를 마주칠 것이다.  
위에 보이는 사진은, 그 단계는 아니고, 배포를 마친 뒤 설정 화면인데, 크게 다를 건 없다.  
Base directory는 Github에 있는 것 중에 어떤 폴더를 Deploy 할 것인지를 정해주는 것이다.  
만약, client와 server 폴더를 하나의 Github Repository에 올렸다면, Netlify가 둘 중에 뭘 선택할지 모를 것이다. 이 때 client라는 폴더를 선택하라고 알려주는 것이다.  
Build command는 코드를 보면 알겠지만, build를 실행할 때 어떤 명령어로 실행할 것이냐를 묻는 것이다. 보통 package.json에 scripts 부분에 명령어를 작성하는데, 필자는 CRA로 만든 초기 상태를 그대로 유지했기 때문에, 건드릴 것은 없었다.  
다만!!!! CI= 라는 아주 생소한 코드가 붙어있는데, 이게 바로 Netlify에서 build를 수행하기 위해서 꼭 적어줘야하는 것이다.  
Publish directory는 배포될 폴더를 정하는 것이다. Base directory와 설명이 비슷해보이는데..  
build를 실행하면 build 폴더가 생성이 되고, 우리는 그 것을 배포해야하는 것이지, src 폴더를 배포하지는 않는다.  
client 폴더에 접속하는 것을 Base directory에서 설정했고, 거기서 build가 진행된 후, 만들어진 build 폴더를 publish하라는 뜻이다.

### 😛 설정할 것 2 - setupProxy.js 설정하기

api 통신을 할 때, proxy 설정을 통해서 CORS 에러를 막을 수 있다.  
http-proxy-middleware 라이브러리를 사용했다.

```js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://rootingforyou.herokuapp.com",
      changeOrigin: true,
    })
  );
};
```

request가 발생하면 target에 있는 주소로 전송하게 된다.  
즉, Back-end 배포를 해놓은 Heroku 주소를 넣어주면 된다.  
setupProxy.js는 항상 src 폴더 바로 아래 생성해줘야한다.  
위에 폴더 구조를 보면 이해가 빠를 것이다.

### 😛 설정할 것 3 - axios instance, withCredentials 설정하기

필자는 setupProxy.js까지만 설정하면 잘 될 줄 알았다...  
물론, 로컬에서 돌릴 때는 잘 돌아갔다.(Heroku - localhost:3000 간 통신)  
하지만 배포본끼리는 setupProxy.js 만으로는 안됐다.  
그래서 api 통신을 위한 주소를 완전히 적어주는 것으로 했다.  
baseURL을 설정해서 get,post 등의 메서드를 사용했다.

```js
const instance = axios.create({
  baseURL: "https://rootingforyou.herokuapp.com",
});

// post 메서드
export function loginUser(dataToSubmit) {
  const request = instance
    .post("/api/users/login", dataToSubmit, { withCredentials: true })
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

// get 메서드
export function authUser() {
  const request = instance
    .get("/api/users/auth", { withCredentials: true })
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
```

필자는 action들을 하나의 파일에 모아뒀기 때문에 instance를 설정해서 써먹기가 편했다.  
만약, 다른 파일에 나눠서 action을 정의하면 어떻게 해야할지도 생각해볼 필요가 있겠다.  
추가적으로, withCredentials 라는 옵션을 볼 수 있다. 이게 굉장히 핵심적인 부분이다.  
이 것을 적어주지않으면 CORS 에러 발생한다.(필자는 에러 표시가 NETWORK_ERROR만 떴었지만...지금까지 봐왔던 CORS 에러랑은 달라서 몰랐다..)

여기까지 하면 웬만해서는 오류가 없을 것이라고 생각한다.  
많은 분들이 api 통신이나 Front-Back 간 배포본 생성에서 헤매기 때문에...!  
필자가 고생한 것들은 여기까지이다. 주변 친구들에게 Netlify 주소를 뿌려서 동작을 실험해본 결과, 잘 작동하는 것을 확인했다!  
혹시나 이 글을 보시는 분들 모두 다 배포가 성공했기를 바랍니다🥳

# 🤔 참고 자료 링크

## 😛 cookie 관련

[cookie 관련 참고 자료 1](https://grownfresh.tistory.com/163)  
[cookie 관련 참고 자료 2](https://velog.io/@yhe228/react-router-props-axios-cookie-get-set)  
[cookie 관련 참고 자료 3](https://ifuwanna.tistory.com/223)  
[cookie 관련 참고 자료 4](https://www.inflearn.com/questions/345664)

## 😛 CORS 관련

[CORS 관련 참고 자료 1](https://sennieworld.tistory.com/m/49)  
[CORS 관련 참고 자료 2](https://milugarcito.tistory.com/319)  
[CORS 관련 참고 자료 3](https://velog.io/@ksh4820/react-express-%EB%B0%B0%ED%8F%ACNetlify-heroku)

## 😛 배포 관련

[배포 관련 참고 자료 1](https://abangpa1ace.tistory.com/140)  
[배포 관련 참고 자료 2](https://blog.advenoh.pe.kr/cloud/Heroku%EC%97%90-Node-js-MongoDB-App-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0/)  
[배포 관련 참고 자료 3](https://medium.com/@001106ksj/heroku-%ED%97%A4%EB%A1%9C%EC%BF%A0%EC%97%90-mongodb-%EA%B8%B0%EB%B0%98%EC%9D%98-node-js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%B0%B0%ED%8F%AC%ED%95%9C-%ED%9B%84%EA%B8%B0-a247686cf06d)
