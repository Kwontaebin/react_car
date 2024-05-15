# **React 중고차 프로젝트**

프로젝트 소개
- 이 사이트는 차령을 구매하고 판매하는 중고차 사이트입니다.
- 관심목록, 구매목록을 통해 내가 구매하고 관심있는 차량을 저장할수있습니다.
- 찾고 있는 조건에 맞쳐 차량을 검색할수있습니다.

## 1. 개발 환경
- #### Front-end : React, javaScript, jQuery, Html, Css
- #### back-end : Mysql, Node-js
- #### 디자인 참고 : Kcar

## 2. 프로젝트 구조
📦src <br/>
 ┣ 📂config <br/>
 ┃ ┣ 📜db.js <br/>
 ┃ ┗ 📜multi_db.js <br/>
 ┣ 📂header <br/>
 ┃ ┗ 📂js <br/>
 ┃ ┃ ┣ 📜header.js <br/>
 ┃ ┃ ┣ 📜login.js <br/>
 ┃ ┃ ┗ 📜sign.js <br/>
 ┣ 📂main <br/>
 ┃ ┣ 📂js <br/>
 ┃ ┃ ┣ 📜main.js <br/>
 ┃ ┃ ┗ 📜mainImgSlide.js <br/>
 ┃ ┣ 📂recommendCar <br/>
 ┃ ┃ ┗ 📂js <br/>
 ┃ ┃ ┃ ┣ 📜mainRecommendCar.js <br/>
 ┃ ┃ ┃ ┗ 📜recommendCar.js <br/>
 ┃ ┗ 📂searchCar <br/>
 ┃ ┃ ┗ 📂js <br/>
 ┃ ┃ ┃ ┣ 📜searchCar.js <br/>
 ┃ ┃ ┃ ┣ 📜searchCarPrice.js <br/>
 ┃ ┃ ┃ ┣ 📜searchCartype.js <br/>
 ┃ ┃ ┃ ┗ 📜searchWantCar.js <br/>
 ┣ 📂myPage <br/>
 ┃ ┗ 📂js <br/>
 ┃ ┃ ┣ 📜buyCarList.js <br/>
 ┃ ┃ ┣ 📜favoriteCarList.js <br/>
 ┃ ┃ ┗ 📜myPage.js <br/>
 ┣ 📂search <br/>
 ┃ ┣ 📂js <br/>
 ┃ ┃ ┣ 📜LocalStrage.js <br/>
 ┃ ┃ ┣ 📜carData.js <br/>
 ┃ ┃ ┗ 📜search.js <br/>
 ┃ ┗ 📂searchLeft <br/>
 ┃ ┃ ┗ 📂js <br/>
 ┃ ┃ ┃ ┣ 📜searchLeftBrand.js <br/>
 ┃ ┃ ┃ ┣ 📜searchLeftMileage.js <br/>
 ┃ ┃ ┃ ┣ 📜searchLeftPrice.js <br/>
 ┃ ┃ ┃ ┣ 📜searchLeftType.js <br/>
 ┃ ┃ ┃ ┗ 📜searchLeftYear.js <br/>
 ┣ 📂sell <br/>
 ┃ ┗ 📂js <br/>
 ┃ ┃ ┗ 📜sell.js <br/>
 ┣ 📂viewDetail <br/>
 ┃ ┗ 📂js <br/>
 ┃ ┃ ┣ 📜carLeftRecommendPage.js <br/>
 ┃ ┃ ┣ 📜viewDetail.js <br/>
 ┃ ┃ ┣ 📜viewDetailCar.js <br/>
 ┃ ┃ ┗ 📜viewDetailCarLeft.js <br/>
 ┣ 📜.DS_Store <br/>
 ┣ 📜App.css <br/>
 ┣ 📜App.js <br/>
 ┗ 📜server.js  <br/>

## 3. 주요 기능

### 회원가입
- 해당 글자를 클릭하면 회원가입 창을 열수있습니다.
<img src="/images/sign_img1.png" width="600" height="400">

- DB를 검사해서 이미 존재하는 이름, 이메일이 있다면 경고창을 보여줍니다.
<img src="/images/sign_img2.png" width="600" height="400">
<img src="/images/sign_img3.png" width="600" height="400">

- 비밀번호와 비밀번호 확인이 일치하지 않다면 경고창을 보여줍니다.
- 비밀번호를 DB에 저장시 crypto-js 라이브러리를 사용해서 암호화로 저장합니다.
<img src="/images/sign_img4.png" width="600" height="400">

- 전부다 작성하지 않을경우 경고창을 보여줍니다.
<img src="/images/sign_img5.png" width="600" height="400">

- 회원가입 성공시 화면입니다.
<img src="/images/sign_img6.png" width="600" height="400">

### 로그인
- 해당 글자를 클릭하면 로그인 창을 열수있습니다.
<img src="/images/login_img1.png" width="600" height="400">

- 밑 에 "아직 회원이 아니신가요? 회원가입" 을 클릭하면 회원가입 창을 띄웁니다.
<img src="/images/login_img2.png" width="600" height="400">

- DB를 검사해서 아이디와 비밀번호 동시에 일치하는 정보가 없다면 경고창을 보여줍니다.
<img src="/images/login_img3.png" width="600" height="400">
<img src="/images/login_img4.png" width="600" height="400">

- 로그인 성공시 화면입니다.
- 로그인 성공시 react-cookies 라이브러리를 사용하여 로그인 성공한 유저의 컬럼(Id, Name)을 쿠키에 저장합니다
- 로그인에 성공하면 "로그인 ㅣ 회원가입" 이었던 화면이 "내정보 ㅣ 로그아웃"으로 변경됩니다.
<img src="/images/login_img5.png" width="600" height="400">

### 로그아웃
- 해당 글자를 클릭하면 로그아웃 할수있습니다
- 로그아웃시 로그인 후 react-cookies 라이브로리를 사용하여 저장된 유저의 정보는 삭제됩니다.
<img src="/images/logout_img1.png" width="600" height="400">

- 로그아웃 성공화면입니다
<img src="/images/logout_img2.png" width="600" height="400">

### 메인 페이지
- 메인 화면의 이미지를 글자와 화삺표를 클릭해서 움직이게 할수있습니다.
<img src="/images/main_video2.gif" width="600" height="400">

- 해쉬테그 차량이름을 클릭하여 원하는 차량을 찾아볼수 있습니다.
- 조건을 넣어서 원하는 차량을 찾을수 있습니다.
<img src="/images/main_video3.gif" width="600" height="400">

- 화살표를 클릭해서 화면을 이동하면서 추천차량을 볼수있습니다
- 차량을 클릭하면 차량 상세보기 페이지로 이동하여 차량을 상세하게 볼수있습니다.
<img src="/images/main_video4.gif" width="600" height="400">

### 검색 페이지
- 검색 페이지는 해당 텍스트를 클리하여 접속할수있습니다.
<img src="/images/search_img1.png" width="600" height="400">

- 자신이 원하는 조건을 선택해서 조건에 맞는 차량을 찾을수있습니다.
- 차량을 클릭하면 상세보기 페이지로 이동하며 차량을 상세하게 볼수있습니다.
- 
<img src="/images/search_video2.gif" width="600" height="400">
