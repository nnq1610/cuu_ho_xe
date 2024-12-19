import React, { useEffect } from 'react';
import { CiLocationOn, CiStar } from 'react-icons/ci';
import { FaAngellist, FaRegArrowAltCircleRight } from 'react-icons/fa';
import { IoBedOutline } from 'react-icons/io5';

//
import Slider from '../components/home/Slider';
import Banner from '../components/home/Banner';
import BlogPost from '../components/home/BlogPost';
import { motion } from 'framer-motion';
//
import { fadeIn } from '../variants';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = (roomId) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Banner />

      <div className="px-4 md:px-[100px]">
        <div className="md:flex md:px-[50px]">
          <h2 className="text-[32px] md:text-[36px] font-archivo font-bold md:w-[500px] md:mt-6">Dịch vụ cứu hộ phổ biến nhất</h2>
          <p className="text-[18px] text-wrap font-archivo font-medium mt-10 md:w-[800px] md:pl-[250px]">
            Tìm các dịch vụ cứu hộ một cách nhanh chóng và chính xác.
          </p>
        </div>
        <div className="mt-20 sm:grid sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-y-5">
        </div>
        <div className="flex justify-center mt-10 pb-10">
          <motion.button
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
            className="flex items-center h-[50px] w-[250px] bg-white border-2 border-pink-200 justify-center rounded-[30px] hover:bg-red-500"
          >
            <Link to="/searchService">Xem thêm dịch vụ cứu hộ </Link>
            <FaRegArrowAltCircleRight />
          </motion.button>
        </div>
        {/*{isModalOpen && <ModalCart roomId={selectedRoomId} onClose={closeModal} onAddToCart={handleAddToCart} />}*/}
      </div>

      {/* Đánh giá từ những người đã trải nghiệm */}
      <div className="bg-bg-home-1 px-4 md:px-[100px] pb-10 pt-5">
        <div className="md:flex md:px-[50px] mt-5">
          <h2
            variants={fadeIn('right', 0.2)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
            className="text-[32px] md:text-[36px] font-archivo font-bold md:w-[500px] md:mt-6"
          >
            Đánh giá từ những người đã trải nghiệm
          </h2>
          <p
            variants={fadeIn('left', 0.2)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
            className="text-[18px] text-wrap font-archivo font-medium mt-10 md:w-[800px] md:pl-[250px]"
          >
            Khách hàng chia sẻ về những kỷ niệm tuyệt vời khi đến với chúng tôi.
          </p>
        </div>
        <img variants={fadeIn('right', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} src="./images/heading-border.webp" alt="" className="md:px-[50px] mt-5" />
        <div variants={fadeIn('right', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} className="pt-5 md:flex">
          <img src="./images/nhaykep1.png" alt="" className="md:px-[50px] h-[25px] md:h-[30px]" />
          <Slider />
        </div>
      </div>



      {/* Các điểm đến */}
      <div className="mt-10 pb-10">
        <div variants={fadeIn('down', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} className="mx-5 md:text-center">
          <h2 className="text-[22px] md:text-[36px] font-archivo font-bold">Các chi nhánh của dịch vụ</h2>
          <p className="text-[14px] md:text-[19px] font-archivo text-green-900 mt-5 md:mt-0"></p>
        </div>
      </div>

      <BlogPost />
    </div>
  );
};

export default Home;
