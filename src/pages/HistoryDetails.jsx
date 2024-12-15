import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HistoryDetails = () => {
  const { orderId } = useParams(); // Get the orderId from the URL
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/orderDetails/`)
      .then((response) => {
        const filteredDetails = response.data.filter((detail) => detail.order_id === parseInt(orderId));
        setOrderDetails(filteredDetails);
        console.log(response.data.filter((detail) => detail.order_id === parseInt(orderId)));
      })
      .catch((error) => {
        console.error('There was an error fetching the order details!', error);
      });
  }, [orderId]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Chi Tiết Đơn Hàng</h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {orderDetails.length === 0 ? (
          <p>Đang tải chi tiết đơn hàng...</p>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-4">Thông Tin Phòng</h3>
            <div className="overflow-x-auto">
              {/* Table on larger screens, cards on mobile */}
              <div className="hidden md:block">
                <table className="min-w-full table-auto">
                  <thead className="bg-blue-400 text-white">
                    <tr>
                      <th className="px-4 py-2 text-left">Mã Phòng</th>
                      <th className="px-4 py-2 text-left">Giá</th>
                      <th className="px-4 py-2 text-left">Ngày Nhận Phòng</th>
                      <th className="px-4 py-2 text-left">Ngày Trả Phòng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails.map((detail) => (
                      <tr key={detail.id} className="border-b hover:bg-gray-100">
                        <td className="px-4 py-2">{detail.room_id}</td>
                        <td className="px-4 py-2">{detail.price} VND</td>
                        <td className="px-4 py-2">{detail.checkin_date}</td>
                        <td className="px-4 py-2">{detail.checkout_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="block md:hidden">
                {orderDetails.map((detail) => (
                  <div key={detail.id} className="mb-4 p-4 bg-white rounded-lg shadow-lg border">
                    <div className="flex justify-between px-3">
                      <h4 className="text-[14px] font-archivo font-normal">Mã Phòng</h4>
                      <p className="text-[14px] font-archivo font-normal">{detail.room_id}</p>
                    </div>
                    <div className="flex justify-between px-3">
                      <h4 className="text-[14px] font-archivo font-normal">Giá</h4>
                      <p className="text-[14px] font-archivo font-normal">{detail.price} VND</p>
                    </div>
                    <div className="flex justify-between px-3">
                      {' '}
                      <h4 className="text-[14px] font-archivo font-normal">Ngày Nhận Phòng</h4>
                      <p className="text-[14px] font-archivo font-normal">{detail.checkin_date}</p>
                    </div>
                    <div className="flex justify-between px-3">
                      <h4 className="text-[14px] font-archivo font-normal">Ngày Trả Phòng</h4>
                      <p className="text-[14px] font-archivo font-normal">{detail.checkout_date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryDetails;
