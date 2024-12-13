import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoArrowRedo, IoLocationOutline } from 'react-icons/io5';
import { PiCrownThin } from 'react-icons/pi';
import { useParams } from 'react-router-dom';
import AllRooms from '../components/room/AllRooms';
import Review from '../components/room/Review';

const AboutBranch = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/hotels/${hotelId}`)
      .then((response) => setHotel(response.data))
      .catch((error) => console.error('Error fetching hotel data', error));
  }, [hotelId]);

  if (!hotel) return <p>Loading...</p>;

  return (
    <div>
      {/* Giới thiệu */}
      <div className="mx-[10px] md:mx-[40px] px-[30px] mt-3 md:mt-10 border-2 rounded-[15px] bg-white shadow-xl pb-[30px]">
        <h2 className="text-[18px] md:text-[32px] font-archivo font-bold flex items-center gap-3 mt-5 justify-center text-green-900">
          <PiCrownThin />
          Chi Nhánh {hotel.address}
          <PiCrownThin />
        </h2>
        <div className="flex items-center justify-center mt-3">
          <p className="w-[120px] h-[25px] px-5 bg-blue-200 flex items-center justify-center rounded-xl">Khách sạn</p>
        </div>
        <p className="text-[24px] text-yellow-300 flex items-center justify-center mt-3">★★★★★</p>

        {/* Mô tả */}
        <div className="mt-5">
          <h2 className="text-[18px] md:text-[22px] px-5 bg-blue-200 flex items-center justify-center rounded-xl text-green-900 font-archivo font-bold">Mô tả</h2>
          <p className="text-[14px] md:text-[18px] px-5 mt-5">{hotel.description}</p>
          {/* ảnh */}
          <div className="mt-5 flex justify-center pb-5">
            <img src={hotel?.image} alt={hotel?.hotel_name} className=" w-full h-auto md:w-[800px] md:h-[500px]" />
          </div>
        </div>

        <div className="sm1:flex sm1:justify-between gap-[30px] mt-5">
          {/* Tiện ích */}
          <div className="sm1:w-[50%]">
            <div className="sm1:mx-[20px] flex justify-center mt-3">
              <h2 className="text-[18px] w-full md:text-[22px] px-5 bg-blue-200 flex items-center justify-center rounded-xl text-green-900 font-archivo font-bold">Tiện ích</h2>
            </div>
            <div className="w-full grid md:grid-cols-2 mx-[80px]">
              <div className="flex items-center gap-5 mt-5">
                <img src="/images/svg/maylanh.svg" alt="" className="w-[20px] h-[20px]" />
                <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[100px]">Máy lạnh</h2>
              </div>
              <div className="flex items-center gap-5 mt-5">
                <img src="/images/svg/wifi.svg" alt="" className="w-[20px] h-[20px]" />
                <h2 className="text-[14px] md:text-[18px] font-archivo font-thin w-[100px]">Wifi</h2>
              </div>
              <div className="flex items-center gap-5 mt-5">
                <img src="/images/svg/letan.svg" alt="" className="w-[20px] h-[20px]" />
                <h2 className="text-[14px] md:text-[18px] font-archivo font-thin w-[100px]">Lễ tân 24h</h2>
              </div>
              <div className="flex items-center gap-5 mt-5">
                <img src="/images/svg/hoboi.svg" alt="" className="w-[20px] h-[20px]" />
                <h2 className="text-[14px] md:text-[18px] font-archivo font-thin w-[100px]">Hồ Bơi</h2>
              </div>
              <div className="flex items-center gap-5 mt-5">
                <img src="/images/svg/thangmay.svg" alt="" className="w-[20px] h-[20px]" />
                <h2 className="text-[14px] md:text-[18px] font-archivo font-thin w-[100px]">Thang máy</h2>
              </div>
              <div className="flex items-center gap-5 mt-5">
                <img src="/images/svg/an.svg" alt="" className="w-[20px] h-[20px]" />
                <h2 className="text-[14px] md:text-[18px] font-archivo font-thin w-[100px]">Ăn</h2>
              </div>
            </div>
          </div>
          {/* vị trí */}
          <div className="sm1:w-[50%]">
            <div className="sm1:mx-[20px] flex justify-center mt-3">
              <h2 className="text-[18px] w-full md:text-[22px] px-5 bg-blue-200 flex items-center justify-center rounded-xl text-green-900 font-archivo font-bold">Vị trí</h2>
            </div>
            <div className="w-full grid md:grid-cols-2">
              <div className="w-full mx-[80px]">
                <div className="flex items-center gap-5 mt-5">
                  <IoLocationOutline />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[100px]">Vị trí</h2>
                </div>
                <div className="flex gap-3 items-center ml-5">
                  <IoArrowRedo />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[100px] mt-3">Hải Châu</h2>
                </div>
                <div className="flex gap-3 items-center ml-5">
                  <IoArrowRedo />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[100px] mt-3">Hòa Khánh</h2>
                </div>
                <div className="flex gap-3 items-center ml-5">
                  <IoArrowRedo />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[100px] mt-3">Sơn Trà</h2>
                </div>
              </div>
              <div className="w-full mx-[80px]">
                <div className="flex items-center gap-5 mt-5">
                  <IoLocationOutline />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[200px]">Vị trí thuận tiện</h2>
                </div>
                <div className="flex gap-3 items-center ml-5">
                  <IoArrowRedo />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[200px] mt-3">Bệnh viện Hoàn Mỹ</h2>
                </div>
                <div className="flex gap-3 items-center ml-5">
                  <IoArrowRedo />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[200px] mt-3">Cầu rồng</h2>
                </div>
                <div className="flex gap-3 items-center ml-5">
                  <IoArrowRedo />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[200px] mt-3">Cầu sông Hàn</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Phòng */}
      <AllRooms hotelId={hotelId} />
      {/* đánh giá */}
      <div id="reviews" className="px-[30px] md:px-[85px] mt-5">
        <Review hotelId={hotelId} />
      </div>
    </div>
  );
};

export default AboutBranch;
