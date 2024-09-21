const ImageRow = () => {
  const imageUrls = [
    "https://lh3.googleusercontent.com/fkzJ0jxq-3RW3xfboqfIiQIc2D8Fz6pUOX1P8AkthdpajzRiUib6B_L9J-De1iIwqxavjFZUKZ1ZE31j0S5cMJb-RDW3N87ZJA=w300-rw",
    "https://lh3.googleusercontent.com/Byldzv3DplOggbZBi2rmvmDIK8RVakCYewiA_v8t0VKSUbwkTw4aE447TfXpfBXbQgQUTVnEcA9Eh_LfHLc11DR1KQqXxMrm=w300-rw"
  ];

  return (
    <div className="flex flex-col h-full relative" style={{zIndex:9}}>
      {imageUrls.map((url, index) => (
        <a className="w-full h-2/5 first:mb-[22px] mb-0 first:mt-[22px] mt-0 relative overflow-hidden transition-transform duration-300 ease-linear hover:translate-y-[-2px]"
          key={index}
          href="#"
        >
          <img className="block w-full h-full object-contain"
            src={url}
            alt={`Image ${index + 1}`}
          />
        </a>
      ))}
    </div>
  );
};

export default ImageRow;