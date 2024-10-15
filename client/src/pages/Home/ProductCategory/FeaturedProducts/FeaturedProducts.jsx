import { useState, useRef  } from "react";
import ReactPaginate from "react-paginate";

import { PiCaretRight } from "react-icons/pi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const FeaturedProducts =() => {
    const [page, setPage] = useState(0);
    const [productsPerPage] = useState(10);

    const newGoods=[
        {id: "1", name: "Lenovo1", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "2", name: "Lenovo2", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "3", name: "Lenovo3", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "4", name: "Lenovo4", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "5", name: "Lenovo5", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "6", name: "Lenovo6", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "7", name: "Lenovo7", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "8", name: "Lenovo8", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "9", name: "Lenovo9", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "10", name: "Lenovo10", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "11", name: "Lenovo11", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "12", name: "Lenovo12", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "13", name: "Lenovo13", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "14", name: "Lenovo14", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "15", name: "Lenovo15", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "16", name: "Lenovo16", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "17", name: "Lenovo17", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "18", name: "Lenovo18", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "19", name: "Lenovo19", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "20", name: "Lenovo20", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "21", name: "Lenovo21", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "22", name: "Lenovo22", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "23", name: "Lenovo23", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "24", name: "Lenovo24", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "25", name: "Lenovo25", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "26", name: "Lenovo26", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "27", name: "Lenovo27", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "28", name: "Lenovo28", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "29", name: "Lenovo29", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "30", name: "Lenovo30", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "31", name: "Lenovo31", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "32", name: "Lenovo32", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
        {id: "33", name: "Lenovo33", image: "https://lh3.googleusercontent.com/8ttuQnKtU6_t5GiYhsPjTrXfwHoDR3d9ioCj3hLJ1jevt8FycbP7zv2-7p4EBx7zK-gCHGTMMOTO6kjo91_TOskN9Y8ZSKhrtQ=w230-rw", description: "Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)", price: "24.900.000", oldPrice: "29.000.000", discount: "10.21", save: "2.500.000"},
    ];

    const totalProducts = newGoods.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const highlightRef = useRef(null);

    const handlePageClick = (data) => {
        setPage(data.selected);
        // Cuộn lên phần tử "Sản phẩm nổi bật"
        highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const indexOfLastProduct = (page + 1) * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = newGoods.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="px-4 w-full mx-auto border-none opacity-100 max-w-[1100px] mb-6">
            <div className="rounded-md bg-white">
                <div className="relative flex justify-between items-center px-4 h-14 bg-transparent">
                    <a ref={highlightRef} href="#" className="scroll-mt-[100px] no-underline text-inherit cursor-pointer">
                        <div className="m-0 p-0 border-none opacity-100 text-[#1b1d29] font-bold no-underline text-[20px] leading-7 overflow-hidden transition-colors duration-300">
                            Sản phẩm nổi bật
                        </div>
                    </a>
                    <a href="#" className="no-underline text-inherit cursor-pointer">
                        <div className="cursor-pointer box-border flex items-center text-[14px] text-[#82869e]">
                            Xem tất cả
                            <PiCaretRight className="w-[1em] h-[1em]" />
                        </div>
                    </a>
                </div>
                <div className="flex flex-wrap gap-x-[2px] content-start bg-[#f6f6f6] p-[2px_0]">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="bg-white mb-[2px] w-[calc(20%-1.7px)]">
                            <div className="relative w-full h-full p-4 flex flex-col bg-white justify-between">
                                <a className="no-underline text-transparent cursor-pointer block">
                                    <div className="relative mb-2">
                                        <div className="relative mb-1">
                                            <div className="relative pb-[100%]">
                                                <div className="inline-block overflow-hidden h-full w-full transition-transform duration-300 absolute inset-0 object-contain">
                                                    <img 
                                                        className="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                                                        loading="lazy"
                                                        decoding="async"
                                                        alt={product.name}
                                                        src={product.image}
                                                    >
                                                    </img>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-0">
                                                <div 
                                                    className="h-9 leading-3 flex flex-col justify-center 
                                                                bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA5NiA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIiAvPgogIDxtYXNrIGlkPSJtYXNrMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9Ijk2IiBoZWlnaHQ9IjQwIj4KICAgIDxyZWN0IHdpZHRoPSI5NiIgaGVpZ2h0PSI0MCIgcng9IjQiIGZpbGw9IndoaXRlIiAvPgogIDwvbWFzaz4KICA8ZyBtYXNrPSJ1cmwoI21hc2swKSI+CiAgICA8cGF0aCBvcGFjaXR5PSIwLjMiCiAgICAgIGQ9Ik07NC4yNDQ2IC05LjAyODY5TDY1Ljg3NjcgOC45MTYyMUw3MC43NzA4IDExLjE5ODNMNjMuOTI0NCAyNS44ODA1TDg0LjQ3MjQgMTEuNjI5M0w3Ny45NDcgOC41ODY0Mkw5MC41NTgxIC0xLjQyMTU2TDc0LjI0NDYgLTkuMDI4NjlaIgogICAgICBmaWxsPSIjMUIxRDI5IiAvPgogIDwvZz4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjM1LjcyMDkiIHkxPSIxLjY2NTQ0ZS0wNiIgeDI9IjU3Ljg4ODYiIHkyPSI0MC4wODczIgogICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNBQTIwRkYiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQxM0VGRiIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgo8L3N2Zz4=')] 
                                                                bg-cover bg-no-repeat p-1 px-2 rounded-sm"
                                                >
                                                    <div className="text-[10px] font-bold text-[#FFD591] uppercase">
                                                        tiết kiệm
                                                    </div>
                                                    <div className="text-[13px] leading-[18px] font-bold text-white">
                                                        {product.save} đ
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-1">
                                            <div className="uppercase inline m-0 p-0 border-none opacity-100 text-[#82869e] font-medium no-underline text-[13px] leading-[20px] overflow-hidden line-clamp-1 transition-colors duration-300">
                                                {product.name}
                                            </div>
                                        </div>
                                        <div className="h-12">
                                            <div className="m-0 p-0 border-none border-[1px] border-transparent opacity-100 text-[rgb(67,70,87)] font-normal no-underline text-[12px] leading-[16px] overflow-hidden max-w-none min-w-0 transition-colors duration-300 line-clamp-3">
                                                <h3 title="Laptop gaming Lenovo LOQ 15IAX9 - 83GS004BVN (i5-12450HX/RAM 12GB/GeForce RTX 3050/512GB SSD/ Windows 11)" className="text-[0.75rem] font-normal leading-[1rem] inline">
                                                    {product.description}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="relative mt-1 mb-1 pr-0">
                                            <div className="flex flex-col items-start h-10">
                                                <div className="m-0 p-0 border-none border-[1px] border-transparent opacity-100 text-[rgb(20,53,195)] font-bold no-underline text-[15px] leading-[24px] overflow-hidden max-w-none min-w-0 transition-colors duration-300">
                                                    {product.price} đ
                                                </div>
                                                <div className="flex h-4">
                                                    <div className="m-0 mb-0 mr-1 p-0 border-none border-[1px] border-transparent opacity-100 text-[rgb(130,134,158)] font-normal text-[12px] leading-[16px] overflow-hidden max-w-none min-w-0 transition-colors duration-300 line-through">
                                                        {product.oldPrice} đ
                                                    </div>
                                                    <div className="m-0 p-0 border-none border-[1px] border-transparent opacity-100 text-[rgb(20,53,195)] font-normal no-underline text-[12px] leading-[16px] overflow-hidden max-w-none min-w-0 transition-colors duration-300">
                                                        -{product.discount}%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <button 
                                    type="button" 
                                    className="opacity-100 h-8 p-0 rounded-md bg-white border border-[rgb(20,53,195)] relative flex items-center justify-center outline-none min-w-[2rem] text-[rgb(20,53,195)] w-full cursor-pointer transition-colors duration-80"
                                >
                                    <div className="m-0 p-0 border-none border-[1px] border-transparent opacity-100 text-[rgb(20,53,195)] font-medium no-underline text-[13px] leading-[20px] overflow-hidden max-w-none min-w-0 transition-colors duration-300">
                                        Thêm vào giỏ
                                    </div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="border-none border border-transparent opacity-100 mt-4">
                <div className="border-0 border-opacity-100 w-full text-center">
                    <div className="inline-flex">
                        <ReactPaginate
                        previousLabel={<FontAwesomeIcon icon={faChevronLeft} size="xs" />}
                        nextLabel={<FontAwesomeIcon icon={faChevronRight} size="xs" />}
                        pageCount={totalPages}
                        onPageChange={handlePageClick}
                        containerClassName={"flex items-center space-x-2"}
                        previousLinkClassName={"w-8 h-8 flex items-center justify-center bg-white border rounded shadow hover:bg-gray-100"}
                        nextLinkClassName={"w-8 h-8 flex items-center justify-center bg-white border rounded shadow hover:bg-gray-100"}
                        disabledClassName={"text-blue-500"}
                        activeLinkClassName={"bg-blue-500 text-white rounded w-8 h-8 flex items-center justify-center hover:bg-blue-600"}
                        pageClassName={"w-8 h-8 flex items-center justify-center bg-white border rounded shadow hover:bg-gray-100"}
                        pageLinkClassName={"w-full h-full flex items-center justify-center focus:outline-none"}
                        breakLabel={"..."}
                        breakClassName={"w-8 h-8 flex items-center justify-center text-gray-500"} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FeaturedProducts;