import styles from "../signUp/styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
const index = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const changeHandler = ({ currntTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "sttp://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.responce &&
        error.responce.status >= 400 &&
        error.responce.status <= 500
      ) {
        setError(error.responc.data.message);
      }
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpFormContainer}>
        <div className={styles.left}>
          <Link to="/login">
            <button className={styles.whiteBtn}>Sign In</button>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.formContainer} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={changeHandler}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={changeHandler}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={changeHandler}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={changeHandler}
              value={data.password}
              required
              className={styles.input}
            />

            {error && <div className={styles.errorMesssage}>{error}</div>}

            <button type="submit" className={styles.greenBtn}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
