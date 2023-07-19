// import loadAnimation from "../assets/lotus-circle.gif";
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
            position: "relative",
            zIndex: "1000",
          }}
        >
          <img
            // src={loadAnimation}
            alt=""
            style={{
              width: "90px",
              height: "90px",
              aspectRatio: "1/1",
            }}
          />
          <p>Please wait...</p>
        </div>
      </div>
    </>
  );
}

export default Loader;
