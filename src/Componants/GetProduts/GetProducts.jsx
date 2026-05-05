import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import fakeImage from "../../assets/images/Annotation 2024-02-21 205940.png";
import { Helmet } from "react-helmet";
import { FilterProducts } from "./../../Context/FilterProducts";

export default function GetProducts() {

    const { language } = useContext(FilterProducts);
    const { name, id } = useParams();

    const [itemsList, setItemsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function getProduct() {
        try {
            setIsLoading(true);
            setError("");

            const { data } = await axios.get(
                `https://zunis-node-js.vercel.app/product/${name}`
            );

            setItemsList(data.data || []);

        } catch (err) {
            setError("Failed to load data");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProduct();
        window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    return (
        <>
            <Helmet>
                <title>
                    {language === 'ع'
                        ? "All properties - Sakan"
                        : "استكشف العقارات - سكن"}
                </title>
            </Helmet>

            <div className="container py-5">

                <div className="d-flex justify-content-between">
                    <h3>
                        {language === 'ع'
                            ? "Explore best properties"
                            : "استكشف افضل العقارات"}
                    </h3>

                    <Link to={`/myzone/${id}`}>
                        <button className="btn btn-danger">
                            {language === 'ع'
                                ? "Add Advertisement"
                                : "اضف اعلان"}
                        </button>
                    </Link>
                </div>

                {/* States */}
                {isLoading && <h3 className="text-center mt-5">Loading...</h3>}
                {error && <p className="text-danger">{error}</p>}

                {!isLoading && itemsList.length === 0 && (
                    <h3 className="text-center mt-5">
                        {language === 'ع'
                            ? "No items found"
                            : "لا يوجد عقارات"}
                    </h3>
                )}

                <div className="row mt-5">

                    {itemsList.map((item) => {

                        const modalId = `modal-${item._id}`;

                        return (
                            <div key={item._id} className="col-md-4">

                                <Link to={`/productdetails/${item.categoryId?.slug}/${item._id}`}>
                                    <img
                                        src={item.Images?.[0]?.secure_url || fakeImage}
                                        className="w-100"
                                        alt={item.title}
                                    />
                                </Link>

                                <h4 className="mt-3">
                                    {item.price} {language === 'ع' ? "EGP" : "ج.م"}
                                </h4>

                                <p>{item.title?.slice(0, 55)}</p>

                                <p>
                                    {language === 'ع'
                                        ? `Area: ${item.propertyDesc?.size} m²`
                                        : `المساحة: ${item.propertyDesc?.size}`}
                                </p>

                                <p>{item.location}</p>

                                <div className="d-flex gap-2 flex-wrap">

                                    <Link to={`/productdetails/${item.categoryId?.slug}/${item._id}`}>
                                        <button className="btn btn-dark">
                                            {language === 'ع' ? "Details" : "التفاصيل"}
                                        </button>
                                    </Link>

                                    <button
                                        className="btn btn-secondary"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#${modalId}`}
                                    >
                                        {language === 'ع' ? "Contact" : "تواصل"}
                                    </button>

                                </div>

                                {/* Modal */}
                                <div
                                    className="modal fade"
                                    id={modalId}
                                    tabIndex={-1}
                                >
                                    <div className="modal-dialog">
                                        <div className="modal-content">

                                            <div className="modal-header">
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                ></button>
                                            </div>

                                            <div className="modal-body">
                                                <p>
                                                    Phone: {item.createdBy?.phoneNumber || "N/A"}
                                                </p>
                                                <p>
                                                    Email: {item.createdBy?.email || "N/A"}
                                                </p>
                                            </div>

                                            <div className="modal-footer">
                                                <a href={`mailto:${item.createdBy?.email}`}>
                                                    <button className="btn btn-primary">
                                                        Send Email
                                                    </button>
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        );
                    })}

                </div>
            </div>
        </>
    );
}