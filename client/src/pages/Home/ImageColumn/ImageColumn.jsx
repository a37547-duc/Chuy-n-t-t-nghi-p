export default function ImageRow() {
  const imageUrls = [
    "https://lh3.googleusercontent.com/F9G66FwNb3MAkEWZg-V7a1zJgyE2LgpeCGg0w_yHtAjNgswed25mQ9Uwh20qUOoqsW4gPfCkzpFy6RBJQLg4lpndIaZPT0SI=w308-rw",
    "https://lh3.googleusercontent.com/wDoU6aMjIcL4zrLcJ1WiGFId5Cl4PCHV4CYw42Dit4DEyVgpGeEv0rVSZws55cEaiGmMnaQvb_7dCrYe4ZQTesBxBYbbFELt_g=w308-rw",
    "https://lh3.googleusercontent.com/TeQ7m8oukkfeKFo5xsuvxj2G0NOsv-GUvkOMMl50wAEsflAKILKAJIrvO7AAnfsAJaRgspCw3nD-E_4q-OQIIU5AThYfNkvXng=w308-rw",
    "https://lh3.googleusercontent.com/gbeCNxgM4xF216hCFQpRC94j3LIjW-ZwuftBU7AWOV1JpbiEbCQqsFlxBtDvf7an4pF_2pAaU8eGHfal5vYLZ1gEs6iJssm6=w308-rw",
  ];

  return (
    <div className="flex justify-between z-10 w-10/12 h-32 absolute bottom-0 left-1/2 transform translate-y-[50%] -translate-x-1/2">
      {imageUrls.map((url, index) => (
        <a
          key={index}
          href="#"
          className=" block w-full h-full transform transition-transform duration-300 ease-in-out hover:translate-y-[-4px] "
        >
          <img
            src={url}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-fill block"
          />
        </a>
      ))}
    </div>
  );
}
