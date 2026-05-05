/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import heroImage from "../../assets/images/background.jpg";
import style from "./Hero.module.css";
import { useNavigate } from "react-router-dom";
import { FilterProducts } from "../../Context/FilterProducts";
import Joi from "joi";

export default function Hero() {

    const {
        price,
        wordSearch,
        type,
        settype,
        setPrice,
        setWordSearch,
        language
    } = useContext(FilterProducts);

    const navigate = useNavigate();

    const [status, setStatus] = useState("rent");
    const [error, setError] = useState("");

    const schema = Joi.object({
        wordSearch: Joi.string().trim().min(2).required(),
        price: Joi.string()
            .valid("1000000", "2000000", "3000000", "4000000", "5000000", "6000000")
            .required(),
    });

    useEffect(() => {
        setPrice("");
        setWordSearch("");
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const { error } = schema.validate(
            { wordSearch, price },
            { abortEarly: false }
        );

        if (!error) {
            setError("");
            navigate("/filter");
        } else {
            setError(error.details[0].message);
        }
    }

    return (
        <header style={{ backgroundImage: `url(${heroImage})` }}>
            <div className={`${style.layer} h-100`}>

                <h3 className="fs-1 p-5 text-white">
                    {language === "ع"
                        ? "Find your perfect property with us"
                        : "ابحث عن افضل العقارات معنا"}
                </h3>

                <form
                    onSubmit={handleSubmit}
                    className={`container ${style.customsWidth}`}
                >

                    {/* Rent / Buy */}
                    <div className="d-flex mb-3">
                        <button
                            type="button"
                            onClick={() => setStatus("rent")}
                            className={`btn bg-white ${style.btn1} ${status === "rent" ? style.btn2 : ""}`}
                        >
                            {language === "ع" ? "Rent" : "إيجار"}
                        </button>

                        <button
                            type="button"
                            onClick={() => setStatus("buy")}
                            className={`btn bg-white ${style.btn1} ${status === "buy" ? style.btn2 : ""}`}
                        >
                            {language === "ع" ? "Buy" : "شراء"}
                        </button>
                    </div>

                    {/* Form */}
                    <div className="bg-white row g-3 p-4">

                        {/* Location */}
                        <div className="col-md-3">
                            <input
                                value={wordSearch}
                                onChange={(e) => setWordSearch(e.target.value)}
                                type="text"
                                placeholder={
                                    language === "ع"
                                        ? "Search by Location"
                                        : "البحث بالموقع"
                                }
                                className="w-100 p-3"
                            />
                        </div>

                        {/* Type */}
                        <div className="col-md-3">
                            <select
                                value={type}
                                onChange={(e) => settype(e.target.value)}
                                className="w-100 p-3"
                            >
                                <option value="home">
                                    {language === "ع" ? "Homes" : "منازل"}
                                </option>
                                <option value="appartment">
                                    {language === "ع" ? "Apartments" : "شقق"}
                                </option>
                                <option value="land">
                                    {language === "ع" ? "Lands" : "اراضي"}
                                </option>
                            </select>
                        </div>

                        {/* Price */}
                        <div className="col-md-3">
                            <select
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-100 p-3"
                            >
                                <option value="">
                                    {language === "ع"
                                        ? "Price in EGP"
                                        : "السعر (ج.م)"}
                                </option>

                                <option value="1000000">{"< 1M"}</option>
                                <option value="2000000">{"< 2M"}</option>
                                <option value="3000000">{"< 3M"}</option>
                                <option value="4000000">{"< 4M"}</option>
                                <option value="5000000">{"< 5M"}</option>
                                <option value="6000000">{"< 6M"}</option>
                            </select>
                        </div>

                        {/* Submit */}
                        <div className="col-md-3">
                            <button
                                type="submit"
                                className={`w-100 p-3 text-white ${style.color}`}
                            >
                                {language === "ع"
                                    ? "Search Now"
                                    : "ابحث الان"}
                            </button>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-danger mt-2">
                                {error.includes("wordSearch")
                                    ? language === "ع"
                                        ? "يجب إدخال موقع"
                                        : "Location is required"
                                    : language === "ع"
                                    ? "يجب اختيار السعر"
                                    : "Price is required"}
                            </p>
                        )}

                    </div>

                </form>
            </div>
        </header>
    );
}