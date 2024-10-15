import { PiCaretRight } from "react-icons/pi";
import NewImportedProducts from "../../../../../components/home/NewImportedProducts/NewImportedProducts";
const NewImportedPC =() => {
    const newGoods = [
        {id: "1", name: "15a", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "2", name: "14b", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "3", name: "13c", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "4", name: "12d", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "5", name: "11e", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "6", name: "10f", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "7", name: "9g", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "8", name: "8h", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "9", name: "7i", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "10", name: "6k", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "11", name: "5l", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "12", name: "4m", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "13", name: "3o", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "14", name: "2u", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "15", name: "1p", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
    ];

    return (
        <div className="px-4 w-full mx-auto border-none opacity-100 max-w-[1100px] mb-6">
            <div className="relative min-h-[416px] bg-blue-900">
                {/* <img 
                    alt="PC" 
                    src="https://lh3.googleusercontent.com/4SKGr28Mu5AYV1d3TBjXTQfOwWcsfMC6wedwGQSqMmWtHa_kqNlSOZuMiTd_chSMJmWfEu_ktJzsP4vuuy5O5uh6898jMnD9=w1232"
                    className="w-full h-full absolute top-0"
                >
                </img> */}
                <div className="relative flex justify-between items-center px-4 h-14 bg-transparent border-b border-white/50">
                    <a href="#" className="no-underline text-inherit cursor-pointer">
                        <div className="uppercase px-2 m-0 p-0 border-none opacity-100 text-white font-bold no-underline text-[20px] leading-7 overflow-hidden transition-colors duration-300">
                            pc mới nhập
                        </div>
                    </a>
                    <a href="#" className="no-underline text-inherit cursor-pointer">
                        <div className="cursor-pointer text-white box-border flex items-center text-[14px]">
                            Xem tất cả
                            <PiCaretRight className="w-[1em] h-[1em]" />
                        </div>
                    </a>
                </div>
                <NewImportedProducts data={newGoods} />
            </div>
        </div>
    );
}
export default NewImportedPC;