/* eslint-disable react/prop-types */
const EmptyPage =({ label }) => {
    return (
        <div className="mt-[8rem] text-center">
            <div className="max-w-full relative overflow-hidden flex-1 flex cursor-auto z-0 m-auto rounded-none w-[160px] h-[160px]" style={{ contentVisibility: 'auto' }}>
                <img 
                    className="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-500" 
                    src="https://firebasestorage.googleapis.com/v0/b/mongcaifood.appspot.com/o/no-products-found.png?alt=media&token=2f22ae28-6d48-49a7-a36b-e1a696618f9c"
                >
                </img>
            </div>
            <div className="mt-6 text-base">
                {label === "Tất cả" ? "Bạn chưa mua hàng." : `Bạn không có đơn hàng trong trạng thái "${label}"!!!`}
            </div>
        </div>
    );
};
export default EmptyPage;