import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "İşlem Başarılı") {
             navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Giriş Yap</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Lütfen emaili giriniz"
              autoComplete="off"
              name="email"
              className="form control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Şifre</strong>
            </label>
            <input
              type="password"
              placeholder="Lütfen emaili giriniz"
              autoComplete="off"
              name="Şifre"
              className="form control rounded-0"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Giriş Yap
          </button>
        </form>
        <p>Üye Değil misiniz ?</p>
        <Link
          to="/register"
          className="btn btn-default-border w-100 bg-light rounded-0 text-decoration-none"
        >
          Kayıt Ol
        </Link>
      </div>
    </div>
  );
}

export default Login;
