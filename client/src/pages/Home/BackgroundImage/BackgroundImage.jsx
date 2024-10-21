import { useEffect, useState } from "react";

const images = [
  "https://lh3.googleusercontent.com/QuaaPrsWmy9zi79LdQirmo6dRjTCRAdTPZljTOPPJkyLbItA9TyvMzizhv7Z_0wy9w46wK07v2rRTvd3l4n1eWcv7A4Q3U0L=w1920-rw",
  "https://lh3.googleusercontent.com/ydH0B2Q35v_F-DYq5O9pmf_6k-CGSpRhab4F_3Gizw7TMIu7hZb3KQkJSAjOSwCSHTTfgYB_q4mX4ggoFsjkRrAYzD5r4Bnv0Q=w1920-rw",
  "https://lh3.googleusercontent.com/vVHMfr4FsOlgWYvJhRDO2v2Qd7lFD2OpT6UCK6ft2W11-dEmNiwlbWAJ3VZK3qYi50fG9jtAl1T5CU1BmMXmOeINPxNiA3QwOQ=w1920-rw",
  "https://lh3.googleusercontent.com/QOuVJEJ6LNpcg4GB_46SwjOeqs1qxtOZSIm33sN9QnM2pISQQb1pmq07RlS3OMxzfMa2wS2jqPCHIP6A4yMYZIVZ84OJqtwJ=w1920-rw",
  "https://lh3.googleusercontent.com/fpSVGxff7Q5Yie3VyKKGgziIPEygKMgcxyk4gS7LooGVFpWBCRP3QXmcGzBuB1VdtFgOkrigHuSQbdxh3gZEwTq5zXTy9aku=w1920-rw",
  "https://lh3.googleusercontent.com/YbhGYSototUczOjNKRoUAtkSX2J0K42ajvMI6nk0es3eSw4HsO0Me9dRFDQxEwVWZ8-LETJQdYNNnllgh92krMqY-P5I1j3a=w1920-rw"
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
      className="absolute w-full h-[70vh] sm:h-[50vh] md:h-[45vh] lg:h-[35vh] xl:h-[70vh] bg-cover bg-center transition-all duration-500 ease-in-out object-cover"
      style={{ backgroundImage: `url(${currentImage})` }}
    ></div>
  );
};

export default BackgroundImage;