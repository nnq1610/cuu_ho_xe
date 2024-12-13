import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { getUserId } from '../utils/jwt';

const Menu = () => {
  const [showBranches, setShowBranches] = useState(false);
  const [branches, setBranches] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/hotels/');
      setBranches(response.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  useEffect(() => {
    fetchBranches();
    setIsLoggedIn(getUserId());
  }, []);

  const toggleBranches = () => {
    setShowBranches(!showBranches);
  };

  return (
    <div className="flex justify-center mt-3 pb-3 mr-16 ml-16 sm:mr-1 sm:ml-1">
      <ul className="flex gap-[50px] w-[70%] text-[15px] font-semibold justify-center xl:text-[16px] md1:w-[75%]">
        <Link to="/">
          <li className="hover:text-[#77dada] min-[sm0]:text-[12px] min-[sm]:text-[14px] text-center">Trang chủ</li>
        </Link>
        <Link to="/gioi-thieu">
          <li className="hover:text-[#77dada] min-[sm0]:text-[12px] min-[sm]:text-[14px] text-center">Giới thiệu</li>
        </Link>
        {/*<li className="relative cursor-pointer hover:text-[#77dada] min-[sm0]:text-[12px] min-[sm]:text-[14px] hidden sm:block text-center" onClick={toggleBranches}>*/}
        {/*  Chi Nhánh*/}
        {/*  {showBranches && (*/}
        {/*    <ul className="absolute bg-white text-black mt-2 p-2 shadow-lg z-10">*/}
        {/*      {branches.map((branch) => (*/}
        {/*        <li key={branch.hotel_id} className="hover:bg-gray-100 px-4 py-2 w-[180px] text-[15px] hover:text-[#77dada] cursor-pointer">*/}
        {/*          <Link to={`/gioi-thieu-chi-nhanh/${branch?.hotel_id}`}>CN {branch.address}</Link>*/}
        {/*        </li>*/}
        {/*      ))}*/}
        {/*    </ul>*/}
        {/*  )}*/}
        {/*</li>*/}
        <Link to="/searchService">
          <li className="hover:text-[#77dada]">Tìm cứu hộ</li>
        </Link>
        {/*<Link to="/mã-khuyến-mãi">*/}
        {/*  <li className="hover:text-[#77dada] hidden sm:block text-center">Khuyến mãi</li>*/}
        {/*</Link>*/}
        <Link to="/hướng-dẫn-đặt-phòng">
          <li className="hover:text-[#77dada] hidden md:block text-center">Hướng dẫn</li>
        </Link>
        {isLoggedIn && (
          <Link to="/lịch-sử-đặt-phòng">
            <li className="hover:text-[#77dada] hidden md:block text-center">Lịch sử đặt phòng</li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Menu;
