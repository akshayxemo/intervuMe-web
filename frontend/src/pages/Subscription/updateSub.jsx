import Loader from "../../components/loader";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateSub() {
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
    const product = urlParams.get("product");

    axios
      .post(
        import.meta.env.VITE_API_URL + "/confirm-subscription",
        { sessionId: sessionId, product: product },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          setTimeout(() => {
            navigate("/subscription/success", { replace: true });
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Loader />
    </>
  );
}
