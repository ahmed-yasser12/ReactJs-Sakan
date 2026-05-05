/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FilterProducts } from "../../Context/FilterProducts";
import { Helmet } from "react-helmet";

export default function Filter() {

  const {
    price,
    wordSearch,
    setPrice,
    setWordSearch,
    type,
    settype,
    language
  } = useContext(FilterProducts);

  const [searched, setSearched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchProduct() {
    try {
      setIsLoading(true);
      setError("");

      const { data } = await axios.get(
        `https://zunis-node-js.vercel.app/product/${type}?page=1&price[lt]=${price}&search=${wordSearch}`
      );

      setSearched(data.data || []);

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  // re-fetch on filter change
  useEffect(() => {
    searchProduct();
  }, [price, type, wordSearch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {language === 'ع'
            ? "Filter - Sakan"
            : "بحث عن عقار - سكن"}
        </title>
      </Helmet>

      <div className="container py-5">

        {/* Filters */}
        <div className="row my-5">
          <div className="col-md-6">
            <input
              type="text"
              value={wordSearch}
              placeholder={language === 'ع' ? "Enter location" : "ادخل الموقع"}
              className="p-2 w-100"
              onChange={(e) => setWordSearch(e.target.value)}
            />
          </div>

          <div className="col-md-6 d-flex gap-2">

            <select
              value={type}
              onChange={(e) => settype(e.target.value)}
              className="w-100"
            >
              <option value="">Type</option>
              <option value="home">Homes</option>
              <option value="appartment">Apartments</option>
              <option value="land">Lands</option>
            </select>

            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-100"
            >
              <option value="">Price</option>
              <option value="1000000">{"< 1M"}</option>
              <option value="2000000">{"< 2M"}</option>
              <option value="3000000">{"< 3M"}</option>
            </select>

            <button
              disabled={isLoading}
              onClick={searchProduct}
              className="btn btn-danger"
            >
              {isLoading ? "Loading..." : "Search"}
            </button>

          </div>
        </div>

        {/* Error */}
        {error && <p className="text-danger">{error}</p>}

        {/* Results */}
        <div className="row g-3">

          {isLoading ? (
            <h3 className="text-center">Loading...</h3>
          ) : searched.length === 0 ? (
            <h3 className="text-center">
              {language === 'ع'
                ? "No items found"
                : "لا يوجد نتائج"}
            </h3>
          ) : (

            searched.map((item) => (
              <div key={item._id} className="col-md-4">

                <Link to={`/productdetails/${item.categoryId?.slug}/${item._id}`}>
                  <img
                    src={item.Images?.[0]?.secure_url}
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
                    : `المساحة: ${item.propertyDesc?.size} متر`}
                </p>

                <p>{item.location}</p>

                <Link to={`/productdetails/${item.categoryId?.slug}/${item._id}`}>
                  <button className="btn btn-dark w-100">
                    {language === 'ع' ? "Details" : "التفاصيل"}
                  </button>
                </Link>

              </div>
            ))

          )}

        </div>

      </div>
    </>
  );
}