import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import RoomList from '../components/room/RoomList';
import RoomNotFound from '../components/allRoom/RoomNotFound';
import Adress from '../components/home/Adress';
import ModalCart from './ModalCart';
import { getUserId } from '../utils/jwt';
import { toast } from 'react-toastify';
import axios from 'axios';

const RoomDetail = () => {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/room/${roomId}/`);
        const data = await response.json();
        console.log('Dữ liệu phòng:', data);
        setRoomData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [roomId]);

  const images = roomData?.images?.map((img) => img.url) || [];
  console.log('anh', images);
  // const images = ['./images/hotel1.jpg', './images/muongthanh_ht.gif', './images/sontra_ht.webp', './images/minhtoan_ht.jpg'];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);

      // Clear interval khi component bị unmounted
      return () => clearInterval(interval);
    }
  }, [images]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handlePreviewClick = (index) => {
    setCurrentIndex(index);
  };

  // Thêm phòng vào giỏ hàng
  const handleAddToCart = async (roomId, checkinDate, checkoutDate, room_name, room_status) => {
    try {
      const cartResponse = await axios.get('http://127.0.0.1:8000/cart/');
      const cartItems = cartResponse.data?.filter((item) => item.user_id === getUserId());

      const isRoomInCart = cartItems.some((item) => item.room === roomId);

      if (isRoomInCart) {
        toast.error('Phòng này đã có trong giỏ hàng!');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/cart/', {
        room: roomId,
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        user_id: getUserId(),
        room_name: room_name,
      });

      if (response.status === 201) {
        toast.success('Phòng đã được thêm vào giỏ hàng!');
      } else {
        toast.error('Có lỗi xảy ra khi thêm phòng vào giỏ hàng!');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thêm phòng vào giỏ hàng!');
    }
    setIsModalOpen(false);
  };

  const openModal = (roomId) => {
    setSelectedRoomId(roomId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!roomData) {
    return <RoomNotFound />;
  }

  return (
    <div>
      <div className="px-[30px] md:px-[85px]">
        <div className="mt-8 md:flex justify-between">
          <div>
            <h2 className="text-[16px] md:text-[26px] font-archivo font-thin"> {roomData.room_type}</h2>
            <p className="text-[16px] md:text-[26px] font-archivo font-thin"> {roomData.price_per_night} VNĐ / Ngày</p>
          </div>
          <div className="mt-3 md:mt-0">
            <button onClick={() => openModal(roomData.room_id)} className="h-[40px] w-[150px] bg-[#bfdbfe] rounded-[30px] hover:bg-red-500 font-archivo font-bold">
              Thêm giỏ hàng
            </button>
            {isModalOpen && <ModalCart roomId={selectedRoomId} onClose={closeModal} onAddToCart={handleAddToCart} />}
          </div>
        </div>
        {/* <div className="mt-5 w-[150px] md:w-[220px] px-5 py-1 rounded-xl bg-red-300 text-center text-white text-[14px] md:text-[18px]">{roomData.hotel.rating} ★ (11 đánh giá)</div> */}
        <img src="./images/heading-border.webp" alt="" className="mt-10" />
      </div>

      {/* ảnh phòng */}
      <div className="relative flex mt-10 gap-5 items-center px-[30px] md:px-[30px] hidden sm:flex">
        <div className="sm:h-[400px] sm:w-[15%] overflow-hidden rounded-l-[50px] border-pink-100 border-2">
          <img src={process.env.REACT_APP_BASE_API_URL + images[(currentIndex - 1 + images.length) % images.length]} alt="" className="w-full h-full object-cover object-left" />
        </div>

        <div className="sm:w-[80%] sm:h-[400px] border-pink-100 border-2">
          <img src={process.env.REACT_APP_BASE_API_URL + images[currentIndex]} alt="" className="w-full h-full object-cover" />
          {/* ảnh con */}
          <div className="relative flex gap-3 justify-center top-[-90px]">
            {images.map((img, index) => (
              <div
                key={index}
                className={`w-[80px] h-[80px] rounded-[15px] border-[3px] border-white cursor-pointer ${index === currentIndex ? 'border-red-200' : ''}`}
                onClick={() => handlePreviewClick(index)}
              >
                <img src={process.env.REACT_APP_BASE_API_URL + img} alt="" className="w-full h-full rounded-[15px] object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="sm:h-[400px] sm:w-[15%] overflow-hidden rounded-r-[50px] border-pink-100 border-2">
          <img src={process.env.REACT_APP_BASE_API_URL + images[(currentIndex + 1) % images.length]} alt="" className="w-full h-full object-cover object-right" />
        </div>

        <button
          onClick={handlePrev}
          className="p-2 w-[50px] h-[50px] bg-white absolute left-[40px] top-[50%] transform -translate-y-1/2 rounded-full border-2 border-black hover:bg-red-200 flex justify-center items-center"
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={handleNext}
          className="p-2 w-[50px] h-[50px] bg-white absolute right-[40px] top-[50%] transform -translate-y-1/2 rounded-full border-2 border-black hover:bg-red-200 flex justify-center items-center"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* ảnh phòng mobile */}
      <div className="relative flex mt-10 gap-5 items-center px-[30px] md:px-[30px] sm:hidden">
        <div className="sm:w-[80%] sm:h-[400px]">
          <img src={process.env.REACT_APP_BASE_API_URL + images[currentIndex]} alt="" className=" w-[330px] h-[300px] object-cover rounded-[30px] border-red-200 border-2" />
        </div>
      </div>

      {/* đi đến */}
      <div className="px-[30px] md:px-[85px] mt-14">
        <ul className="flex gap-5 bg-pink-100 px-5 py-3 justify-center rounded-[15px]">
          <li>
            <a href="#introduction" className="hover:bg-white rounded-[10px] px-3 py-2">
              Giới thiệu
            </a>
          </li>
          <li>
            <a href="#related-rooms" className="hover:bg-white rounded-[10px] px-3 py-2">
              Chi nhánh
            </a>
          </li>
          <li>
            <a href="#related-rooms" className="hover:bg-white rounded-[10px] px-3 py-2">
              Phòng nổi bật
            </a>
          </li>
        </ul>
      </div>

      {/* Giới thiệu */}
      <div id="introduction" className="px-[30px] md:px-[85px] mt-5">
        <h2 className="text-[22px] md:text-[32px] font-archivo font-bold">Giới thiệu</h2>
        <img src="./images/heading-border.webp" alt="" className="mt-5" />
        <h2 className="text-[14px] md:text-[18px] font-archivo font-extralight mt-5">{roomData.description}</h2>
      </div>

      {/* Giới thiệu */}
      <div id="introduction" className="px-[30px] md:px-[85px] mt-5">
        <h2 className="text-[22px] md:text-[32px] font-archivo font-bold">Chi nhánh</h2>
        <img src="./images/heading-border.webp" alt="" className="mt-5" />
        <h2 className="text-[14px] md:text-[18px] font-archivo font-extralight mt-5">
          <Adress />
        </h2>
      </div>

      {/* Phòng liên quan */}
      <div id="related-rooms" className="px-[30px] md:px-[85px] mt-5">
        <h2 className="text-[22px] md:text-[32px] font-archivo font-bold md:pt-5">Phòng nổi bật</h2>
        <img src="./images/heading-border.webp" alt="" className="mt-5" />
        <RoomList roomActiveId={roomId} />
      </div>
    </div>
  );
};

export default RoomDetail;
