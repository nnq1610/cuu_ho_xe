import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ModalCart = ({ onClose, onAddToCart, roomId }) => {
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [bookedDates, setBookedDates] = useState([]);

  // Lấy ngày hôm nay
  const today = new Date();
  // Tính ngày mai
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    // Gọi API để lấy danh sách các đơn hàng và trích xuất các ngày đã đặt
    const fetchBookedDates = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/orderDetails/');
        const orders = await response.json();

        // Lọc các ngày đã được đặt theo room_id
        const dates = orders
          .filter((order) => order.room_id === roomId)
          .flatMap((order) => {
            const checkin = new Date(order.checkin_date);
            const checkout = new Date(order.checkout_date);
            const bookedDatesArray = [];
            // Tạo danh sách các ngày trong khoảng từ checkin đến checkout
            for (let d = checkin; d <= checkout; d.setDate(d.getDate() + 1)) {
              bookedDatesArray.push(new Date(d).toISOString().split('T')[0]);
            }
            return bookedDatesArray;
          });

        setBookedDates(dates);
      } catch (error) {
        console.error('Error fetching booked dates:', error);
        toast.error('Có lỗi khi tải dữ liệu ngày đã đặt!');
      }
    };

    fetchBookedDates();
  }, [roomId]);

  const handleAddToCart = async () => {
    if (!checkinDate || !checkoutDate) {
      toast.error('Vui lòng chọn ngày!');
      return;
    }

    try {
      // Kiểm tra xem có trùng ngày đặt không
      const isDateConflict = bookedDates.some(
        (date) => checkinDate === date || checkoutDate === date // Nếu ngày checkin hoặc checkout trùng với ngày đã đặt
      );

      if (isDateConflict) {
        toast.error('Ngày đã có người đặt trước, vui lòng chọn ngày khác!');
      } else {
        // Nếu không trùng thì thêm vào giỏ hàng
        onAddToCart(roomId, checkinDate, checkoutDate);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
      console.error(error);
    }
  };

  const isBooked = (date) => bookedDates.includes(date);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-bold">Thêm vào giỏ hàng</h2>
        <div className="mt-4">
          <label className="block mb-2">Ngày check-in:</label>
          <input
            type="date"
            value={checkinDate}
            onChange={(e) => setCheckinDate(e.target.value)}
            className="border rounded w-full p-2"
            min={tomorrowString} // Chỉ cho phép chọn ngày từ ngày mai trở đi
            // Disable ngày đã được đặt
            style={{
              backgroundColor: isBooked(checkinDate) ? 'red' : 'white',
              color: isBooked(checkinDate) ? 'white' : 'black',
            }}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Ngày check-out:</label>
          <input
            type="date"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
            className="border rounded w-full p-2"
            min={checkinDate || tomorrowString}
            style={{
              backgroundColor: isBooked(checkoutDate) ? 'red' : 'white',
              color: isBooked(checkoutDate) ? 'white' : 'black',
            }}
          />
        </div>
        <button onClick={handleAddToCart} className="mt-4 h-[40px] w-full bg-gray-300 rounded-[30px] hover:bg-red-500 font-archivo font-bold">
          Thêm vào giỏ hàng
        </button>
        <button onClick={onClose} className="mt-2 h-[40px] w-full bg-gray-200 rounded-[30px] hover:bg-red-300 font-archivo font-bold">
          Đóng
        </button>
      </div>
    </div>
  );
};

export default ModalCart;
