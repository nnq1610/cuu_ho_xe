import React, { useEffect } from 'react';
import { CiLocationOn, CiStar } from 'react-icons/ci';
import { FaAngellist, FaRegArrowAltCircleRight } from 'react-icons/fa';
import { IoBedOutline } from 'react-icons/io5';

//components
import Slider from '../components/home/Slider';
import Banner from '../components/home/Banner';
import Adress from '../components/home/Adress';
// import Partners from '../components/home/Partners';
import BlogPost from '../components/home/BlogPost';
import { motion } from 'framer-motion';
//vatiants
import { fadeIn } from '../variants';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ModalCart from './ModalCart';
import { getUserId } from '../utils/jwt';
import { toast } from 'react-toastify';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');

  //Phòng khách sạn mới và phổ biến nhất
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/room/');
        setRooms(response.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

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

  return (
    <div>
      {/* Bạn lựa chọn đặt phòng khách sạn nào? */}
      <Banner />

      {/* Phòng khách sạn mới và phổ biến nhất */}
      <div className="px-4 md:px-[100px]">
        <div className="md:flex md:px-[50px]">
          <h2 className="text-[32px] md:text-[36px] font-archivo font-bold md:w-[500px] md:mt-6">Dịch vụ cứu hộ phổ biến nhất</h2>
          <p className="text-[18px] text-wrap font-archivo font-medium mt-10 md:w-[800px] md:pl-[250px]">
            Tìm các dịch vụ cứu hộ một cách nhanh chóng và chính xác.
          </p>
        </div>
        {/* service hotel */}
        <div className="mt-20 sm:grid sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-y-5">
          {rooms.map((room) => (
            <div key={room.room_id} className="mt-5 border-2 rounded-[30px] w-[350px] flex justify-center">
              <div className="px-5 py-5">
                <Link to={`/chi-tiet-phong/${room.room_id}`}>
                  <img src={room.thumbnail} alt={room.description} className="w-[350px] h-[250px] rounded-[25px]" />
                </Link>
                {/* <div className="relative flex items-center bg-yellow-500 w-[150px] rounded-xl justify-center top-[-240px] left-2">
                  <CiStar />
                  <h2 className="text-[13px] md:text-[15px] ml-2">{service.hotel.rating} (11) đánh giá</h2>
                </div> */}
                <div className="flex items-center bg-pink-200 w-[200px] rounded-xl justify-center mt-2">
                  <CiLocationOn />
                  <h2>
                    {room.area.name}, {room.hotel.address}
                  </h2>
                </div>
                <div className="mt-5 text-[20px] font-archivo font-semibold">{room.room_type}</div>
                <div className="flex items-center mt-3">
                  <FaAngellist />
                  <h2 className="text-[14px] md:text-[16px] ml-2">
                    {room.utilities.map((utility, index) => (
                      <span key={utility.utilities_id}>
                        {utility.name}
                        {index < room.utilities.length - 1 && ', '}
                      </span>
                    ))}
                  </h2>
                </div>

                {/*<div className="flex justify-between mt-5">*/}
                {/*  <h2 className="text-[18px] md:text-[22px]">{service.price_per_night}đ / Ngày</h2>*/}
                {/*  <button onClick={() => openModal(service.room_id)} className="h-[40px] w-[150px] bg-[#bfdbfe] rounded-[30px] hover:bg-red-500 font-archivo font-bold">*/}
                {/*    Thêm giỏ hàng*/}
                {/*  </button>*/}
                {/*</div>*/}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 pb-10">
          <motion.button
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
            className="flex items-center h-[50px] w-[250px] bg-white border-2 border-pink-200 justify-center rounded-[30px] hover:bg-red-500"
          >
            <Link to="/searchService">Xem thêm dịch vụ cứu hộ </Link>
            <FaRegArrowAltCircleRight />
          </motion.button>
        </div>
        {isModalOpen && <ModalCart roomId={selectedRoomId} onClose={closeModal} onAddToCart={handleAddToCart} />}
      </div>

      {/* Đánh giá từ những người đã trải nghiệm */}
      <div className="bg-bg-home-1 px-4 md:px-[100px] pb-10 pt-5">
        <div className="md:flex md:px-[50px] mt-5">
          <h2
            variants={fadeIn('right', 0.2)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
            className="text-[32px] md:text-[36px] font-archivo font-bold md:w-[500px] md:mt-6"
          >
            Đánh giá từ những người đã trải nghiệm
          </h2>
          <p
            variants={fadeIn('left', 0.2)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
            className="text-[18px] text-wrap font-archivo font-medium mt-10 md:w-[800px] md:pl-[250px]"
          >
            Khách hàng chia sẻ về những kỷ niệm tuyệt vời khi đến với chúng tôi.
          </p>
        </div>
        <img variants={fadeIn('right', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} src="./images/heading-border.webp" alt="" className="md:px-[50px] mt-5" />
        <div variants={fadeIn('right', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} className="pt-5 md:flex">
          <img src="./images/nhaykep1.png" alt="" className="md:px-[50px] h-[25px] md:h-[30px]" />
          <Slider />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <ModalCart roomId={selectedRoomId} onAddToCart={handleAddToCart} onClose={closeModal} />}

      {/* Các điểm đến */}
      <div className="mt-10 pb-10">
        <div variants={fadeIn('down', 0.2)} initial="hidden" whileInView={'show'} viewport={{ once: false, amount: 0.7 }} className="mx-5 md:text-center">
          <h2 className="text-[22px] md:text-[36px] font-archivo font-bold">Các chi nhánh của dịch vụ</h2>
          <p className="text-[14px] md:text-[19px] font-archivo text-green-900 mt-5 md:mt-0"></p>
        </div>
        <Adress />
      </div>

      {/* Đối tác */}
      {/*<Partners />*/}

      {/* Bài viết */}
      <BlogPost />
    </div>
  );
};

export default Home;
