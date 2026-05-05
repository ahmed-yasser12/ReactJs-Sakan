import male from "../../assets/images/male.png";
import female from "../../assets/images/female.png";
import aboutImage from "../../assets/images/aboutImage.jfif";
import style from "./about.module.css";
import about1 from "../../assets/images/about1.jfif";
import about2 from "../../assets/images/about2.jfif";
import about3 from "../../assets/images/about3.jfif";
import facebook from "../../assets/images/facebook.png";
import whatsapp from "../../assets/images/whatsapp.png";
import instagram from "../../assets/images/instgram.png";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { FilterProducts } from "../../Context/FilterProducts";

export default function About() {

    const { language } = useContext(FilterProducts);

    const team = [
        { name: "Naira Ibrahim", role: "UI/UX Designer", img: female },
        { name: "Mai Hafez", role: "UI/UX Designer", img: female },
        { name: "Ahmed Shaltout", role: "Backend Developer", img: male },
        { name: "Ahmed Yasser", role: "Frontend Developer", img: male },
        { name: "Ahmed Hassan", role: "Frontend Developer", img: male },
    ];

    return (
        <>
            <Helmet>
                <title>
                    {language === 'ع' ? "About Us - Sakan" : "نبذة عننا - سكن"}
                </title>
            </Helmet>

            <section>

                {/* Hero */}
                <div
                    className={`w-100 ${style.background} d-flex pt-5`}
                    style={{ backgroundImage: `url(${aboutImage})` }}
                >
                    <div className="p-5 text-black">
                        <h3 className="h1 fw-bold">
                            {language === 'ع' ? "Contact Us" : "تواصل معنا"}
                        </h3>
                        <p className="h3">
                            {language === 'ع' ? "For any question" : "لأي سؤال"}
                        </p>
                    </div>
                </div>

                {/* About Images */}
                <div className="container py-5">
                    <h3 className="text-center fw-bold mb-5">
                        {language === 'ع' ? "More About Us" : "اعرف المزيد عننا"}
                    </h3>

                    <div className="row g-3">
                        <div className="col-md-4">
                            <img src={about1} alt="about" className="w-100" />
                        </div>
                        <div className="col-md-4">
                            <img src={about2} alt="about" className="w-100 mb-3" />
                            <img src={about3} alt="about" className="w-100" />
                        </div>
                        <div className="col-md-4">
                            <img src={about1} alt="about" className="w-100" />
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="container py-5">
                    <h3 className="text-center mb-5">
                        {language === 'ع' ? "Our Values" : "قيمنا"}
                    </h3>

                    <div className="row g-3">
                        {["value1", "value2", "value3"].map((val, i) => (
                            <div key={i} className="col-md-4">
                                <div className="bg-white text-center p-4">
                                    <h3 className="fw-bold h2 mb-4">{val}</h3>
                                    <p>Lorem ipsum dolor sit amet...</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <div className="container py-5">
                    <h3 className="text-center h1 mb-5">
                        {language === 'ع' ? "Our Team" : "فريقنا"}
                    </h3>

                    <div className="row g-4">
                        {team.map((member, i) => (
                            <div key={i} className="col-md-4">
                                <div>
                                    <img src={member.img} alt={member.name} className="w-100" />
                                    <h3 className="text-center mt-4 fw-bold">
                                        {member.name}
                                    </h3>
                                    <p className={`text-center ${style.textSpecial}`}>
                                        {member.role}
                                    </p>

                                    <div className="d-flex justify-content-center">
                                        <img className={style.imgSpecial} src={facebook} alt="facebook" />
                                        <img className={`${style.imgSpecial} mx-2`} src={whatsapp} alt="whatsapp" />
                                        <img className={style.imgSpecial} src={instagram} alt="instagram" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </>
    );
}