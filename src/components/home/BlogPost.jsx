import React from 'react';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
//vatiants
import { fadeIn } from '../../variants';

const BlogPost = () => {
  return (
    <div className="px-4 md:px-[100px] pb-20 pt-5">
      <div className="md:flex md:px-[50px] mt-5">
        <h2
          variants={fadeIn('right', 0.2)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.7 }}
          className="text-[32px] md:text-[36px] font-archivo font-bold md:w-[500px] md:mt-6"
        >
          Khám phá Sự đặc sắc và Cập nhật tin tức mới nhất
        </h2>
        <p
          variants={fadeIn('left', 0.2)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.7 }}
          className="text-[18px] text-wrap font-archivo font-medium mt-10 md:w-[800px] md:pl-[250px]"
        >
          Mang lại cho khách hàng các thông tin hữu ích.
        </p>
      </div>
      <img variants={fadeIn('right', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} src="./images/heading-border.webp" alt="" className="md:px-[50px] mt-5" />
      <div variants={fadeIn('down', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} className="mx-[20px] md:mx-[30px] md:mt-10">
        <div className="px-5 grid grid-cols-1 sm:grid-cols-2 mds:grid-cols-4 gap-[20px]">
          {/* Các thẻ bài viết */}
          <div className="border-2 rounded-[30px] flex flex-col p-5">
            <img src="./images/img_2.png" alt="Room 1" className="w-full h-auto max-w-[350px] rounded-[25px]" />
            <div className="mt-5 text-[20px] font-archivo font-semibold text-[#475467]">Điểm danh top 4 phòng nổi bật</div>
            <div className="mt-5 text-[15px] font-archivo font-thin text-[#475467]">Điểm danh top 4 phòng nổi bật gồm các ....................................</div>
            <div className="mt-5 text-[15px] font-archivo font-thin text-[#475467]">13/9/2024</div>
          </div>
          <div className="border-2 rounded-[30px] flex flex-col p-5">
            <img src="./images/img_3.png" alt="Room 1" className="w-full h-auto max-w-[350px] rounded-[25px]" />
            <div className="mt-5 text-[20px] font-archivo font-semibold text-[#475467]">Điểm danh top 4 phòng nổi bật</div>
            <div className="mt-5 text-[15px] font-archivo font-thin text-[#475467]">Điểm danh top 4 phòng nổi bật gồm các ....................................</div>
            <div className="mt-5 text-[15px] font-archivo font-thin text-[#475467]">13/9/2024</div>
          </div>
          <div className="border-2 rounded-[30px] flex flex-col p-5">
            <img src="./images/img_4.png" alt="Room 1" className="w-full h-auto max-w-[350px] rounded-[25px]" />
            <div className="mt-5 text-[20px] font-archivo font-semibold text-[#475467]">Điểm danh top 4 phòng nổi bật</div>
            <div className="mt-5 text-[15px] font-archivo font-thin text-[#475467]">Điểm danh top 4 phòng nổi bật gồm các ....................................</div>
            <div className="mt-5 text-[15px] font-archivo font-thin text-[#475467]">13/9/2024</div>
          </div>
          <div className="border-2 rounded-[30px] flex flex-col p-5">
            <img src="./images/img_5.png" alt="Room 1" className="w-full h-auto max-w-[350px] rounded-[25px]" />
            <div className="mt-5 text-[20px] font-archivo font-semibold text-[#475467]">Điểm danh top 4 phòng nổi bật</div>
            <div className="mt-5 text-[15px] font-archivo font-thin text-[#475467]">Điểm danh top 4 phòng nổi bật gồm các ....................................</div>
            <div className="mt-5 text-[15px] font-archivo font-thin text-[#475467]">13/9/2024</div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button className="flex items-center h-[50px] w-[250px] bg-white border-2 border-pink-200 justify-center rounded-[30px] hover:bg-red-500">
            <h2>Xem tất cả bài viết</h2>
            <FaRegArrowAltCircleRight className="ml-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
