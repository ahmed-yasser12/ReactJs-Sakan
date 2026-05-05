/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import style from "../../Componants/GetProduts/GetProducts.module.css";
import { useContext, useEffect, useState } from "react";
import { FilterProducts } from './../../Context/FilterProducts';
import axios from "axios";

export default function MyAd() {
    const { setElement, userData, language } = useContext(FilterProducts);

    const [myAdv, setAdv] = useState([]);
    const [loadingId, setLoadingId] = useState(null);

    const navigate = useNavigate();

    async function getMyAdv() {
        if (!userData?._id) return;

        try {
            const { data } = await axios.get(
                `https://zunis-node-js.vercel.app/product/?createdBy=${userData._id}`
            );

            setAdv(data.data);

        } catch (error) {
            console.log(error);
        }
    }

    async function deleteProperty(itemId) {
        try {
            setLoadingId(itemId);

            await axios.delete(
                `https://zunis-node-js.vercel.app/product/delete?productId=${itemId}`,
                {
                    headers: {
                        "token": `Ahmed__${localStorage.getItem("user")}`
                    }
                }
            );

            //update UI مباشرة بدون refetch
            setAdv(prev => prev.filter(item => item._id !== itemId));

        } catch (error) {
            console.error(error);
        } finally {
            setLoadingId(null);
        }
    }

    function updateProperty(itemId, item) {
        setElement(item);
        navigate(`/updateProperty/${itemId}`);
    }

    useEffect(() => {
        getMyAdv();
        window.scroll(0, 0);
    }, [userData]); 

    return (
        <div className="container py-5">
            <div className="row g-3 justify-content-between my-5 alert alert-light">
                <h3 className="text-primary col-12 col-lg-6 fw-bold">
                    My Properties
                </h3>

                <div className="d-flex justify-content-center col-12 col-lg-6 flex-wrap">
                    <Link to={`/myzone/65d8c2138bfd8107356010e2`}>
                        <button className="btn btn-primary mx-2">
                            {language === 'ع' ? "Add Apartment" : "اضف شقة"}
                        </button>
                    </Link>

                    <Link to={`/myzone/65d8c1c01269fe7a10558011`}>
                        <button className="btn btn-primary mx-2">
                            {language === 'ع' ? "Add Home" : "اضف بيت"}
                        </button>
                    </Link>

                    <Link to={`/myzone/65d8c23b1269fe7a1055818b`}>
                        <button className="btn btn-primary mx-2">
                            {language === 'ع' ? "Add Land" : "اضف قطعة ارض"}
                        </button>
                    </Link>
                </div>
            </div>

            {myAdv.length === 0 ? (
                <h3 className="text-center">
                    {language === 'ع' ? "No Ads yet" : "لا توجد إعلانات"}
                </h3>
            ) : (
                <div className="row py-5">
                    {myAdv.map((item) => (
                        <div key={item._id} className={`col-md-4 ${style.box2} p-4`}>
                            
                            <Link to={`/productdetails/${item.categoryId.slug}/${item._id}`}>
                                <div className={style.boxImage}>
                                    <img src={item.Images[0]?.secure_url} className="w-100" alt="" />
                                </div>
                            </Link>

                            <h3 className="fw-bold mt-4">
                                {language === 'ع' ? `${item.price} EGP` : `${item.price} ج.م`}
                            </h3>

                            <p className="fw-bold">{item.title.slice(0, 55)}</p>

                            <div className="d-flex">
                                <span className="me-2">
                                    🛏 {item.propertyDesc?.bedrooms}
                                </span>
                                <span>
                                    🚿 {item.propertyDesc?.bathrooms}
                                </span>
                            </div>

                            <p>
                                {language === 'ع'
                                    ? `Area: ${item.propertyDesc?.size} m2`
                                    : `المساحة: ${item.propertyDesc?.size} متر`}
                            </p>

                            <p>📍 {item.location}</p>

                            <div className="d-flex justify-content-center">
                                <button
                                    onClick={() => updateProperty(item._id, item)}
                                    className="btn btn-primary mx-2 w-50"
                                >
                                    Update
                                </button>

                                <button
                                    onClick={() => deleteProperty(item._id)}
                                    className="btn btn-danger mx-2 w-50"
                                >
                                    {loadingId === item._id
                                        ? <i className="fa fa-spinner fa-spin"></i>
                                        : "Delete"}
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}