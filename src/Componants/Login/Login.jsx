import axios from "axios";
import Joi from "joi";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FilterProducts } from "./../../Context/FilterProducts";
import style from "../../Componants/Register/Register.module.css";
import eye from "../../assets/images/eye.jpg";
import not from "../../assets/images/not.jpg";

export default function Login() {
  const { language } = useContext(FilterProducts);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "User",
  });

  const [error, setError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function getUserInfoLogin(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function LoginValidator() {
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
    });

    return schema.validate(user, { abortEarly: false });
  }

  async function sendData() {
    try {
      const response = await axios.post(
        `https://zunis-node-js.vercel.app/auth/signin`,
        user,
      );

      localStorage.setItem("user", response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.Error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  function submitLogin(e) {
    e.preventDefault();

    setIsLoading(true);
    setError("");
    setErrorList([]);

    const validation = LoginValidator();

    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    } else {
      sendData();
    }
  }

  return (
    <>
      <Helmet>
        <title>
          {language === "ع" ? "Login Page - Sakan" : "تسجيل الدخول - سكن"}
        </title>
      </Helmet>

      <div className="d-flex justify-content-center align-items-center vh-100 w-100">
        <form onSubmit={submitLogin} className="p-4">
          {errorList.length > 0 && (
            <ul>
              {errorList.map((item, index) => (
                <li className="text-danger" key={index}>
                  {item.message}
                </li>
              ))}
            </ul>
          )}

          <h3 className="mb-3 h4">
            {language === "ع" ? "Login" : "تسجيل الدخول"}
          </h3>

          {/* Email */}
          <div className="form-group my-3">
            <input
              onChange={getUserInfoLogin}
              name="email"
              type="email"
              value={user.email}
              placeholder={language === "ع" ? "Email" : "البريد الإلكتروني"}
              className="w-100 p-2"
            />
          </div>

          {/* Password */}
          <div className="form-group my-3">
            <div className="position-relative">
              <input
                onChange={getUserInfoLogin}
                name="password"
                type={viewPassword ? "text" : "password"}
                value={user.password}
                placeholder={language === "ع" ? "Password" : "كلمة المرور"}
                className="w-100 p-2"
              />

              <img
                onClick={() => setViewPassword(!viewPassword)}
                className={style.imgIcon}
                src={viewPassword ? eye : not}
                alt="toggle password"
                style={language === "ع" ? { right: "2%" } : { left: "2%" }}
              />
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-danger">{error}</p>}

          {/* Submit */}
          <button type="submit" className="btn btn-primary rounded-0 w-100">
            {isLoading ? (
              <div className="spinner-border" role="status"></div>
            ) : language === "ع" ? (
              "Login"
            ) : (
              "دخول"
            )}
          </button>

          {/* Register */}
          <p className="mt-3">
            {language === "ع" ? (
              <>
                I don't have an account?{" "}
                <Link to="/register">Create Account</Link>
              </>
            ) : (
              <>
                ليس لدي حساب <Link to="/register">إنشاء حساب</Link>
              </>
            )}
          </p>
        </form>
      </div>
    </>
  );
}
