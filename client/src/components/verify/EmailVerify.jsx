import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `https://laptech4k.onrender.com/api/v1/user/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <div>
      {validUrl ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Login
            </button>
          </Link>
        </div>
      ) : (
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>
          404 Not Found 11
        </h1>
      )}
    </div>
  );
};

export default EmailVerify;