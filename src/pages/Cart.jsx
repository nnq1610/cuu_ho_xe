import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import RoomNotFound from '../components/allRoom/RoomNotFound';
import { getUserId } from '../utils/jwt';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState(null);
  const [newCheckinDate, setNewCheckinDate] = useState('');
  const [newCheckoutDate, setNewCheckoutDate] = useState('');
  const navigate = useNavigate();

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

        // Lọc các ngày đã được đặt
        const dates = orders
          .filter((order) => !selectedCartItem || order.room_id === selectedCartItem.room)
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
  }, [selectedCartItem]);

  const isBooked = (date) => bookedDates.includes(date);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://127.0.0.1:8000/cart/`);
        setCartItems(response.data?.filter((item) => item.user_id === getUserId()));
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Không thể lấy các mục trong giỏ hàng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Lấy thông tin phòng khách sạn
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/room/');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  const getRoomDetails = (roomId) => {
    return rooms.find((room) => room.room_id === roomId);
  };

  const calculateTotalPrice = (checkinDate, checkoutDate, pricePerNight) => {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const numberOfNights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
    return numberOfNights * pricePerNight;
  };

  const calculateCartTotals = () => {
    let totalRooms = cartItems.length;
    let totalPrice = cartItems.reduce((acc, item) => {
      const room = getRoomDetails(item.room);
      const roomPrice = room ? calculateTotalPrice(item.checkin_date, item.checkout_date, room.price_per_night) : 0;
      return acc + roomPrice;
    }, 0);

    return { totalRooms, totalPrice };
  };

  const { totalRooms, totalPrice } = calculateCartTotals();

  const handleUpdateDateClick = (cartItem) => {
    setSelectedCartItem(cartItem);
    setNewCheckinDate(cartItem.checkin_date);
    setNewCheckoutDate(cartItem.checkout_date);
    setShowModal(true);
  };

  const handleSaveDates = async () => {
    try {
      const isDateConflict = bookedDates.some((date) => newCheckinDate === date || newCheckoutDate === date);

      if (isDateConflict) {
        toast.error('Ngày đã có người đặt trước, vui lòng chọn ngày khác!');
        return;
      }

      if (newCheckinDate >= newCheckoutDate) {
        toast.error('Ngày check-out phải sau ngày check-in!');
        return;
      }

      const response = await axios.put(`http://127.0.0.1:8000/cart/${selectedCartItem.id}/`, {
        ...selectedCartItem,
        checkin_date: newCheckinDate,
        checkout_date: newCheckoutDate,
      });

      if (response.status === 200) {
        setCartItems((prevItems) => prevItems.map((item) => (item.id === selectedCartItem.id ? { ...item, checkin_date: newCheckinDate, checkout_date: newCheckoutDate } : item)));
        setShowModal(false);
        toast.success('Ngày đã được cập nhật thành công.');
      } else {
        setError('Không thể cập nhật ngày. Kiểm tra lại thông tin và thử lại.');
        toast.error('Không thể cập nhật ngày. Kiểm tra lại thông tin và thử lại.');
      }
    } catch (error) {
      toast.error('Không thể cập nhật ngày. Kiểm tra lại thông tin và thử lại.');
    }
  };

  //xoa phong khoi gio hang
  const handleDeleteCartItem = async (cartItemId) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa phòng này khỏi giỏ hàng?',
      text: 'Xóa phòng !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://127.0.0.1:8000/cart/${cartItemId}/`);

          if (response.status === 204) {
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
            toast.success('Phòng đã được xóa khỏi giỏ hàng.');
          } else {
            toast.error('Không thể xóa phòng. Vui lòng thử lại.');
          }
        } catch (error) {
          console.error('Error deleting cart item:', error);
          toast.error('Không thể xóa phòng. Vui lòng thử lại.');
        }
      }
    });
  };

  return (
    <div>
      {loading ? (
        <p>Đang tải giỏ hàng...</p>
      ) : error ? (
        <p>{error}</p>
      ) : cartItems.length === 0 ? (
        <div className="mt-5 mb-5 px-20">
          <RoomNotFound isCartPage={true} />
        </div>
      ) : (
        <div className="flex items-center flex-col">
          <h2 className="text-[14px] md:text-[26px] font-bold font-archivo mt-5 text-[#14532d]">Giỏ hàng của bạn</h2>
          <div className="w-[90%] sm:flex sm:justify-between">
            <div className="sm:w-[60%]">
              {cartItems.map((item, index) => {
                const room = getRoomDetails(item?.room);
                const totalPrice = calculateTotalPrice(item?.checkin_date, item?.checkout_date, room?.price_per_night);

                return (
                  <div className="sm:flex sm:w-full mt-5 rounded-[20px] px-5 bg-inherit border-2 border-green-200 py-5 bg-pink-100 shadow-xl">
                    <div className="flex items-center justify-center w-[10%] font-semibold font-archivo">{index + 1}</div>
                    <Link to={`/chi-tiet-phong/${room?.room_id}`} key={item?.id} className="md:w-[30%] flex items-center justify-center">
                      <img src={`http://127.0.0.1:8000${item?.room_image}`} alt="" className="h-[120px] md:h-[180px]" />
                    </Link>
                    <div className="text-[#14532d] font-archivo w-[70%] pl-10">
                      <h3 className="mt-2 font-semibold text-[14px] md:text-[18px]">Phòng: {item?.room_type}</h3>

                      <div>
                        <p className="mt-3 font-thin text-[14px] md:text-[18px] cursor-pointer">Check-in: {item?.checkin_date}</p>
                        <p className="mt-3 font-thin text-[14px] md:text-[18px] cursor-pointer">Check-out: {item?.checkout_date}</p>
                      </div>

                      <p className="mt-3 font-thin text-[14px] md:text-[18px]">Tổng giá: {totalPrice} VND</p>
                    </div>
                    <div className="flex flex-col items-center mr-5 l">
                      <div
                        onClick={() => handleUpdateDateClick(item)}
                        className="cursor-pointer mt-3 bg-[#bfdbfe] flex items-center justify-center h-[40px] w-[150px] rounded-xl hover:bg-red-400 font-semibold font-archivo shadow-lg text-[14px] md:text-[15px]"
                      >
                        Cập nhập ngày
                      </div>
                      <div
                        onClick={() => handleDeleteCartItem(item.id)}
                        className="mt-3 cursor-pointer bg-[#bfdbfe] flex items-center justify-center h-[40px] w-[150px] rounded-xl hover:bg-red-400 font-semibold font-archivo shadow-lg text-[14px] md:text-[15px]"
                      >
                        Xóa
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="sm:w-[40%] bg-white">
              <div className="sm:mx-10 rounded-[20px] px-5 bg-inherit border-2 border-green-200 mt-5 py-5 bg-white flex flex-col items-center">
                <p className="mt-3 font-thin text-[14px] md:text-[18px]">Tổng số phòng: {totalRooms}</p>
                <p className="mt-3 font-thin text-[14px] md:text-[18px]">Tổng tiền: {totalPrice} VND</p>
                <Link to="/thanh-toán" state={{ cartItems, totalPrice }}>
                  <div className="mt-5 cursor-pointer bg-[#bfdbfe] flex items-center justify-center h-[40px] w-[150px] rounded-xl hover:bg-red-400 font-semibold font-archivo shadow-lg text-[14px] md:text-[15px]">
                    Thanh toán
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Date Update */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-md">
            <h3 className="text-lg font-bold mb-4 flex justify-center">Cập nhật ngày</h3>
            <div className="sm:flex gap-5">
              <label className="w-[50%]">Check-in: </label>
              <input type="date" value={newCheckinDate} onChange={(e) => setNewCheckinDate(e.target.value)} className="block mb-4 border" />
            </div>
            <div className="sm:flex gap-5 ">
              <label className="w-[50%]">Check-out: </label>
              <input type="date" value={newCheckoutDate} onChange={(e) => setNewCheckoutDate(e.target.value)} className="block mb-4 border" />
            </div>

            <div className="sm:flex justify-center">
              <button onClick={handleSaveDates} className="bg-green-500 text-white px-4 py-2 rounded ">
                OK
              </button>
              <button onClick={() => setShowModal(false)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
                Thoát
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
