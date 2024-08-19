export default function ImageRow() {
  const imageUrls = [
      "https://lh3.googleusercontent.com/F9G66FwNb3MAkEWZg-V7a1zJgyE2LgpeCGg0w_yHtAjNgswed25mQ9Uwh20qUOoqsW4gPfCkzpFy6RBJQLg4lpndIaZPT0SI=w308-rw",
      "https://lh3.googleusercontent.com/wDoU6aMjIcL4zrLcJ1WiGFId5Cl4PCHV4CYw42Dit4DEyVgpGeEv0rVSZws55cEaiGmMnaQvb_7dCrYe4ZQTesBxBYbbFELt_g=w308-rw",
      "https://lh3.googleusercontent.com/TeQ7m8oukkfeKFo5xsuvxj2G0NOsv-GUvkOMMl50wAEsflAKILKAJIrvO7AAnfsAJaRgspCw3nD-E_4q-OQIIU5AThYfNkvXng=w308-rw",
      "https://lh3.googleusercontent.com/gbeCNxgM4xF216hCFQpRC94j3LIjW-ZwuftBU7AWOV1JpbiEbCQqsFlxBtDvf7an4pF_2pAaU8eGHfal5vYLZ1gEs6iJssm6=w308-rw"
  ];

  return (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%', zIndex: '10', position: 'relative' }}>
          {imageUrls.map((url, index) => (
              <a
                  key={index}
                  href="#"
                  style={{
                      display: 'block',
                      width: '25%',
                      height: '100%',
                      padding: '0px 8px',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      textDecoration: 'none'
                  }}
                  className="hover:translate-y-[-2px]"
              >
                  <img
                      src={url}
                      alt={`Image ${index + 1}`}
                      style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          display: 'block'
                      }}
                  />
              </a>
          ))}
      </div>
  );
}
