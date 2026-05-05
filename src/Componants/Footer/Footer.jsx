import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useContext } from "react";
import { FilterProducts } from "./../../Context/FilterProducts";

export default function Footer() {
    const { language } = useContext(FilterProducts);

    const year = new Date().getFullYear();

    return (
        <footer className="bg-light py-5">
            <div className="container text-dark">
                <div className="row gy-4">

                    {/* Logo */}
                    <div className="col-md-3 text-center">
                        <Link to="/">
                            <img src={logo} width={100} alt="Sakan Logo" />
                        </Link>

                        <p className="my-4">
                            {language === 'ع'
                                ? `© ${year} All rights reserved`
                                : `© ${year} جميع الحقوق محفوظة`}
                        </p>

                        <div className="d-flex justify-content-center gap-3">
                            <Link to={""} aria-label="Facebook">
                                <i className="fa-brands fa-facebook fs-4 text-dark"></i>
                            </Link>
                            <Link to={""} aria-label="Instagram">
                                <i className="fa-brands fa-instagram fs-4 text-dark"></i>
                            </Link>
                            <Link to={""} aria-label="Twitter">
                                <i className="fa-brands fa-twitter fs-4 text-dark"></i>
                            </Link>
                        </div>
                    </div>

                    {/* Explore */}
                    <div className="col-md-3 text-center">
                        <h4 className="fw-bold mb-4">
                            {language === 'ع' ? "Explore" : "استكشف"}
                        </h4>

                        <Link className="nav-link text-muted my-2" to="/getproducts/home/65d8c1c01269fe7a10558011">
                            {language === 'ع' ? "Homes" : "منازل"}
                        </Link>

                        <Link className="nav-link text-muted my-2" to="/getproducts/appartment/65d8c2138bfd8107356010e2">
                            {language === 'ع' ? "Apartments" : "شقق"}
                        </Link>

                        <Link className="nav-link text-muted my-2" to="/getproducts/land/65d8c23b1269fe7a1055818b">
                            {language === 'ع' ? "Lands" : "اراضي"}
                        </Link>
                    </div>

                    {/* Resources */}
                    <div className="col-md-3 text-center">
                        <h4 className="fw-bold mb-4">
                            {language === 'ع' ? "Resources" : "المصادر"}
                        </h4>

                        <p className="text-muted">
                            {language === 'ع' ? "Videos" : "فيديوهات"}
                        </p>

                        <p className="text-muted">
                            {language === 'ع' ? "Member stories" : "قصص الأعضاء"}
                        </p>
                    </div>

                    {/* About */}
                    <div className="col-md-3 text-center">
                        <h4 className="fw-bold mb-4">
                            {language === 'ع' ? "About Us" : "عننا"}
                        </h4>

                        <p className="text-muted small">
                            {language === 'ع'
                                ? "Real estate company specializing in selling, renting, and managing properties."
                                : "شركة عقارية متخصصة في بيع وتأجير وإدارة العقارات."}
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
}