import React, { useEffect, useState } from 'react';
import {FaPhoneAlt, FaUserCircle} from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [branches, setBranches] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userRole, setUserRole] = useState(false);


  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleBranches = () => setShowBranches(!showBranches);

  //authentication

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // Giải mã payload
        const decodedToken = JSON.parse(atob(base64));
        setUserRole(decodedToken.role);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid token:', error);
        setIsAuthenticated(false);
      }
    }
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuElement = document.getElementById('userMenu');
      if (menuElement && !menuElement.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  // Fetch branches and addresses
  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/hotels/');
      setBranches(response.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  useEffect(() => {
    if (showBranches) fetchBranches();
  }, [showBranches]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/', {
      state: {
        notify: {
          type: 'success',
          message: 'Đã đăng xuất thành công!',
        },
      },
    });
  };

  return (
    <div className="border-b-2 sticky top-0 bg-white z-[99999999] px-10">
      <div className="flex justify-between h-[100px]">
        <div className="flex items-center w-[200px]">
          <Link to="/">
            <img src="/images/logohavenhotel.png" alt="" className="w-[160px] h-[100px]" />
          </Link>
        </div>
        <div className="flex gap-10 font-semibold text-[15px]">
          <p className="flex justify-center items-center hover:text-[#77dada] hidden md:flex">cuuho24h@gmail.com</p>
          <p className="flex justify-center items-center gap-2 hover:text-[#77dada] hidden sm:flex">
            <FaPhoneAlt />
            Hotline: 0964943908
          </p>
          <p className="flex justify-center items-center hover:text-[#77dada] hidden md:flex">Liên hệ</p>
        </div>
        {/* Menu đăng ký đăng nhập */}
        <div className="hidden sm:flex gap-5 items-center">
          {isAuthenticated ? (
              <>
                <div className="relative">
                  <FaUserCircle
                      className="text-2xl cursor-pointer"
                      onClick={() => setShowUserMenu(!showUserMenu)}
                  />
                  {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-[200px] bg-white shadow-lg rounded-md z-10">
                        <ul className="text-sm">
                          <li className="px-4 py-2 hover:bg-gray-100">
                            <Link to="/profile">Thông tin cá nhân</Link>
                          </li>
                          {userRole === 'rescue' && (
                              <>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                  <Link to="/services">Thêm dịch vụ</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                  <Link to="/allServices">Quản lý dịch vụ</Link>
                                </li>
                              </>
                          )}
                          <li
                              className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                              onClick={handleLogout}
                          >
                            Đăng Xuất
                          </li>
                        </ul>
                      </div>
                  )}
                </div>

                {/*<div className="w-[130px] h-[40px] border-2 border-blue-400 rounded-[10px] flex items-center justify-center text-[15px] text-white bg-blue-400 font-bold hover:bg-blue-500">*/}
                {/*  <Link to="/gio-hang">Giỏ Hàng</Link>*/}
                {/*</div>*/}
                {/*<div className="w-[130px] h-[40px] border-2 border-red-400 rounded-[10px] flex items-center justify-center text-[15px] text-red-900 font-bold hover:bg-pink-200" onClick={handleLogout}>*/}
                {/*  Đăng Xuất*/}
                {/*</div>*/}
              </>
          ) : (
              <>
                <div
                    className="w-[130px] h-[40px] border-2 border-blue-400 rounded-[10px] flex items-center justify-center text-[15px] text-red-900 font-bold hover:bg-pink-200">
                  <Link to="/login">Đăng Nhập</Link>
                </div>
                <div
                    className="w-[130px] h-[40px] border-2 border-blue-400 rounded-[10px] flex items-center justify-center text-[15px] text-white bg-blue-400 font-bold hover:text-red-900 hover:bg-blue-500">
                  <Link to="/register">Đăng Ký</Link>
                </div>
              </>
          )}
        </div>

        {/* Mobile */}
        <div className="sm:hidden flex gap-5 items-center">{!menuOpen &&
            <IoMenu onClick={toggleMenu} className="h-[30px] w-[30px]"/>}</div>
        <div
            className={`fixed top-0 right-0 w-[200px] h-full bg-white shadow-lg transition-transform duration-500 ease-in-out transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {menuOpen && (
            <div className="flex flex-col items-center gap-3 mt-3">
              {isAuthenticated ? (
                <>
                  <div className="mt-5">
                    <div className="text-[14px] font-archivo font-thin mt-5 hover:text-red-400">
                      <Link to="/gio-hang">Trang chủ</Link>
                    </div>
                    {/*<div className="text-[14px] font-archivo font-thin mt-5 hover:text-red-400" onClick={toggleBranches}>*/}
                    {/*  Chi nhánh*/}
                    {/*</div>*/}
                    {showBranches && (
                      <ul className="text-[14px] font-archivo font-thin mt-3">
                        {branches.map((branch) => (
                          <li key={branch.id} className="hover:text-red-400 mt-2">
                            <span>{branch.name}</span>
                            <Link className="text-[14px] font-archivo font-thin ml-5" to={`/gioi-thieu-chi-nhanh/${branch?.hotel_id}`}>
                              CN {branch.address}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {/*<div className="text-[14px] font-archivo font-thin mt-5 hover:text-red-400">*/}
                    {/*  <Link to="/mã-khuyến-mãi">Khuyến mãi</Link>*/}
                    {/*</div>*/}
                    <div className="text-[14px] font-archivo font-thin mt-5 hover:text-red-400">
                      <Link to="/">Hướng dẫn</Link>
                    </div>
                    <div className="text-[14px] font-archivo font-thin mt-5 hover:text-red-400">
                      <Link to="/lịch-sử-đặt-phòng">Lịch sử</Link>
                    </div>
                    <div className="text-[14px] font-archivo font-thin mt-5 hover:text-red-400">
                      <Link to="/gio-hang">Giỏ Hàng</Link>
                    </div>
                  </div>
                  <div
                    className="w-[80px] h-[30px] border-2 border-red-400 rounded-[10px] flex items-center justify-center text-[12px] text-red-900 font-bold hover:bg-pink-200"
                    onClick={handleLogout}
                  >
                    Đăng Xuất
                  </div>
                </>
              ) : (
                <>
                  <div className="w-[80px] h-[30px] border-2 border-blue-400 rounded-[10px] flex items-center justify-center text-[12px] text-red-900 font-bold hover:bg-pink-200">
                    <Link to="/login">Đăng Nhập</Link>
                  </div>
                  <div className="w-[80px] h-[30px] border-2 border-blue-400 rounded-[10px] flex items-center justify-center text-[12px] text-white bg-blue-400 font-bold hover:text-red-900 hover:bg-blue-500">
                    <Link to="/register">Đăng Ký</Link>
                  </div>
                </>
              )}
              <div onClick={toggleMenu} className="cursor-pointer text-red-900 font-bold hover:text-red-700">
                <IoIosCloseCircleOutline className="h-[20px] w-[20px]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
