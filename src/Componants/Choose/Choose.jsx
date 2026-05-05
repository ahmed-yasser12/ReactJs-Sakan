import React, { useContext } from 'react'
import choose1 from "../../assets/images/choose1.png"
import choose2 from "../../assets/images/choose2.png"
import choose3 from "../../assets/images/choose3.png"
import style from "./Choose.module.css"
import { FilterProducts } from './../../Context/FilterProducts';

function Choose() {

  const { language } = useContext(FilterProducts);

  const data = [
    {
      id: "01",
      img: choose1,
      titleEn: "Find your dream property",
      titleAr: "اوجد عقار احلامك",
      descEn: "We have many beautiful properties",
      descAr: "نحن نملك الكثير من العقارات الجميلة"
    },
    {
      id: "02",
      img: choose2,
      titleEn: "Buy or Rent Properties",
      titleAr: "شراء و ايجار العقارات"
    },
    {
      id: "03",
      img: choose3,
      titleEn: "List your own Property",
      titleAr: "اعرض عقارك"
    }
  ];

  return (
    <div className="p-5">
      <div className="container my-2">

        {/* Header */}
        <div className="d-flex mb-5 align-items-center justify-content-between">
          <h3>
            {language === 'ع' ? "Why Choose Us?" : "لماذا تقوم باختيارنا؟"}
          </h3>

          <h5>
            {language === 'ع' ? "I hope you love us" : "انا امل ان تحبنا"}
          </h5>
        </div>

        {/* Cards */}
        <div className="row gy-4">
          {data.map((item) => (
            <div key={item.id} className="col-md-4">

              <div className={`bg-light ${style.box}`}>
                <h2 className="h1 fw-bold text-secondary">{item.id}</h2>

                <div className="text-center p-4">
                  <img
                    src={item.img}
                    className={`${style.chooseImage} mb-4`}
                    alt={item.titleEn}
                  />

                  <h4>
                    {language === 'ع' ? item.titleEn : item.titleAr}
                  </h4>

                  {item.descEn && (
                    <p className="text-muted my-3">
                      {language === 'ع' ? item.descEn : item.descAr}
                    </p>
                  )}

                  <button className="border-0 text-dark p-2 fw-bold bg-secondary bg-opacity-25">
                    {language === 'ع' ? "Learn More" : "رؤية المزيد"}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Choose;