import { useContext, useState, useEffect } from "react";
import fakeImage from "../../assets/images/Annotation 2024-02-21 205940.png";
import style from "./Categories.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FilterProducts } from "../../Context/FilterProducts";

export default function Categories() {

    const { language } = useContext(FilterProducts);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const skeleton = [1, 2, 3];

    async function getCategory() {
        try {
            const { data } = await axios.get('https://zunis-node-js.vercel.app/category');
            setCategories(data.categories);
        } catch (err) {
            console.error("Error fetching categories:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <div className="container py-5">

            <h3 className="text-center">
                {language === 'ع'
                    ? "Search for properties for sale and rent in Egypt"
                    : "ابحث عن عقارات للبيع و للايجار في مصر"}
            </h3>

            <div className="row mt-5 g-3 justify-content-center">

                {loading ? (
                    skeleton.map((_, index) => (
                        <div key={index} className="col-md-3">
                            <div className="card p-3">
                                <img src={fakeImage} className={`w-100 ${style.fakeImage}`} alt="loading" />
                            </div>
                        </div>
                    ))
                ) : (
                    categories.map((item) => (
                        <div key={item._id} className="col-md-3">

                            <Link
                                to={`/getproducts/${item.slug}/${item._id}`}
                                className={`bg-light ${style.box} p-3 d-flex justify-content-center`}
                            >
                                <div>
                                    <div className={style.boxImage}>
                                        <img
                                            src={item.image?.secure_url}
                                            className="w-100"
                                            alt={item.name}
                                        />
                                    </div>

                                    <h3 className="text-center fw-bold mt-4 h5">
                                        {item.name}
                                    </h3>

                                    <p className="text-center">
                                        {item.products?.length || 0}{" "}
                                        {language === 'ع' ? "Item" : "عنصر"}
                                    </p>
                                </div>
                            </Link>

                        </div>
                    ))
                )}

            </div>
        </div>
    );
}