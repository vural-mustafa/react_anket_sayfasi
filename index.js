// MUSTAFA VURAL //
// emplooye hatasını dikkate almayınız. Backend çalışıyor. Burada mongodb veri çekme ayarları var//
// 15.09.2023//25.09.2023
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./Employee.js");
const Survey = require("./survey.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Answer = require("./answer.js");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token mevcut değil");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json("Token yanlış");
      req.user = decoded;
      next();
    });
  }
};

app.get("/home", (req, res) => {
  return res.json("Başarılı");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign({ ...user }, "jwt-secret-key", {
            expiresIn: "1d",
          });
          res.cookie("token", token);
          res.json("İşlem Başarılı");
        } else {
          res.json("Şifre yanlış");
        }
      });
    } else {
      res.json("Üzgünüm! Böyle bir hesap bulunamadı.");
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      EmployeeModel.create({ name, email, password: hash })
        .then((employess) => {
          employess.password = undefined;
          res.json(employess);
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err.message);
    });
});

app.post("/survey", (req, res) => {
  /* POST http://localhost:3001/answers/6511e9cee2fdc6ac1d7073e0 */

  const { title, answers } = req.body;
  const survey = new Survey({
    title,
    answers,
  });
  survey
    .save()
    .then((sur) => {
      console.log("survey added", sur);
      res.status(201).json(sur);
    })
    .catch((err) => res.status(500).json(err));
});

app.post("/answers/:id", verifyUser, (req, res) => {
  /* POST http://localhost:3001/survey */

  const { answer } = req.body;
  const survey = new Answer({
    answer,
    survey: req.params.id,
    user: req.user._doc._id,
  });
  survey
    .save()
    .then((sur) => {
      console.log("survey added", sur);
      res.status(201).json(sur);
    })
    .catch((err) => res.status(500).json(err));
});

app.get("/answers/:id", (req, res) => {
  // get votes count
  req.user = data;

  Answer.findOne({
    questionId: req.params.id,
    user: { _id: req.user._doc._id },
  })
    .then((data) => {
      res.status(200).json({
        answer: data?.answer,
        hasVoted: data?.answer ? false : true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        answer: null,
        hasVoted: false,
      });
    });
});

app.post("/answers/:id", (req, res) => {
  // vote control joi
  const { error, value } = validateToAnswers(req.body);

  if (!error) {
    Answer.findOne({
      questionId: req.params.id,
      user: { _id: req.user._doc._id },
    })
      .then((ans) => {
        if (!ans) {
          // new vote added
          const answer = new Answer({
            questionId: req.params.id,
            user: req.user._doc._id,
            answer: value.answer,
          });
          answer.save().then((newAns) => {
            res.status(httpStatus.CREATED).send(newAns);
          });
        } else {
          // old vote
          res.status(httpStatus.BAD_REQUEST).json({
            message: "survey voted",
          });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(httpStatus.BAD_REQUEST).json({
      message: "answer data null",
    });
  }
});

app.post("/home", (req, res) => {
  const { title, answer } = req.body;
});

app.listen(3001, () => {
  console.log("Sunucu başarılı bir şekilde çalıştı.");
});
