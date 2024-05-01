const express = require('express');
const body_parser = require('body-parser');
const PORT = process.env.PORT || 4000;
const app = express();
app.use(body_parser.json())
const db = require('./config/db');
const multiDb = require('./config/multi_db')
app.use(body_parser.urlencoded({extended:true}));
app.use(express.json());
const upload = require('./fileUploadAction');//업로드 기능을 가져옴
const multer = require('multer');
app.use('/smallCar', express.static("smallCar"));
app.use('/mediumCar', express.static("mediumCar"));
app.use('/bigCar', express.static("bigCar"));
app.use("/upload", express.static("upload"));

// 이미지를 upload 폴더에 넣는 쿼리
app.post('/api/upload', (req, res, next) => {
    console.log('/api/upload');
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
          return next(err);
        } else if (err) {
          return next(err);
        }
        console.log('원본파일명 : ' + req.file.originalname)
        console.log('저장파일명 : ' + req.file.filename) // 이것만 찾으면 된다.
        console.log('크기 : ' + req.file.size)
        return res.json({file:req.file.filename});
      });
})


// 모든 유저 정보 가져오기
app.get('/userList', (req, res) => {
    db.query('select * from user', (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 회원가입
app.post('/sign', (req, res) => {
    const { email, password, name } = req.body;

    db.query(`insert into user(email, password, name) values("${email}", "${password}", "${name}")`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 로그인
app.get('/login/:email', (req, res) => {
    const { email } = req.params;

    db.query(`select * from user where email="${email}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 모든 차량 가져오기 limit 0,6
app.get('/getAllCarFirstPage', (req, res) => {
    db.query(`select * from carList limit 0,6`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 메인 페이지 차량 추천
app.get('/mainRecommendCarRand', (req, res) => {
    db.query(`select * from carList where type="대형차" limit 7`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// searchWantCar(brand만 들어있는) 쿼리문
app.get('/searchWantCarOnlyBrand/:brand/:page', (req, res) => {
    const { brand, page } = req.params;

    let lastNum = page * 6;
    let firstNum = lastNum - 6;
    
    db.query(`select * from carList where brand="${brand}" limit ${firstNum},6`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// searchCarInput(model만 들어있는) 쿼리문
app.get('/searchCarInput/:model/:page', (req, res) => {
    const {  model, page } = req.params;

    let lastNum = page * 6;
    let firstNum = lastNum - 6;

    db.query(`select * from carList where name like "%${model}%" limit ${firstNum},6`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// searchWantCar(brand, model 전부다 들어있는) 쿼리문
app.get('/searchWantCarAll/:brand/:model/:page', (req, res) => {
    const { brand, model, page } = req.params;

    let lastNum = page * 6;
    let firstNum = lastNum - 6;

    db.query(`select * from carList where brand="${brand}" and name like "%${model}%" limit ${firstNum},6`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// seachCarprice 쿼리문
app.get('/searchCarPrice/:brand/:low/:high', (req, res) => {
    const { brand, low, high } = req.params;

    db.query(`select * from carList where price between "${low}" and "${high}" and brand="${brand}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// searchCarType 쿼리문
app.get('/getCarType/:type/:page', (req, res) => {
    const { type, page } = req.params;

    let lastNum = page * 6;
    let firstNum = lastNum - 6;

    db.query(`select * from carList where type="${type}" limit ${firstNum},6`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// brand만 있는 버전
app.get('/searchCarBrand/:brand/:lowYear/:highYear/:lowMileage/:highMileage/:lowPrice/:highPrice/:page', (req, res) => {
    const {brand, lowYear, highYear, lowMileage, highMileage, lowPrice, highPrice, page} = req.params;

    let lastNum = page * 6;
    let firstNum = lastNum - 6;

    db.query(
        `select * from carList where year between "${lowYear}" and "${highYear}"  
        and mileage between "${lowMileage}" and "${highMileage}" 
        and price between "${lowPrice}" and "${highPrice}"
        and brand="${brand}" 
        limit ${firstNum},6`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// type만 있는 버전
app.get('/searchCarType/:type/:lowYear/:highYear/:lowMileage/:highMileage/:lowPrice/:highPrice/:page', (req, res) => {
    const {type, lowYear, highYear, lowMileage, highMileage, lowPrice, highPrice, page} = req.params;

    let lastNum = page * 6;
    let firstNum = lastNum - 6;

    db.query(
        `select * from carList where year between "${lowYear}" and "${highYear}"  
        and mileage between "${lowMileage}" and "${highMileage}" 
        and price between "${lowPrice}" and "${highPrice}"
        and type="${type}" 
        limit ${firstNum},6`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// brand, type 둘다 있는 버전
app.get('/searchCarBrandType/:brand/:type/:lowYear/:highYear/:lowMileage/:highMileage/:lowPrice/:highPrice/:page', (req, res) => {
    const {brand, type, lowYear, highYear, lowMileage, highMileage, lowPrice, highPrice, page} = req.params;

    let lastNum = page * 6;
    let firstNum = lastNum - 6;

    db.query(
        `select * from carList where year between "${lowYear}" and "${highYear}"  
        and mileage between "${lowMileage}" and "${highMileage}" 
        and price between "${lowPrice}" and "${highPrice}" 
        and brand="${brand}"
        and type="${type}"
        limit ${firstNum},6`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 브랜드 없는 버전
app.get('/searchCar/:lowYear/:highYear/:lowMileage/:highMileage/:lowPrice/:highPrice/:page', (req, res) => {
    const { lowYear, highYear, lowMileage, highMileage, lowPrice, highPrice, page} = req.params;

    let lastNum = page * 6;
    let firstNum = lastNum - 6;

    db.query(
        `select * from carList where year between "${lowYear}" and "${highYear}"  
        and mileage between "${lowMileage}" and "${highMileage}" 
        and price between "${lowPrice}" and "${highPrice}"
        limit ${firstNum},6`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 특정 차만 가져오기
app.get(`/getDetailCar/:id`, (req, res) => {
    const { id } = req.params;

    db.query(`select * from carList where id="${id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 같은 차종만 가져오기
app.get('/getSameTypeCar/:type', (req, res) => {
    const { type } = req.params;

    db.query(`select * from carList where type="${type}" limit 0,6`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 관심목록 추가
app.post('/addFavoriteCar', (req, res) => {
    const { carId, userId } = req.body;

    db.query(`insert into favoriteCar(carId, userId) values("${carId}", "${userId}")`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 관심목록 삭제
app.delete('/removeFavoriteCar/:carId/:userId', (req, res) => {
    const { carId, userId } = req.params;

    db.query(`delete from favoriteCar where carId="${carId}" and userId="${userId}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 로그인한 유저 관심목록 가져오기
app.get('/getFavoriteCarList/:userId', (req, res) => {
    const { userId } = req.params;

    db.query(`select * from favoriteCar where userId="${userId}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 구매목록 추가
app.post('/addBuyCarList', (req, res) => {
    const { carId, userId } = req.body;

    const query1 = `insert into buyCarList(carId, userId) values("${carId}", "${userId}");`;
    const query2 = `update carList set status="SoldOut" where id="${carId}"`

    multiDb.query(query1 + query2, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 관심목록 삭제
app.delete('/removeAddBuyCarList/:carId/:userId', (req, res) => {
    const { carId, userId } = req.params;

    db.query(`delete from buyCarList where carId="${carId}" and userId="${userId}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 로그인한 유저 구매목록 가져오기
app.get('/getBuyCarList', (req, res) => {
    db.query(`select * from buyCarList`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 차량등록하기
app.post('/uploadCar', (req, res) => {
    const { brand, name, color, year, type, price, mileage, carImg1 } = req.body;

    db.query(`insert into carList(brand, name, color, year, type, price, mileage, carImg1, status) values("${brand}", "${name}", "${color}", "${year}", "${type}", "${price}", "${mileage}", "${carImg1}", "notSoldOut")`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// myPage 관심목록 가져오기
app.get('/getFavoriteCarList/:userId/:page', (req, res) => {
    const { userId, page } = req.params;

    let lastNum = page * 6;
    let firstNum = lastNum - 6;

    db.query(`select * from favoriteCar where userId="${userId}" limit ${firstNum},6`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// myPage 구매목록 가져오기
app.get('/getBuyCarList/:userId/:page', (req, res) => {
    const { userId, page } = req.params;

    let lastNum = page * 6;
    let firstNum = lastNum - 6;

    db.query(`select * from buyCarList where userId="${userId}" limit ${firstNum},6`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// carList 관심목록, 구매목록 가져오기
app.get('/getCarList/:id/:page', (req, res) => {
    const { id, page } = req.params;

    let lastNum = page * 6;
    let firstNum = lastNum - 6;
    
    db.query(`select * from carList where id="${id}" limit ${firstNum},6`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

app.listen(PORT, () => {
    console.log(`server on http://localhost:${PORT}`);
})