import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Loading from '../components/loading/loading';

const SearchService = () => {
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading cho "Xem chi tiết"
  const [sortOption, setSortOption] = useState('Không sắp xếp');
  const [showDropdown, setShowDropdown] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Loading khi fetch dữ liệu
  const [searchName, setSearchName] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const navigate = useNavigate(); // Sử dụng để điều hướng

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = 'http://localhost:5050/v1/api/rescue-units/search';

        const response = await axios.get(apiUrl, {
          params: {
            ...(searchName && { name: searchName }),
            ...(searchPrice && { price: searchPrice }),
          },
          headers: {
            'x-access-token': token,
          },
        });
        const { metadata } = response.data;
        const allIncidentTypes = metadata.reduce((acc, unit) => {
          return acc.concat(unit.incidentTypes || []);
        }, []);

        setServices(allIncidentTypes);
      } catch (error) {
        console.error('There was an error fetching the services!', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [searchName, searchPrice]);

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
    setIsLoading(true); // Hiển thị hiệu ứng loading
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/serviceDetail/${id}`); // Điều hướng tới trang chi tiết
    }, 1000); // Thời gian giả lập tải dữ liệu
  };

  return (
      <div className="px-[30px] md:px-[85px] mt-5">
        {isLoading && <Loading />} {/* Hiển thị hiệu ứng loading */}
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
                    <li onClick={() => handleSortChange('Không sắp xếp')} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Không sắp xếp
                    </li>
                    <li onClick={() => handleSortChange('Giá cao xuống thấp')} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Giá cao xuống thấp
                    </li>
                    <li onClick={() => handleSortChange('Giá thấp đến cao')} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
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
                      <h2 className="text-sm md:text-base ml-2 font-semibold">{service.name || 'N/A'}</h2>
                    </div>
                    <div className="flex items-center mt-2">
                      <h2 className="text-sm md:text-base ml-2">{service.address || 'N/A'}</h2>
                    </div>
                    <div className="flex items-center mt-2">
                      <h2 className="text-sm md:text-base ml-2">{service.price || '0'} VNĐ</h2>
                    </div>
                    <div className="flex items-center mt-2">
                      <h2 className="text-sm md:text-base ml-2">{service.vehicleType || 'N/A'}</h2>
                    </div>
                    <button
                        onClick={() => handleViewDetails(service._id)} // Thêm sự kiện onClick
                        className="h-10 w-full md:w-36 bg-gray-300 rounded-full hover:bg-red-500 text-gray-700 hover:text-white mt-4"
                    >
                      Xem chi tiết
                    </button>
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
