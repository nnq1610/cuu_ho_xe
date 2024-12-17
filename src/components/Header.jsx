import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaUserCircle } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userRole, setUserRole] = useState('');

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleBranches = () => setShowBranches(!showBranches);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
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

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
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
              <img src="/images/img_7.png" alt="" className="w-[160px] h-[100px]" />
            </Link>
          </div>
          <div className="flex gap-10 font-semibold text-[15px] hidden sm:flex">
            <p className="flex justify-center items-center hover:text-[#77dada]">cuuho24h@gmail.com</p>
            <p className="flex justify-center items-center gap-2 hover:text-[#77dada]">
              <FaPhoneAlt />
              Hotline: 0964943908
            </p>
            <p className="flex justify-center items-center hover:text-[#77dada]">Liên hệ</p>
          </div>
          <div className="hidden sm:flex gap-5 items-center">
            {isAuthenticated ? (
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
            ) : (
                <>
                  <Link
                      to="/login"
                      className="w-[130px] h-[40px] border-2 border-blue-400 rounded-[10px] flex items-center justify-center text-[15px] text-red-900 font-bold hover:bg-pink-200"
                  >
                    Đăng Nhập
                  </Link>
                  <Link
                      to="/register"
                      className="w-[130px] h-[40px] border-2 border-blue-400 rounded-[10px] flex items-center justify-center text-[15px] text-white bg-blue-400 font-bold hover:text-red-900 hover:bg-blue-500"
                  >
                    Đăng Ký
                  </Link>
                </>
            )}
          </div>

          {/* Mobile */}
          <div className="sm:hidden flex gap-5 items-center">
            <IoMenu onClick={toggleMenu} className="h-[30px] w-[30px]" />
          </div>
          <div
              className={`fixed top-0 right-0 w-[300px] h-full bg-white shadow-lg transition-transform duration-500 ease-in-out transform ${
                  menuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            {menuOpen && (
                <div className="flex flex-col items-center mt-10">
                  <div className="text-xl font-semibold mb-5">Menu</div>
                  {isAuthenticated ? (
                      <>
                        <Link to="/profile" className="text-sm mb-3">
                          Thông tin cá nhân
                        </Link>
                        {userRole === 'rescue' && (
                            <>
                              <Link to="/services" className="text-sm mb-3">
                                Thêm dịch vụ
                              </Link>
                              <Link to="/allServices" className="text-sm mb-3">
                                Quản lý dịch vụ
                              </Link>
                            </>
                        )}
                        <button
                            onClick={handleLogout}
                            className="w-[80px] h-[30px] border-2 border-red-400 rounded-[10px] text-sm text-red-900 font-bold hover:bg-pink-200"
                        >
                          Đăng Xuất
                        </button>
                      </>
                  ) : (
                      <>
                        <Link
                            to="/login"
                            className="w-[100px] h-[30px] border-2 border-blue-400 rounded-[10px] flex items-center justify-center text-sm text-red-900 font-bold hover:bg-pink-200"
                        >
                          Đăng Nhập
                        </Link>
                        <Link
                            to="/register"
                            className="w-[100px] h-[30px] border-2 border-blue-400 rounded-[10px] flex items-center justify-center text-sm text-white bg-blue-400 font-bold hover:text-red-900 hover:bg-blue-500"
                        >
                          Đăng Ký
                        </Link>
                      </>
                  )}
                  <IoIosCloseCircleOutline
                      onClick={toggleMenu}
                      className="h-[30px] w-[30px] mt-5 cursor-pointer text-red-900"
                  />
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default Header;
