import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { getUserId } from '../utils/jwt';

const Menu = () => {


  return (
    <div className="flex justify-center mt-3 pb-3 mr-16 ml-16 sm:mr-1 sm:ml-1">
      <ul className="flex gap-[50px] w-[70%] text-[15px] font-semibold justify-center xl:text-[16px] md1:w-[75%]">
        <Link to="/">
          <li className="hover:text-[#77dada] min-[sm0]:text-[12px] min-[sm]:text-[14px] text-center">Trang chủ</li>
        </Link>
        <Link to="/gioi-thieu">
          <li className="hover:text-[#77dada] min-[sm0]:text-[12px] min-[sm]:text-[14px] text-center">Giới thiệu</li>
        </Link>
        <Link to="/searchService">
          <li className="hover:text-[#77dada]">Tìm cứu hộ</li>
        </Link>
        <Link to="/">
          <li className="hover:text-[#77dada] hidden md:block text-center">Hướng dẫn</li>
        </Link>

      </ul>
    </div>
  );
};

export default Menu;
