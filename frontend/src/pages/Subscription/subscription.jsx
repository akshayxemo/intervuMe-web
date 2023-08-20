// import { MdCheck, MdClose } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Navbar from "../../layouts/Navbar/navbar";
import "./subscription.css";
import Footer from "../../layouts/Footer/footer";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function Subscription() {
  // const navigate = useNavigate();
  const [subStatus, setSubStatus] = useState();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setSubStatus(localStorage.getItem("role"));
    axios
      .get(import.meta.env.VITE_API_URL + "/plans", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.products.data);
        setProducts(response.data.products.data);
        setSubStatus(response.data.subsStatus);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handlePayment = async (e) => {
    const Product = {
      productId: e.target.value,
      productName: e.target.name,
    };
    try {
      const pay = await axios.post(
        import.meta.env.VITE_API_URL + "/subscription",
        Product,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(pay.data.url);
      window.location.replace(pay.data.url);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(subStatus);
  return (
    <>
      <div className="container-lg-no-pd flexfit">
        <div className="container-lg">
          <Navbar />
          <div className="container-1280-width ">
            <div className="subscription-sec">
              <h1 className="subscription-sec-heading text-center">
                Subscribe to Get Extra Benifits
              </h1>
              <div className="subscriptions">
                {products.map((item) => {
                  return (
                    <>
                      <div className="subscription-card bg-white">
                        <div className="product-view">
                          <img
                            src={item.images}
                            alt=""
                            className="product-img"
                          />
                          <h1 className="subs-heading">{item.name}</h1>
                          <p className="subs-desc">{item.description}</p>
                          {item.name == subStatus ? (
                            <span className="active-sub-label bg-yellow">
                              {" "}
                              Active{" "}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="product-price">
                          <h1 className="price">
                            &#8377; {item.metadata.price}
                          </h1>
                          <p className="duration">
                            Per
                            <br /> month
                          </p>
                        </div>
                        {item.name === "Free" ? (
                          ""
                        ) : (
                          <button
                            className="btn-full btn-blue"
                            name={item.name}
                            value={item.default_price}
                            onClick={handlePayment}
                          >
                            subscribe
                          </button>
                        )}
                        <div className="plan-details">
                          {item.metadata.features.split(",").map((list) => {
                            return (
                              <>
                                <p className="plan-item">
                                  <BsFillCheckCircleFill className="color-green" />
                                  &nbsp;
                                  <p>{list}</p>
                                </p>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  );
                })}

                {/* <div className="subscription-card bg-gray color-white">
                <h1 className="subs-heading">{"Pro"}</h1>
                <div className="plan-details">
                  <p className="plan-item color-white">
                    <MdCheck className="color-green" /> &nbsp; 1:1 video call (4
                    per month)
                  </p>
                  <p className="plan-item color-white">
                    <MdCheck className="color-green" /> &nbsp; Get Performance
                    result
                  </p>
                  <p className="plan-item color-white">
                    <MdCheck className="color-green" /> &nbsp; Chat with mentor
                  </p>
                  <p className="plan-item color-white">
                    <MdCheck className="color-green" /> &nbsp; Unlimited Mock
                    test
                  </p>
                </div>
                <button className="btn-full btn-green">
                  &#8377; 2599 / month
                </button>
              </div> */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
