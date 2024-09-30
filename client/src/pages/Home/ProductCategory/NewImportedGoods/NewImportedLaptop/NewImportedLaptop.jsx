import { PiCaretRight } from "react-icons/pi";
import NewImportedProducts from "../../../../../components/home/NewImportedProducts/NewImportedProducts";
const NewImportedLaptop =() => {
    const newGoods = [
        {id: "1", name: "1a", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "2", name: "2b", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "3", name: "3c", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "4", name: "4d", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "5", name: "5e", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "6", name: "6f", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "7", name: "7g", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "8", name: "8h", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "9", name: "9i", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "10", name: "10k", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "11", name: "11l", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "12", name: "12m", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "13", name: "13o", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "14", name: "14u", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
        {id: "15", name: "15p", image: "https://lh3.googleusercontent.com/Sg-70UCsdWJyjg_O3M7rmHilnS_c9V_Q8QZNV2y-JqgWRT5kPLRvIrwvVyYZD7BStievG3PuIncXaX67D5_b_Mtt_cxr_AGV=w230-rw", description: "Case Xigmatek Alphard M 3GF(3 FAN RGB) - EN44090", price: "839.000", oldPrice: "950.000", discount: "11.68", save: "111.000"},
    ];

    return (
        <div className="px-4 w-full mx-auto border-none opacity-100 max-w-[1100px] mb-6">
            <div className="relative min-h-[416px]">
                <img 
                    alt="Laptop" 
                    src="https://lh3.googleusercontent.com/YsnUSV-cp1QsV45kHixsKnXz6KH4fZVL3_VydiZS-xAUIWZsjnKStrfIZVzWS7m3-6kwTfIgugbETtsfIsFQVprA4lkb7dI=w123"
                    className="w-full h-full absolute top-0"
                >
                </img>
                <div className="relative flex justify-between items-center px-4 h-14 bg-transparent border-b border-white/50">
                    <a href="#" className="no-underline text-inherit cursor-pointer">
                        <div className="uppercase px-2 m-0 p-0 border-none opacity-100 text-white font-bold no-underline text-[20px] leading-7 overflow-hidden transition-colors duration-300">
                            laptop mới nhập
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
export default NewImportedLaptop;