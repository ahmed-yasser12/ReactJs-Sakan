import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FilterProducts } from './../../Context/FilterProducts';

export default function Notfound() {
    const { language } = useContext(FilterProducts);

    return (
        <>
            <Helmet>
                <title>
                    {language === "ع"
                        ? "صفحة غير موجودة - سكن"
                        : "Not Found Page - Sakan"}
                </title>
            </Helmet>

            <div className="w-100 vh-100 d-flex justify-content-center align-items-center text-center px-3">
                {language === "ع" ? (
                    <h3 className="h5">
                        عذراً، لم نتمكن من العثور على الصفحة المطلوبة.{" "}
                        <Link className="text-black" to="/">
                            اضغط هنا
                        </Link>{" "}
                        للرجوع للصفحة الرئيسية
                    </h3>
                ) : (
                    <h3 className="h5">
                        Sorry, we could not find this page.{" "}
                        <Link className="text-black" to="/">
                            Click here
                        </Link>{" "}
                        to go back to the home page
                    </h3>
                )}
            </div>
        </>
    );
}