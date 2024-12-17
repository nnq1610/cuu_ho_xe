import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaMapMarkerAlt, FaMoneyBillWave, FaCar, FaClipboardList } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/loading/loading';

const SearchService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState('Không sắp xếp');
  const [showDropdown, setShowDropdown] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.services) {
      setServices(location.state.services);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [location.state]);

  const handleSortChange = (option) => {
    setSortOption(option);
    setShowDropdown(false);

    if (option === 'Giá cao xuống thấp') {
      setServices((prevServices) =>
          [...prevServices].sort((a, b) => b.price - a.price)
      );
    } else if (option === 'Giá thấp đến cao') {
      setServices((prevServices) =>
          [...prevServices].sort((a, b) => a.price - b.price)
      );
    }
  };

  const handleViewDetails = (id) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/serviceDetail/${id}`);
    }, 1000);
  };

  const handleReview = (serviceId) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/reviews/${serviceId}`, { state: { serviceId } });
    }, 1000);
  };

  return (
      <div className="px-[30px] md:px-[85px] mt-5">
        {isLoading && <Loading />}
        <div className="pt-5 border-2 px-3 py-5 rounded-[30px] shadow-xl">
          <h2 className="text-[24px] md:text-[30px] text-center font-bold">Tìm kiếm dịch vụ cứu hộ</h2>
          <div className="mt-5 flex justify-center items-center relative">
            <input
                type="text"
                className="w-full sm:w-[80%] rounded-[25px] border-2 px-5 h-[40px] md:h-[50px] pr-10"
                placeholder="Nhập tìm kiếm"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />
            <CiSearch className="absolute right-4 sm:right-[calc(10%+1rem)] top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <h2 className="mt-10 text-[22px] md:text-[32px] font-bold">Tìm thấy {services.length} kết quả</h2>
        <img src="./images/heading-border.webp" alt="" className="mt-5" />

        <div className="mt-10 flex justify-between gap-3">
          <div className="relative justify-end">
            <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-[13px] md:text-[18px] font-medium border-2 px-5 py-3 rounded-[30px] flex gap-2 justify-between items-center cursor-pointer"
            >
              <h2>{sortOption}</h2>
              {showDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>

            {showDropdown && (
                <div className="absolute bg-white border rounded-xl shadow-lg w-full mt-2">
                  <ul className="py-2">
                    <li
                        onClick={() => handleSortChange('Không sắp xếp')}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      Không sắp xếp
                    </li>
                    <li
                        onClick={() => handleSortChange('Giá cao xuống thấp')}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      Giá cao xuống thấp
                    </li>
                    <li
                        onClick={() => handleSortChange('Giá thấp đến cao')}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      Giá thấp đến cao
                    </li>
                  </ul>
                </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-5">
          {loading ? (
              <p>Loading...</p>
          ) : services.length > 0 ? (
              services.map((service) => (
                  <div key={service._id} className="border-2 rounded-2xl flex flex-col p-5 bg-white shadow-md">
                    <img
                        src={service.image || `/img.png`}
                        alt={`Service ${service.name || 'N/A'}`}
                        className="w-full h-[200px] rounded-2xl border-2"
                    />
                    <div className="flex items-center mt-4">
                      <FaClipboardList className="text-blue-500" />
                      <h2 className="text-sm md:text-base ml-2 font-semibold">{service.name || 'N/A'}</h2>
                    </div>
                    <div className="flex items-center mt-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      <h2 className="text-sm md:text-base ml-2">{service.address || 'N/A'}</h2>
                    </div>
                    <div className="flex items-center mt-2">
                      <FaMoneyBillWave className="text-green-500" />
                      <h2 className="text-sm md:text-base ml-2">{service.price || '0'} VNĐ</h2>
                    </div>
                    <div className="flex items-center mt-2">
                      <FaCar className="text-gray-500" />
                      <h2 className="text-sm md:text-base ml-2">{service.vehicleType || 'N/A'}</h2>
                    </div>
                    <div className="flex justify-between gap-2 mt-4">
                      <button
                          onClick={() => handleViewDetails(service._id)}
                          className="h-10 w-full md:w-36 bg-gray-300 rounded-full hover:bg-red-500 text-gray-700 hover:text-white"
                      >
                        Xem chi tiết
                      </button>
                      <button
                          onClick={() => handleReview(service._id)}
                          className="h-10 w-full md:w-36 bg-gray-300 rounded-full hover:bg-blue-500 text-gray-700 hover:text-white"
                      >
                        Đánh giá
                      </button>
                    </div>
                  </div>
              ))
          ) : (
              <p>Không tìm thấy dịch vụ phù hợp</p>
          )}
        </div>
      </div>
  );
};

export default SearchService;
