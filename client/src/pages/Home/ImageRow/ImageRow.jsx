const ImageRow = () => {
  const imageUrls = [
    "https://lh3.googleusercontent.com/fkzJ0jxq-3RW3xfboqfIiQIc2D8Fz6pUOX1P8AkthdpajzRiUib6B_L9J-De1iIwqxavjFZUKZ1ZE31j0S5cMJb-RDW3N87ZJA=w300-rw",
    "https://lh3.googleusercontent.com/Byldzv3DplOggbZBi2rmvmDIK8RVakCYewiA_v8t0VKSUbwkTw4aE447TfXpfBXbQgQUTVnEcA9Eh_LfHLc11DR1KQqXxMrm=w300-rw",
  ];

  return (
    <div className=" w-[150px] h-full max-h-[376px] flex flex-col z-[9]">
      {imageUrls.map((url, index) => (
        <a
          key={index}
          href="#"
          className="h-1/2 overflow-hidden transition-transform duration-300 hover:-translate-y-2"
        >
          <img
            src={url}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-fill"
          />
        </a>
      ))}
    </div>
  );
};

export default ImageRow;
