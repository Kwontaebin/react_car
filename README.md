# **React 중고차 프로젝트**

프로젝트 소개
- 이 사이트는 차량을 구매하고 판매하는 중고차 사이트입니다.
- 관심목록, 구매목록을 통해 내가 구매하고 관심있는 차량을 저장할수있습니다.
- 찾고 있는 조건에 맞쳐 차량을 검색할수있습니다.

## 목차
- [개발 환경](#1-개발-환경)
- [프로젝트 구조](#2-프로젝트-구조)
- [주요 기능](#3-주요-기능)
- [성능](#4-성능)
- [후기](#5-후기)

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
<img src="/images/sign_img4.png" width="600" height="400">

- 전부다 작성하지 않을경우 경고창을 보여줍니다.
<img src="/images/sign_img5.png" width="600" height="400">

- 회원가입 성공시 화면입니다.
- 비밀번호를 DB에 저장시 crypto-js 라이브러리를 사용해서 암호화로 저장합니다.
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
- 로그인 성공시 react-cookies 라이브러리를 사용하여 로그인 성공한 유저의 필드(Id, Name)를 쿠키에 저장합니다
- 로그인에 성공하면 "로그인 ㅣ 회원가입" 이었던 화면이 "내정보 ㅣ 로그아웃"으로 변경됩니다.
<img src="/images/login_img5.png" width="600" height="400">

### 로그아웃
- 해당 글자를 클릭하면 로그아웃 할수있습니다
- 로그아웃시 로그인 후 react-cookies 라이브러리를 사용하여 저장된 유저의 정보는 삭제됩니다.
<img src="/images/logout_img1.png" width="600" height="400">

- 로그아웃 성공화면입니다
<img src="/images/logout_img2.png" width="600" height="400">

### 메인 페이지
- 메인 화면의 이미지를 글자와 화살표를 클릭해서 움직이게 할수있습니다.
- 위 의 창에 차량이름을 입력하고 엔터를 누르면 차량을 정보를 찾을수 있습니다.
<img src="/images/main_img6.png" width="600" height="400">
<img src="/images/main_img2.png" width="600" height="400">


- 해쉬테그 차량이름을 클릭하여 원하는 차량을 찾아볼수 있습니다.
- 조건을 넣어서 원하는 차량을 찾을수 있습니다.
<img src="/images/main_img3.png" width="600" height="400">
<img src="/images/main_img4.png" width="600" height="400">

- 화살표를 클릭해서 화면을 이동하면서 추천차량을 볼수있습니다
- 차량을 클릭하면 차량 상세보기 페이지로 이동하여 차량을 상세하게 볼수있습니다.
<img src="/images/main_img5.png" width="600" height="400">


### 검색 페이지
- 검색 페이지는 해당 텍스트를 클릭하여 접속할수있습니다.
<img src="/images/search_img8.png" width="600" height="400">

- 자신이 원하는 조건을 선택해서 조건에 맞는 차량을 찾을수있습니다.
- 이때 조건들은 로컬 스토리지에 저장됩니다.
- 차량을 클릭하면 상세보기 페이지로 이동하며 차량을 상세하게 볼수있습니다.
<img src="/images/search_img7.png" width="600" height="400">
<img src="/images/search_img2.png" width="600" height="400">

- 해당 버튼을 클릭하면 로컬 스토리지를 초기화합니다.
<img src="/images/search_img3.png" width="600" height="400">

- 검색창에 차량을 검색해서 찾고싶은 차량을 찾을수 있습니다.
<img src="/images/search_img4.png" width="600" height="400">
<img src="/images/search_img5.png" width="600" height="400">

- 페이지네이션을 통해 페이지를 이동할수있습니다.
- react-js-pagination 라이브러리를 사용해서 페이지네이션을 구현했습니다.
<img src="/images/search_img6.png" width="600" height="400">

### 상세보기 페이지
- 화살표를 눌러 차량의 여러개의 차량 이미지를 볼수있습니다.
<img src="/images/detail_img1.png" width="600" height="400">

- 차량의 정보를 전보다 상세하게 확인할수있습니다.
<img src="/images/detail_img9.png" width="600" height="400">

- 지금 보고있는 차량과 같은 차종의 차량을 볼수있습니다.
- 화살표를 눌러 뒤에 있는 차량도 볼수있습니다.
<img src="/images/detail_img2.png" width="600" height="400">

- 차량을 관심목록에 추가할수있습니다.
<img src="/images/detail_img3.png" width="600" height="400">
<img src="/images/detail_img4.png" width="600" height="400">

- 관심목록에 추가한 차량을 관심목록 취소 할수있습니다.
<img src="/images/detail_img5.png" width="600" height="400">
<img src="/images/detail_img6.png" width="600" height="400">

- 차량을 구매할수있습니다.
<img src="/images/detail_img7.png" width="600" height="400">
<img src="/images/detail_img8.png" width="600" height="400">

### 차량 판매 페이지
- 해당 텍스트를 클릭하면 차량 판매 페이지로 이동합니다.
<img src="/images/sell_img4.png" width="600" height="400">

- 모든 칸을 채우지 않으면 차량을 등록할수없습니다.
<img src="/images/sell_img1.png" width="600" height="400">
<img src="/images/sell_img2.png" width="600" height="400">

- 모든 칸을 채우면 차량등록에 성공합니다.
<img src="/images/sell_img3.png" width="600" height="400">

### 내 페이지
- 해당 텍스트를 클릭해서 내 페이지로 이동할수있습니다.
<img src="/images/my_page_img1.png" width="600" height="400">

- 나의 관심목록을 볼수있습니다.
<img src="/images/my_page_img2.png" width="600" height="400">

- 나의 차량 구매목록을 볼수있습니다.
<img src="/images/my_page_img3.png" width="600" height="400">

## 4. 성능
- Lighthouse를 사용하여 측정한 프로젝트의 성능입니다.
<img src="/images/value_img1.png" width="600" height="400">
<img src="/images/value_img2.png" width="800" height="400">
<img src="/images/value_img3.png" width="800" height="400">

## 5. 후기
이전에 만든 중고거래 사이트에서 어려움을 겪었던 조건을 넣어서 조건에 맞는 상품을 검색하는 기능을 성공적으로 만들어서 <br/>
개인적으로 한번 더 성장했다는 것을 느껴 뿌듯한 프로젝트입니다.
