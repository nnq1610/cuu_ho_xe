import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CiLocationOn, CiStar } from 'react-icons/ci';
import { IoBedOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const RoomList = ({ roomActiveId }) => {
  const [featuredRooms, setFeaturedRooms] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/room/')
      .then((response) => {
        setFeaturedRooms(response.data.filter((item) => item.room_id !== parseInt(roomActiveId)).slice(0, 4));
      })
      .catch((error) => {
        console.error('Error fetching featured rooms:', error);
      });
  }, [roomActiveId]);

  return (
    <div className="px-6 md:px-20 mt-20 mb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredRooms.map((room) => (
          <div key={room.id} className="border-2 rounded-2xl flex flex-col p-5 bg-white shadow-md">
            <img src={room.thumbnail} alt={`Room ${room.room_id}`} className="w-full h-[200px] max-w-full rounded-2xl" />
            <div className="flex items-center bg-pink-200 w-max p-2 rounded-xl mt-2">
              <CiLocationOn className="text-black" />
              <h2 className="text-sm md:text-base ml-2">
                {room.hotel.address}, {room.hotel.city}
              </h2>
            </div>
            <div className="mt-4 text-lg font-archivo font-semibold text-gray-700 h-[80px]">{room.room_type}</div>
            <div className="flex items-center mt-2">
              <h2 className="text-[16px] md:text-[20px] font-archivo">{room.price_per_night} VNĐ/ Ngày</h2>
            </div>
            <div className="flex items-center mt-2">
              <IoBedOutline className="text-gray-700" />
              <h2 className="text-sm md:text-base ml-2">{room.max_occupancy} người</h2>
            </div>
            <Link to={`/chi-tiet-phong/${room.room_id}`} className="flex justify-center mt-4">
              <button className="h-10 w-full md:w-36 bg-gray-300 rounded-full hover:bg-red-500 font-archivo font-bold text-gray-700 hover:text-white transition-colors">Xem chi tiết</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
