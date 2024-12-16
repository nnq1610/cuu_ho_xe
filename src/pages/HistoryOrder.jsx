import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { MdPayments } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import RoomNotFound from '../components/allService/RoomNotFound';
import { getUserId } from '../utils/jwt';

const HistoryOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/order/')
      .then((response) => {
        const userId = getUserId();
        const filteredOrders = response.data.filter((order) => order.user === userId);
        setOrders(filteredOrders);

        // Check for expired orders with pending status
        filteredOrders.forEach((order) => {
          const orderTime = new Date(order.order_date);
          const expirationTime = new Date(orderTime.getTime() + 1 * 60 * 1000); // Expiration time 1 minute after order

          const now = new Date();
          if (expirationTime <= now && order.status === 'pending') {
            deleteExpiredOrder(order.id); // Call API to delete expired orders
          }
        });
      })
      .catch((error) => {
        console.error('There was an error fetching the orders!', error);
      });
  }, []);

  const handlePayment = (orderId, totalPrice) => {
    const formattedTotalPrice = Math.round(Number(totalPrice));

    // Display payment confirmation dialog
    Swal.fire({
      title: 'Xác nhận thanh toán',
      text: `Bạn muốn thanh toán ${formattedTotalPrice} Vnđ bằng ZaloPay ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://127.0.0.1:8000/zalopay/create-order/', {
            order_id: orderId,
            total_price: formattedTotalPrice,
          })
          .then((response) => {
            if (response.data && response.data.order_url) {
              window.location.href = response.data.order_url; // Redirect to payment page
              // After successful payment, update the order status
              updateOrderStatus(orderId, 'success');
            } else {
              Swal.fire('Lỗi', 'Có lỗi xảy ra khi tạo yêu cầu thanh toán', 'error');
            }
          })
          .catch((error) => {
            console.error('Error during payment creation:', error);
            Swal.fire('Lỗi', 'Có lỗi xảy ra khi xử lý thanh toán', 'error');
          });
      }
    });
  };

  // Update order status to 'success' after successful payment
  const updateOrderStatus = (orderId, status) => {
    axios
      .put(`http://127.0.0.1:8000/order/${orderId}/`, { status })
      .then(() => {
        setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'success' } : order)));
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
        Swal.fire('Lỗi', 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng', 'error');
      });
  };

  const deleteExpiredOrder = (orderId) => {
    axios
      .delete(`http://127.0.0.1:8000/order/${orderId}/`)
      .then((response) => {
        if (response.status === 204) {
          Swal.fire('Đã xóa', 'Đơn hàng của bạn đã bị xóa vì hết thời gian thanh toán', 'success');
          setOrders(orders.filter((order) => order.id !== orderId));
        } else {
          console.error('Unexpected status code:', response.status);
          Swal.fire('Lỗi', 'Không thể xóa đơn hàng', 'error');
        }
      })
      .catch((error) => {
        console.error('Error deleting order:', error);
        Swal.fire('Lỗi', 'Không thể xóa đơn hàng', 'error');
      });
  };

  // Countdown logic
  const calculateCountdown = (orderDate, orderStatus) => {
    const orderTime = new Date(orderDate);
    const expirationTime = new Date(orderTime.getTime() + 1 * 60 * 1000);
    const now = new Date();

    if (orderStatus === 'success') {
      return 'Đã thanh toán'; // Return 'Đã thanh toán' if status is success
    }

    const timeDiff = expirationTime - now;
    if (timeDiff <= 0) {
      return 'Đã hết hạn';
    }

    const minutes = Math.floor(timeDiff / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${minutes} phút ${seconds} giây`;
  };

  const Countdown = ({ orderDate, orderStatus }) => {
    const [countdown, setCountdown] = useState(calculateCountdown(orderDate, orderStatus));

    useEffect(() => {
      const interval = setInterval(() => {
        const updatedCountdown = calculateCountdown(orderDate, orderStatus);
        setCountdown(updatedCountdown);

        if (updatedCountdown === 'Đã hết hạn' || updatedCountdown === 'Đã thanh toán') {
          clearInterval(interval); // Stop the countdown when expired or paid
        }
      }, 1000);

      return () => clearInterval(interval); // Clean up the interval when component is unmounted
    }, [orderDate, orderStatus]);

    return <span>{countdown}</span>;
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Lịch Sử Đặt Phòng</h1>

      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {orders.length === 0 ? (
          <RoomNotFound />
        ) : (
          <div>
            {/* Table layout for large screens */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-blue-400 text-white">
                    <tr>
                      <th className="px-4 py-2 text-left whitespace-nowrap">Người đặt</th>
                      <th className="px-4 py-2 text-left whitespace-nowrap">Email</th>
                      <th className="px-4 py-2 text-left whitespace-nowrap">Số điện thoại</th>
                      <th className="px-4 py-2 text-left whitespace-nowrap">Thanh toán</th>
                      <th className="px-4 py-2 text-left whitespace-nowrap">Tổng Tiền</th>
                      <th className="px-4 py-2 text-left whitespace-nowrap">Trạng thái thanh toán</th>
                      <th className="px-4 py-2 text-left">Thời gian còn lại</th>
                      <th className="px-4 py-2 text-left whitespace-nowrap">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-100">
                        <td className="px-4 py-2">{order.full_name}</td>
                        <td className="px-4 py-2">{order.email}</td>
                        <td className="px-4 py-2">{order.phone_number}</td>
                        <td className="px-4 py-2">{order.payment_method}</td>
                        <td className="px-4 py-2">{order.total_price} VND</td>
                        <td className={`px-4 py-2 ${order.status === 'pending' ? 'text-blue-600' : 'text-red-600'}`}>{order.status === 'pending' ? 'Vui lòng thanh toán' : 'Đã thanh toán'}</td>
                        <td className="px-4 py-2">
                          <Countdown orderDate={order.order_date} orderStatus={order.status} />
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex space-x-2">
                            <Link to={`/lịch-sử-chi-tiết/${order.id}`} className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-300">
                              <FaRegEye />
                            </Link>
                            {order.status === 'pending' && (
                              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400" onClick={() => handlePayment(order.id, order.total_price)}>
                                <MdPayments />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card layout for small screens */}
            <div className="block md:hidden">
              {orders.map((order) => (
                <div key={order.id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{order.full_name}</h3>
                      <p>{order.email}</p>
                      <p>{order.phone_number}</p>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Tổng Tiền: {order.total_price} VND</span>
                      <span className="block text-sm text-gray-500">Trạng thái: {order.status === 'pending' ? 'Chưa thanh toán' : 'Đã thanh toán'}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Countdown orderDate={order.order_date} orderStatus={order.status} />
                  </div>
                  {order.status === 'pending' && (
                    <button className="mt-4 bg-green-500 text-white rounded px-4 py-2" onClick={() => handlePayment(order.id, order.total_price)}>
                      Thanh toán
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryOrder;
