/* eslint-disable jsx-a11y/iframe-has-title */
import { useContext, useEffect, useState } from "react";
import style from "./Contact.module.css";
import contactImage from "../../assets/images/contactImage.jfif";
import { Helmet } from "react-helmet";
import { FilterProducts } from "./../../Context/FilterProducts";
import Joi from "joi";
import axios from "axios";

function Contacts() {
  const { language } = useContext(FilterProducts);

  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [messageData, setMessageData] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // clear success message
  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => setSuccess(""), 4000);
    return () => clearTimeout(timer);
  }, [success]);

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setMessageData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors([]);
    setServerError("");
  };

  // validation
  const validate = () => {
    const schema = Joi.object({
      fullName: Joi.string().min(3).max(50).required(),
      email: Joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
      phone: Joi.string()
        .pattern(/^(?:\+?20|0)(?:1\d{9})$/)
        .required(),
      message: Joi.string().min(10).max(500).required(),
    });

    return schema.validate(messageData, { abortEarly: false });
  };

  // reset form
  const resetForm = () => setMessageData(initialState);

  // submit
  const submitForm = async (e) => {
    e.preventDefault();

    const { error } = validate();

    if (error) {
      setErrors(error.details);
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://zunis-node-js.vercel.app/message/messageToAdmin",
        messageData
      );

      setSuccess(data?.message || "Message sent successfully");
      resetForm();
    } catch (err) {
      setServerError(err?.response?.data?.Error || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  const isArabic = language === "ع";

  return (
    <>
      <Helmet>
        <title>{isArabic ? "تواصل معنا - سكن" : "Contact Us - Sakan"}</title>
      </Helmet>

      {/* HERO */}
      <div
        className="w-100 position-relative"
        style={{
          backgroundImage: `url(${contactImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "75vh",
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

        <div className="container position-relative text-white h-100 d-flex flex-column justify-content-center">
          <h1 className="fw-bold">
            {isArabic ? "تواصل معنا" : "Contact Us"}
          </h1>
          <p className="opacity-75">
            {isArabic
              ? "نحن هنا لمساعدتك في أي وقت"
              : "We are here to help you anytime"}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className={`${style.bgContact} py-5`}>
        <div className="container">
          <div className="row g-4">

            {/* INFO */}
            <div className="col-12 col-lg-5">
              <div className="p-4 rounded-4 text-white shadow"
                style={{
                  background: "linear-gradient(135deg,#102855,#1b3a73)",
                }}
              >
                <h4 className="mb-4">
                  {isArabic ? "معلومات التواصل" : "Contact Info"}
                </h4>

                <p>Email: Sakan@house.com</p>
                <p>Phone: +2011577954437</p>
                <p>{isArabic ? "طنطا، مصر" : "Tanta, Egypt"}</p>
              </div>
            </div>

            {/* FORM */}
            <div className="col-12 col-lg-7">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow">

                <h4 className="text-center mb-4">
                  {isArabic ? "أرسل رسالة" : "Send Message"}
                </h4>

                {/* ERRORS */}
                {errors.length > 0 && (
                  <ul className="text-danger small">
                    {errors.map((e, i) => (
                      <li key={i}>{e.message}</li>
                    ))}
                  </ul>
                )}

                {/* FORM */}
                <form onSubmit={submitForm} className="row w-100 g-3">

                  <div className="col-12">
                    <input
                      name="fullName"
                      value={messageData.fullName}
                      onChange={handleChange}
                      placeholder={isArabic ? "الاسم الكامل" : "Full Name"}
                      className="form-control p-3"
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      name="email"
                      value={messageData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="form-control p-3"
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      name="phone"
                      value={messageData.phone}
                      onChange={handleChange}
                      placeholder={isArabic ? "الهاتف" : "Phone"}
                      className="form-control p-3"
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      name="message"
                      value={messageData.message}
                      onChange={handleChange}
                      rows="5"
                      placeholder={isArabic ? "رسالتك" : "Message"}
                      className="form-control p-3"
                    />
                  </div>

                  {serverError && (
                    <p className="text-danger">{serverError}</p>
                  )}

                  {success && (
                    <p className="text-success">{success}</p>
                  )}

                  <div className="col-12">
                    <button
                      disabled={loading}
                      className="btn btn-dark w-100 py-3 fw-bold"
                    >
                      {loading
                        ? isArabic
                          ? "جاري الإرسال..."
                          : "Sending..."
                        : isArabic
                          ? "إرسال"
                          : "Send"}
                    </button>
                  </div>

                </form>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MAP */}
      <iframe
        className="w-100 border-0"
        style={{ height: "450px" }}
        src="https://www.google.com/maps/embed?pb=..."
      />
    </>
  );
}

export default Contacts;