import { useState, useEffect } from 'react';
import ProductListSideBar from '../ProductListSideBar/ProductListSideBar';
import GeneralProductUp from "../../../components/product/GeneralProductUp/GeneralProductUp";
import GeneralProductMiddle from "../../../components/product/GeneralProductMiddle/GeneralProductMiddle";
import GeneralProductDown from "../../../components/product/GeneralProductDown/GeneralProductDown";

import { useDispatch, useSelector } from "react-redux";
import { getAllProductsClient } from "../../../features/Client/ClientProductSlice";
import { useGetAllProductsQuery } from "../../../features/Client/ClientProductQuery";

import { useParams } from "react-router-dom";

const ProductList =() => {
  const ImageLogo = [
    "https://lh3.googleusercontent.com/IAlZ9kiZsV1CRAQtQezaD4aEXZAZiC6-H9lQ2LxG8FB5TcIWtIkJ41w7ushFEMaaPIHFHUOh5H7he4iYW-D3sSquf-bMpH5d=rw",
    "https://lh3.googleusercontent.com/hqBTHqQRBdv5P7EuiclPKzZZisus_wC-QZ_pq9ZRg5I4sa028thCSEwzY0yft-Gb2wyZNHZgEpo24uks-9qL12qQ9Yvy_Fcz=rw",
    "https://lh3.googleusercontent.com/ZllML-pVmNz1U_TUZpG0M9HKD00dK1F-gaXca-e4pz03kLaqg6uptT7jsdOLeRv0jpt59GdNLDTXpBMvtclSTv39VxVDhyo6=rw",
    "https://lh3.googleusercontent.com/dupfTD9OKdjV88iSqg7DQcbBMxVAB9_bo1QSmp0-me7EKKTOTRyP25AA0WpZG_pvJmfrkfrEI_D0yT5G5bR2LTT6WpESH-df=rw",
    "https://lh3.googleusercontent.com/JEBFMd8rzkf5IeYcHF0MIcwh5u7nqYgssfwjQIiQU3XF-CfPtyttOCdiITFQjkRxx83DS-zV4XgLYhRgkt3KOGG0l59s0h3J=rw",
    "https://lh3.googleusercontent.com/XtEg0_UNPgEzRD7xMCHTP7BUFeWwocIiXfPgfeB_zyvQuLR_P_CkirP15THl-MBlGTdvsXvvAKG2y_wxnzTuSPonKIvRXp_Gjw=rw",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Huawei.png",
    "https://lh3.googleusercontent.com/EdOdJmMDlce2gVvwkHtEEUakWzYnFHyLHc8dlt61LF_fUX1JSZOAVzWU8hM7NVMKbSm2T9Kb0Mbk1Fexk9IYfSHEUC_Hywx-=rw",
    "https://lh3.googleusercontent.com/ExeRhWXn9UnSUjFCmmVk6Px_6QPuEH9tbGiikbm_8-mXG3izok5xNos2z7vZG0yWVvqUK0sauE3QnmKeByChDdmb6GIyzWdi=rw",
    "https://lh3.googleusercontent.com/-EwohKCaauth-ZdhZWayZIKrJLQfIOWQWpEuGW_xzXF2YHZm5Dz2tD3b7iD4_IHugt86lQQ5SRUrH8iFurxDoEMvmNdNeFQ=rw",
  ];

  const ChooseDemand = [
    {name:"Laptop AI", image:"https://lh3.googleusercontent.com/qB66Bo3zMseXCcuk_VTXoLuj4J7a-hBm5G0sa5cgHWnsPb3SnZdNxadBlQhHum8fl9fFHh82BDbh6yt254908rZr30Metr1t=rw"},
    {name:"Gaming", image:"https://lh3.googleusercontent.com/L-jooqf9yBzm9nvHyjeG8EQH_XDHVh7-OITwBZs885bXWT4UAyX_CPdsOCkFw6Z9klaALRZQiuWwcBwrVO_AI4iKM_b3BQECdQ=rw"},
    {name:"Văn Phòng", image:"https://lh3.googleusercontent.com/wslsWeRWvO1GLk6Dhd5kJqkihAPDSO2VrV8NfKWyUbTMXQyxREgvOsXpH8c1ZjzNH3oV54diVXk6_GVXCe4Z95ki1zRA1rEu=rw"},
    {name:"Sinh viên", image:"https://lh3.googleusercontent.com/rKgLP16Si8TpmMie9Nr4pZAX11NgPCJGYWYKpuzd6jga5QMesCZPz4PSSdMNY0b6_lCPdk38o6PCF6k1Wx_Tbh46vUfe8nIJ2g=rw"},
    {name:"Đồ họa", image:"https://lh3.googleusercontent.com/XM6bC8VWRq1Q-6KwLQvZo2W128LPPnPjOHzZ9ohIoB9XnB-Eb1Zf7FSFvq-AwIu6Km4vGyX89DW2xCmIt_SDGq_-3lJbbyGt=rw"},
  ];

  const newGoods = [
    {id: "1", name: "1a", image: "https://lh3.googleusercontent.com/rhnInoJwklOz1V-J-K2BpXNM9P6rK6uR6SBiRVhmXneypI8Bm7E0RIyxgEYhhrcBS3de3OSLnwzzFa1q_2V33WsGqQjgbdge=w230-rw", description: "Laptop ASUS ROG Zephyrus G16 GA605WI 2024 (Ryzen AI 9 HX 370/RAM 32GB/GeForce RTX 4070/1TB SSD/ Windows 11 + Office)", price: "77.900.000", oldPrice: "91.980.000", discount: "11.68", save: "4.000.000"},
    {id: "2", name: "2b", image: "https://lh3.googleusercontent.com/rhnInoJwklOz1V-J-K2BpXNM9P6rK6uR6SBiRVhmXneypI8Bm7E0RIyxgEYhhrcBS3de3OSLnwzzFa1q_2V33WsGqQjgbdge=w230-rw", description: "Laptop ASUS ROG Zephyrus G16 GA605WI 2024 (Ryzen AI 9 HX 370/RAM 32GB/GeForce RTX 4070/1TB SSD/ Windows 11 + Office)", price: "77.900.000", oldPrice: "91.980.000", discount: "11.68", save: "4.000.000"},
    {id: "3", name: "3c", image: "https://lh3.googleusercontent.com/rhnInoJwklOz1V-J-K2BpXNM9P6rK6uR6SBiRVhmXneypI8Bm7E0RIyxgEYhhrcBS3de3OSLnwzzFa1q_2V33WsGqQjgbdge=w230-rw", description: "Laptop ASUS ROG Zephyrus G16 GA605WI 2024 (Ryzen AI 9 HX 370/RAM 32GB/GeForce RTX 4070/1TB SSD/ Windows 11 + Office)", price: "77.900.000", oldPrice: "91.980.000", discount: "11.68", save: "4.000.000"},
    {id: "4", name: "4d", image: "https://lh3.googleusercontent.com/rhnInoJwklOz1V-J-K2BpXNM9P6rK6uR6SBiRVhmXneypI8Bm7E0RIyxgEYhhrcBS3de3OSLnwzzFa1q_2V33WsGqQjgbdge=w230-rw", description: "Laptop ASUS ROG Zephyrus G16 GA605WI 2024 (Ryzen AI 9 HX 370/RAM 32GB/GeForce RTX 4070/1TB SSD/ Windows 11 + Office)", price: "77.900.000", oldPrice: "91.980.000", discount: "11.68", save: "4.000.000"},
    {id: "5", name: "5e", image: "https://lh3.googleusercontent.com/rhnInoJwklOz1V-J-K2BpXNM9P6rK6uR6SBiRVhmXneypI8Bm7E0RIyxgEYhhrcBS3de3OSLnwzzFa1q_2V33WsGqQjgbdge=w230-rw", description: "Laptop ASUS ROG Zephyrus G16 GA605WI 2024 (Ryzen AI 9 HX 370/RAM 32GB/GeForce RTX 4070/1TB SSD/ Windows 11 + Office)", price: "77.900.000", oldPrice: "91.980.000", discount: "11.68", save: "4.000.000"},
    {id: "6", name: "6f", image: "https://lh3.googleusercontent.com/rhnInoJwklOz1V-J-K2BpXNM9P6rK6uR6SBiRVhmXneypI8Bm7E0RIyxgEYhhrcBS3de3OSLnwzzFa1q_2V33WsGqQjgbdge=w230-rw", description: "Laptop ASUS ROG Zephyrus G16 GA605WI 2024 (Ryzen AI 9 HX 370/RAM 32GB/GeForce RTX 4070/1TB SSD/ Windows 11 + Office)", price: "77.900.000", oldPrice: "91.980.000", discount: "11.68", save: "4.000.000"},
    {id: "7", name: "7g", image: "https://lh3.googleusercontent.com/rhnInoJwklOz1V-J-K2BpXNM9P6rK6uR6SBiRVhmXneypI8Bm7E0RIyxgEYhhrcBS3de3OSLnwzzFa1q_2V33WsGqQjgbdge=w230-rw", description: "Laptop ASUS ROG Zephyrus G16 GA605WI 2024 (Ryzen AI 9 HX 370/RAM 32GB/GeForce RTX 4070/1TB SSD/ Windows 11 + Office)", price: "77.900.000", oldPrice: "91.980.000", discount: "11.68", save: "4.000.000"},
    {id: "8", name: "8h", image: "https://lh3.googleusercontent.com/rhnInoJwklOz1V-J-K2BpXNM9P6rK6uR6SBiRVhmXneypI8Bm7E0RIyxgEYhhrcBS3de3OSLnwzzFa1q_2V33WsGqQjgbdge=w230-rw", description: "Laptop ASUS ROG Zephyrus G16 GA605WI 2024 (Ryzen AI 9 HX 370/RAM 32GB/GeForce RTX 4070/1TB SSD/ Windows 11 + Office)", price: "77.900.000", oldPrice: "91.980.000", discount: "11.68", save: "4.000.000"},
    {id: "9", name: "9i", image: "https://lh3.googleusercontent.com/rhnInoJwklOz1V-J-K2BpXNM9P6rK6uR6SBiRVhmXneypI8Bm7E0RIyxgEYhhrcBS3de3OSLnwzzFa1q_2V33WsGqQjgbdge=w230-rw", description: "Laptop ASUS ROG Zephyrus G16 GA605WI 2024 (Ryzen AI 9 HX 370/RAM 32GB/GeForce RTX 4070/1TB SSD/ Windows 11 + Office)", price: "77.900.000", oldPrice: "91.980.000", discount: "11.68", save: "4.000.000"},
    {id: "10", name: "10k", image: "https://lh3.googleusercontent.com/rhnInoJwklOz1V-J-K2BpXNM9P6rK6uR6SBiRVhmXneypI8Bm7E0RIyxgEYhhrcBS3de3OSLnwzzFa1q_2V33WsGqQjgbdge=w230-rw", description: "Laptop ASUS ROG Zephyrus G16 GA605WI 2024 (Ryzen AI 9 HX 370/RAM 32GB/GeForce RTX 4070/1TB SSD/ Windows 11 + Office)", price: "77.900.000", oldPrice: "91.980.000", discount: "11.68", save: "4.000.000"},
    {id: "11", name: "11l", image: "https://lh3.googleusercontent.com/rhnInoJwklOz1V-J-K2BpXNM9P6rK6uR6SBiRVhmXneypI8Bm7E0RIyxgEYhhrcBS3de3OSLnwzzFa1q_2V33WsGqQjgbdge=w230-rw", description: "Laptop ASUS ROG Zephyrus G16 GA605WI 2024 (Ryzen AI 9 HX 370/RAM 32GB/GeForce RTX 4070/1TB SSD/ Windows 11 + Office)", price: "77.900.000", oldPrice: "91.980.000", discount: "11.68", save: "4.000.000"},
    {id: "12", name: "12m", image: "https://lh3.googleusercontent.com/rhnInoJwklOz1V-J-K2BpXNM9P6rK6uR6SBiRVhmXneypI8Bm7E0RIyxgEYhhrcBS3de3OSLnwzzFa1q_2V33WsGqQjgbdge=w230-rw", description: "Laptop ASUS ROG Zephyrus G16 GA605WI 2024 (Ryzen AI 9 HX 370/RAM 32GB/GeForce RTX 4070/1TB SSD/ Windows 11 + Office)", price: "77.900.000", oldPrice: "91.980.000", discount: "11.68", save: "4.000.000"},
  ];

  const Good=[
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

  const dispatch = useDispatch();
  const { name } = useParams();
  const { categoryName, brandName } = useSelector((state) => state.filter);
  console.log("Category: ", categoryName)
  console.log("Brand: ", brandName)
  // const { products, loading, error } = useSelector((state) => state.product);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Tạo đối tượng params với các tham số từ Redux state
  const params = {
    categoryName,
    brandName,
  };

  const { data: products, isLoading, isError, error } = useGetAllProductsQuery(params);
  console.log("Data: ",products)

  // useEffect(() => {
  //   if (name) {
  //     // Kiểm tra xem name có phải là brandName hay categoryName
  //     if (name.includes('brands')) {
  //       dispatch(getAllProductsClient({ brandName: name })); // Gọi API với brandName
  //     } else {
  //       dispatch(getAllProductsClient({ categoryName: name })); // Gọi API với categoryName
  //     }
  //   }
  // }, [dispatch, name]);

  // useEffect(()=> {
  //   console.log("Name Brand: ",name);
  //   console.log("Sản phẩm của brand: ",products)
  // })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-[#F5F5F5]">
      <div className="flex justify-center mx-auto">
        <div className="flex w-full max-w-[1100px] h-420px flex-nowrap md:my-6 md:p-6">
          {!isMobile && (
            <div className="w-[20%] flex-shrink-0 pl-[5px] rounded overflow-y-auto">
              <ProductListSideBar />
            </div>
          )}

          <div className="w-full md:w-[80%] flex-grow min-w-0 h-full overflow-hidden mx-[10px] rounded">
          <GeneralProductUp image={ImageLogo} choose={ChooseDemand} />
          <GeneralProductMiddle data={newGoods} />
          <GeneralProductDown data={Good} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductList;