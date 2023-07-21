import loadAnimation from "../assets/icons8-geometric-shape.gif";
function Loader() {
  return (
    <>
      <div className="container-lg">
        <div
          className="loader"
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: "1001",
          }}
        >
          <img
            src={loadAnimation}
            alt=""
            style={{
              width: "30px",
              height: "30px",
              aspectRatio: "1/1",
              marginBottom: "10px",
            }}
          />
          <p>Please wait...</p>
        </div>
      </div>
    </>
  );
}

export default Loader;
