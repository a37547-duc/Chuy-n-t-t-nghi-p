
const ImageRow = () => {
  const imageUrls = [
    "https://lh3.googleusercontent.com/fkzJ0jxq-3RW3xfboqfIiQIc2D8Fz6pUOX1P8AkthdpajzRiUib6B_L9J-De1iIwqxavjFZUKZ1ZE31j0S5cMJb-RDW3N87ZJA=w300-rw",
    "https://lh3.googleusercontent.com/Byldzv3DplOggbZBi2rmvmDIK8RVakCYewiA_v8t0VKSUbwkTw4aE447TfXpfBXbQgQUTVnEcA9Eh_LfHLc11DR1KQqXxMrm=w300-rw"
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', zIndex: '9', position: 'relative' }}>
      {imageUrls.map((url, index) => (
        <a
          key={index}
          href="#" // Thay thế bằng đường dẫn đến trang mà bạn muốn liên kết
          style={{
            width: '100%',
            height: '40%',
            marginBottom: index === 0 ? '22px' : '0',
            marginTop: index === 0 ? '22px' : '0',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease'
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
};

export default ImageRow;
