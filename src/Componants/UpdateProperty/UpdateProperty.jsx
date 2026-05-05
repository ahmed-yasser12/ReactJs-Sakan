import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FilterProducts } from "./../../Context/FilterProducts";

export default function UpdateProperty() {
  const { language, element } = useContext(FilterProducts);
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [images, setImages] = useState([]);
  const [letters, setLetters] = useState(0);

  const [propertyDesc, setPropertyDesc] = useState({
    size: element?.propertyDesc?.size || "",
    view: element?.propertyDesc?.view || "",
    yearOfConstruction: element?.propertyDesc?.yearOfConstruction || "",
    bathrooms: element?.propertyDesc?.bathrooms || "",
    bedrooms: element?.propertyDesc?.bedrooms || "",
    finishingType: element?.propertyDesc?.finishingType || "",
    shahrAqary: element?.propertyDesc?.shahrAqary || "",
    floor: element?.propertyDesc?.floor || "",
  });

  const [item, setItem] = useState({
    title: element?.title || "",
    caption: element?.caption || "",
    price: element?.price || "",
    section: element?.section || "",
    location: element?.location || "",
    descLocation: element?.descLocation || "",
    PaymentMethod: element?.PaymentMethod || "",
  });

  // ================= handlers =================

  function handlePropertyChange(e) {
    setPropertyDesc({
      ...propertyDesc,
      [e.target.name]: e.target.value,
    });
  }

  function handleItemChange(e) {
    let value = e.target.value;

    if (e.target.name === "title") {
      value = value.slice(0, 55);
      setLetters(value.length);
    }

    setItem({
      ...item,
      [e.target.name]: value,
    });
  }

  function handleImageChange(e) {
    setImages(Array.from(e.target.files));
  }

  // ================= validation =================

  function validateForm() {
    const schema = Joi.object({
      title: Joi.string().required(),
      caption: Joi.string().required(),
      price: Joi.number().required(),
      section: Joi.string().valid("rent", "sale").required(),
      location: Joi.string().required(),
      descLocation: Joi.string().required(),
      PaymentMethod: Joi.string()
        .valid("cash", "installments", "both")
        .required(),
      propertyDesc: Joi.object({
        size: Joi.number().positive().min(20).required(),
        view: Joi.string().allow(""),
        bedrooms: Joi.number().positive().allow(""),
        bathrooms: Joi.number().positive().allow(""),
        finishingType: Joi.string().allow(""),
        yearOfConstruction: Joi.number().positive().allow(""),
        shahrAqary: Joi.string()
          .valid("registered", "eligible", "not sure")
          .required(),
        floor: Joi.number().positive().allow(""),
      }),
    });

    return schema.validate({ ...item, propertyDesc }, { abortEarly: false });
  }

  // ================= submit =================

  async function submitForm(e) {
    e.preventDefault();

    const { error } = validateForm();

    if (error) {
      setErrorList(error.details);
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      // images
      images.forEach((img) => {
        formData.append("image", img);
      });

      // item fields
      Object.keys(item).forEach((key) => {
        formData.append(key, item[key]);
      });

      // propertyDesc
      Object.keys(propertyDesc).forEach((key) => {
        formData.append(`propertyDesc[${key}]`, propertyDesc[key]);
      });

      await axios.put(
        `https://zunis-node-js.vercel.app/product/update?productId=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Ahmed__${localStorage.getItem("user")}`,
          },
        },
      );

      navigate("/myad");
    } catch (err) {
      setError(err?.response?.data?.message || "Error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ================= render =================

  return (
    <>
      <Helmet>{language === "ع" ? "My zone - Sakan" : "مساحتي - سكن"}</Helmet>

      <div className="container py-5">
        <form onSubmit={submitForm} className="p-4">
          {/* Images */}
          <input type="file" multiple onChange={handleImageChange} />

          {/* Section */}
          <select
            name="section"
            value={item.section}
            onChange={handleItemChange}
          >
            <option value="">-- Process --</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>

          {/* Title */}
          <input
            type="text"
            name="title"
            value={item.title}
            onChange={handleItemChange}
          />
          <p>{letters}/55</p>

          {/* Price */}
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={handleItemChange}
          />

          {/* Caption */}
          <textarea
            name="caption"
            value={item.caption}
            onChange={handleItemChange}
          />

          {/* Location */}
          <input
            name="location"
            value={item.location}
            onChange={handleItemChange}
          />

          <input
            name="descLocation"
            value={item.descLocation}
            onChange={handleItemChange}
          />

          {/* Property size */}
          <input
            type="number"
            name="size"
            value={propertyDesc.size}
            onChange={handlePropertyChange}
          />

          {/* Payment */}
          <select
            name="PaymentMethod"
            value={item.PaymentMethod}
            onChange={handleItemChange}
          >
            <option value="">Select</option>
            <option value="cash">Cash</option>
            <option value="installments">Installments</option>
            <option value="both">Both</option>
          </select>

          <button type="submit">{isLoading ? "Loading..." : "Update"}</button>

          {error && <p className="text-danger">{error}</p>}

          {errorList.length > 0 && (
            <ul>
              {errorList.map((err, i) => (
                <li key={i}>{err.message}</li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </>
  );
}
