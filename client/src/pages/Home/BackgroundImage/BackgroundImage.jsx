
import { useEffect, useState } from "react";
import "./BackgroundImage.css";

const images = [
  "https://lh3.googleusercontent.com/QuaaPrsWmy9zi79LdQirmo6dRjTCRAdTPZljTOPPJkyLbItA9TyvMzizhv7Z_0wy9w46wK07v2rRTvd3l4n1eWcv7A4Q3U0L=w1920-rw",
  "https://lh3.googleusercontent.com/ydH0B2Q35v_F-DYq5O9pmf_6k-CGSpRhab4F_3Gizw7TMIu7hZb3KQkJSAjOSwCSHTTfgYB_q4mX4ggoFsjkRrAYzD5r4Bnv0Q=w1920-rw",
  "https://lh3.googleusercontent.com/ourQbUh5x_qOtLqkqURngvERqVSP9BdSf84gDkdvomg11oZ0QZKBh_uwPeBEOwRkwzxoB9CcH-AwLoN6HZammrdXii52xXxFow=w1920-rw",
  "https://lh3.googleusercontent.com/vVHMfr4FsOlgWYvJhRDO2v2Qd7lFD2OpT6UCK6ft2W11-dEmNiwlbWAJ3VZK3qYi50fG9jtAl1T5CU1BmMXmOeINPxNiA3QwOQ=w1920-rw"
];

const BackgroundImage = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        const currentIndex = images.indexOf(prev);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${currentImage})` }}
    ></div>
  );
};

export default BackgroundImage;
