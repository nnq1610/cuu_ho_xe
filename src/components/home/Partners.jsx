import React from 'react';
import { motion } from 'framer-motion';
//vatiants
import { fadeIn } from '../../variants';

const Partners = () => {
  return (
    <div className="bg-bg-home-1 px-4 md:px-[100px] pb-20 pt-5">
      <div variants={fadeIn('down', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} className="md:flex md:px-[50px] mt-5">
        <h2 className="text-[32px] md:text-[36px] font-archivo font-bold md:w-[500px] md:mt-6">Đối tác cùng các khách sạn Đà Nẵng</h2>
        <p className="text-[18px] text-wrap font-archivo font-medium mt-10 md:w-[800px] md:pl-[250px]">Đối tác hàng đầu với các khách sạn Đà Nẵng: Ưu đãi độc quyền dành riêng cho bạn.</p>
      </div>
      <img src="./images/heading-border.webp" alt="" className="md:px-[50px] mt-5" />
      <div variants={fadeIn('down', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} className="px-5 pt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        <div className="flex justify-center items-center">
          <img src="./images/chiland_ht.jpg" alt="" className="w-full h-auto max-w-[150px] max-h-[150px] object-cover" />
        </div>
        <div className="flex justify-center items-center">
          <img src="./images/fantasticity_ht.jpg" alt="" className="w-full h-auto max-w-[150px] max-h-[150px] object-cover" />
        </div>
        <div className="flex justify-center items-center">
          <img src="./images/godenbay_ht.jpg" alt="" className="w-full h-auto max-w-[150px] max-h-[150px] object-cover" />
        </div>
        <div className="flex justify-center items-center">
          <img src="./images/grand_ht.jpg" alt="" className="w-full h-auto max-w-[150px] max-h-[150px] object-cover" />
        </div>
        <div className="flex justify-center items-center">
          <img src="./images/hilton_ht.png" alt="" className="w-full h-auto max-w-[150px] max-h-[150px] object-cover" />
        </div>
        <div className="flex justify-center items-center">
          <img src="./images/minhtoan_ht.jpg" alt="" className="w-full h-auto max-w-[150px] max-h-[150px] object-cover" />
        </div>
        <div className="flex justify-center items-center">
          <img src="./images/modern_ht.png" alt="" className="w-full h-auto max-w-[150px] max-h-[150px] object-cover" />
        </div>
        <div className="flex justify-center items-center">
          <img src="./images/sontra_ht.webp" alt="" className="w-full h-auto max-w-[150px] max-h-[150px] object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Partners;
