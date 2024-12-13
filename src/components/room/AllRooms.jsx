import React, { useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const AllRooms = ({ unitId }) => {
  const [rooms, setRooms] = useState([]);
  // console.log('hotelId', hotelId);
  // Fetch room data from the API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/room/');
        const data = await response.json();

        // const filteredRooms = data.filter((room) => String(room.hotel.hotel_id) === String(hotelId));
        setRooms(data);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="px-6 md:px-20 mt-20">
      <h2 className="text-xl md:text-3xl font-archivo font-bold">Danh sách phòng</h2>
      <img src="/images/heading-border.webp" alt="" className="mt-5" />
      <div className="mt-5">
        <div className="md:mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {rooms.map((room) => (
              <div key={room.room_id} className="border-2 rounded-2xl flex flex-col p-5 bg-white shadow-md">
                <img src={room.thumbnail} alt={`Room ${room.room_id}`} className="w-full h-[200px] max-w-full rounded-2xl border-purple-100 border-2" />
                <div className="flex items-center bg-pink-200 w-max p-2 rounded-xl mt-2 ">
                  <CiLocationOn className="text-black" />
                  <h2 className="text-sm md:text-base ml-2">
                    {room.hotel.address}, {room.hotel.city}
                  </h2>
                </div>
                <div className="mt-4 text-lg font-archivo font-semibold text-gray-700 h-[80px]">{room.room_type}</div>
                <div className="flex items-center">
                  <h2 className="text-[15px] md:text-[24px] ml-2 font-archivo font-thin">{room.price_per_night} VNĐ / Ngày</h2>
                </div>
                <Link to={`/chi-tiet-phong/${room.room_id}`} className="flex justify-center mt-4">
                  <button className="h-10 w-full md:w-36 bg-gray-300 rounded-full hover:bg-red-500 font-archivo font-bold text-gray-700 hover:text-white transition-colors">Xem chi tiết</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
