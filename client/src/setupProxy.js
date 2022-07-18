// client에서 request를 할 때 target에 있는 곳으로 보내겠다

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // 설정된 서버 url 입력
      // 로컬 서버(http) - 로컬 클라이언트(http) : 정상 작동, DB 데이터 정상 작동
      // target: "http://localhost:8000",
      // AWS EC2 서버(http) - 로컬 클라이언트(http) : 정상 작동, DB 데이터 정상 작동
      // target: "http://54.180.99.254:8000",
      // 내가 해내야 하는 것은?
      // AWS EC2 서버(http) - Netlify 클라이언트(https)
      // 정상 작동 + DB 데이터 정상 작동이 목표
      // 현재 Netlify 배포 완료. index.js 잘 보임. 404 오류 발생 중...
      // 현재 AWS EC2 서버 배포 완료. index.js 잘 작동. DB 연결 잘됨.

      // Heroku 서버(https) - 로컬 클라이언트(http) : 정상 작동, DB 데이터 정상 작동
      // Heroku 서버(https) - Netlify 클라이언트(https)
      target: "https://rootingforyou.herokuapp.com",
      changeOrigin: true,
    })
  );
};
