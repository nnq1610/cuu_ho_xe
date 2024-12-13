import React, { useState } from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { getUserId } from '../../utils/jwt';
import { toast } from 'react-toastify';
import axios from 'axios';
import ModalCart from '../../pages/ModalCart';

const RoomFilter = ({ room }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
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
    <div className="rounded-[30px] border-2 px-3 py-5 shadow mb-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3">
          <img src={`http://127.0.0.1:8000${room?.thumbnail}`} alt={room?.room_type} className="w-full h-[200px] object-cover rounded-lg" />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-xl font-semibold mb-3">{room?.room_type || 'Room Type'}</h2>
          <div className="text-sm text-gray-600 mb-2">
            {room?.hotel?.address} {''}
            {room?.area?.name}
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {room?.utilities?.length > 0 ? (
              room.utilities.map((utility, index) => (
                <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                  {utility.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No utilities listed</span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room?.price_per_night || 0)} / Phòng</p>
            <button onClick={() => openModal(room.room_id)} className="bg-[hsl(243,48%,61%)] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-500" title="Book this room now">
              Thêm giỏ hàng
              <IoMdArrowForward/>
            </button>
          </div>
          {isModalOpen && <ModalCart roomId={selectedRoomId} onClose={closeModal} onAddToCart={handleAddToCart} />}
        </div>
      </div>
    </div>
  );
};

export default RoomFilter;
