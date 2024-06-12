<aside>
🔥 필수 구현 사항 입니다.

</aside>

- [x] 지출 관리 시스템에 회원가입 / 로그인 기능 구현
  - 반드시, 강의에서 제공하는 jwt 인증서버를 사용하도록 합니다.
  - 인증이 되지 않는다면 서비스를 이용 할 수 없도록 해주세요.
- [x] json-server 를 이용해 지출 데이터에 대한 CRUD 를 구현해 주세요.
  - 지출 데이터에 누가 해당 지출을 생성 했는지가 포함시켜 봅시다.
- [x] API 호출 시, fetch 대신 axios 를 필수적으로 사용하도록 합니다.
- [x] 페이지에서 (jsx) 파일에서 API 응답 값을 바로 사용하지 말고, 꼭 Tanstack Query (ReactQuery)를 거쳐서 이용하도록 합니다.
  - 상태 관리를 위해 Props-drilling, Context API, Redux 사용대신 Tanstack Query 를 사용해야 합니다.
