import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Banner = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isVehicleTypeOpen, setIsVehicleTypeOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const vehicleTypes = ['Xe Máy', 'Ô Tô', 'Xe Đạp'];
  const locations = ['Hà Nội', 'Hải Phòng', 'Thành phố Hồ Chí Minh'];

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/rescue-units/search`, {
        vehicleType: selectedVehicleType,
        address: selectedLocation,
        name: searchQuery,
      }, {
        headers: {
          'x-access-token': token,
        },
      });

      const { metadata } = response.data;

      const services = metadata.finalResult.flatMap(item => item.incidentTypes.map(type => ({
            _id: type._id,
            name: type.name.trim(),
            description: type.description,
            vehicleType: type.vehicleType,
            price: type.price,
            address: type.address,
            image: type.image
      })))
    console.log(services)
      navigate('/searchService', {
        state: {
          services
        },
      });
    } catch (error) {
      console.error('Error searching for rescue units:', error);
    }
  };

  return (
      <div className="flex flex-col items-center md:mr-10 md:ml-10 bg-bg-image-1 bg-contain md:bg-bg-white pb-6">
        <div className="hidden md:block w-full rounded-[50px] h-[580px] overflow-hidden">
          <Swiper
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 1000, disableOnInteraction: false }}
              className="w-full h-full"
          >
            <SwiperSlide>
              <img src="/images/img_1.png" alt="Cứu hộ 1" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/img.png" alt="Cứu hộ 2" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/hotel1.jpg" alt="Cứu hộ 3" className="w-full h-full object-cover" />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="bg-white shadow-md w-[300px] sm0:w-[80%] sm:w-[65%] h-[440px] sm:h-[240px] rounded-[30px] mt-5 relative z-[400] md:top-[-130px]">
          <div className="mx-5 my-10">
            <h2 className="text-[24px] md:text-[30px] text-center font-bold">
              Bạn lựa chọn dịch vụ cứu hộ nào?
            </h2>
            <p className="text-[18px] mt-3 md:text-[20px] font-light text-[#101828] text-center">
              Hơn 100 dịch vụ cứu hộ đang chờ bạn
            </p>
            <div className="flex flex-col sm:flex-row sm0:justify-between mt-5">
              {/* Search Query */}
              <div className="relative sm0:mt-2">
                <CiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                <input
                    type="text"
                    className="pl-10 w-full h-[50px] border-2 rounded-[30px] text-[13px] sm:w-[130px] md:w-[200px] md:text-[15px] md0:text-[16px] md0:w-[230px]"
                    placeholder="Nhập tên loại cứu hộ"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Location */}
              <div className="relative flex items-center sm0:mt-2">
                <IoLocationOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                    type="text"
                    className="text-[13px] pl-10 pr-10 w-full h-[50px] border-2 rounded-[30px] flex items-center cursor-pointer sm:w-[130px] md:w-[200px] md:text-[15px] md0:text-[16px] md0:w-[230px]"
                    placeholder="Địa chỉ"
                    value={selectedLocation}
                    onClick={() => setIsLocationOpen(!isLocationOpen)}
                    readOnly
                />
                <MdOutlineKeyboardArrowDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setIsLocationOpen(!isLocationOpen)}
                />
                {isLocationOpen && (
                    <ul className="absolute w-full left-0 top-full bg-white border-2 rounded-[10px] mt-2 shadow-lg z-10">
                      {locations.map((location, index) => (
                          <li
                              key={index}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setSelectedLocation(location);
                                setIsLocationOpen(false);
                              }}
                          >
                            {location}
                          </li>
                      ))}
                    </ul>
                )}
              </div>

              {/* Vehicle Type */}
              <div className="relative flex items-center sm0:mt-2">
                <input
                    type="text"
                    className="text-[13px] pl-10 pr-10 w-full h-[50px] border-2 rounded-[30px] flex items-center cursor-pointer sm:w-[130px] md:w-[200px] md:text-[15px] md0:text-[16px] md0:w-[230px]"
                    placeholder="Loại Phương Tiện"
                    value={selectedVehicleType}
                    onClick={() => setIsVehicleTypeOpen(!isVehicleTypeOpen)}
                    readOnly
                />
                <MdOutlineKeyboardArrowDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setIsVehicleTypeOpen(!isVehicleTypeOpen)}
                />
                {isVehicleTypeOpen && (
                    <ul className="absolute w-full left-0 top-full bg-white border-2 rounded-[10px] mt-2 shadow-lg">
                      {vehicleTypes.map((type, index) => (
                          <li
                              key={index}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setSelectedVehicleType(type);
                                setIsVehicleTypeOpen(false);
                              }}
                          >
                            {type}
                          </li>
                      ))}
                    </ul>
                )}
              </div>

              {/* Search Button */}
              <div
                  onClick={handleSearch}
                  className="text-[13px] sm0:mt-2 pl-10 w-full h-[50px] border-2 rounded-[30px] flex items-center justify-center bg-red-100 hover:bg-red-300 sm:w-[140px] md0:w-[230px] cursor-pointer"
              >
                Tìm kiếm
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Banner;
