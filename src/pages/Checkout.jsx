import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserId } from '../utils/jwt';
import useDebounce from '../hooks/useDebounce';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [vouchers, setVouchers] = useState([]);
  const [discount, setDiscount] = useState(0);

  const debouncedPromoCode = useDebounce(promoCode, 500);

  const handleConfirmPayment = async () => {
    if (!fullName || !email || !phoneNumber || !paymentMethod) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    let totalPrice = cartItems.reduce((total, item) => total + Number(item.total_price), 0);

    if (discount > 0) {
      totalPrice = totalPrice - (totalPrice * discount) / 100;
    }

    const orderData = {
      user: getUserId(),
      full_name: fullName,
      email: email,
      phone_number: phoneNumber,
      payment_method: paymentMethod,
      total_price: totalPrice.toString(),
      promo_code: promoCode || '',
      order_details: cartItems.map((item) => ({
        room: item.room,
        price: item.total_price,
      })),
    };

    try {
      if (paymentMethod === 'zalopay') {
        const zaloPayResponse = await axios.post('http://127.0.0.1:8000/zalopay/payment-order/', {
          user: getUserId(),
          full_name: fullName,
          email: email,
          order_id: orderData.order_id,
          total_price: totalPrice,
          phone_number: phoneNumber,
          promo_code: promoCode || '',
        });

        const { return_code, return_message, order_url } = zaloPayResponse.data;

        if (return_code === 1) {
          toast.success('Chuyển hướng đến thanh toán ZaloPay...');
          window.location.href = order_url;
        } else {
          toast.error(`Lỗi ZaloPay: ${return_message}`);
        }
      } else {
        // Xử lý các phương thức thanh toán khác
        const response = await axios.post('http://127.0.0.1:8000/order/', orderData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        toast.success('Đặt phòng thành công!');
        setCartItems([]);
        navigate('/');
      }
    } catch (error) {
      console.error('Error placing the order:', error);
      toast.error('Đã xảy ra lỗi, vui lòng thử lại!');
    }
  };

  useEffect(() => {
    if (location.state && location.state.cartItems) {
      setCartItems(location.state.cartItems);
    } else {
      navigate('/gio-hang');
    }
  }, [location, navigate]);

  useEffect(() => {
    if (promoCode) {
      const fetchVouchers = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/vouchers/');
          setVouchers(response.data);
          const voucher = response.data.find((v) => v.code === promoCode);
          if (!voucher) {
            toast.error('Mã khuyến mãi không tồn tại!');
            setDiscount(0);
          } else if (!voucher.is_active || voucher.usage_count <= 0 || new Date() > new Date(voucher.end_date)) {
            toast.error('Mã khuyến mãi không dùng được!');
            setDiscount(0);
          } else {
            setDiscount(Number(voucher.discount_percentage));
            toast.success(`Áp dụng mã giảm giá: ${voucher.discount_percentage}%`);
          }
        } catch (error) {
          console.error('Error fetching vouchers:', error);
          toast.error('Lỗi khi tải mã khuyến mãi');
        }
      };
      fetchVouchers();
    }
  }, [debouncedPromoCode]);

  const handlePromoCodeChange = (e) => {
    const enteredCode = e.target.value.trim();
    setPromoCode(enteredCode);

    if (!enteredCode) {
      setDiscount(0);
      return;
    }
  };

  return (
    <div className="mb-[30px]">
      <h2 className="text-[14px] md:text-[26px] font-bold font-archivo mt-8 text-[#14532d] text-center">Thanh toán</h2>
      <div className="flex items-center mt-5 justify-center">
        <div className="sm:flex sm:justify-between w-[90%]">
          <div className="sm:w-[60%] flex flex-col items-center">
            {/* Customer Information */}
            <div className="sm:w-[90%] rounded-[20px] px-5 bg-inherit border-2 border-green-200 py-5 shadow-xl">
              <h2 className="text-[14px] md:text-[20px] font-bold font-archivo mt-5 text-[#14532d]">Thông tin khách hàng</h2>
              <hr className="mt-3" />
              <input
                type="text"
                placeholder="Họ và tên"
                className="h-[40px] sm:h-[45px] w-full rounded-[20px] px-5 bg-inherit border-2 border-green-200 mt-5"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <div className="flex gap-2 sm:gap-3 justify-between">
                <input
                  type="text"
                  placeholder="Email"
                  className="h-[40px] sm:h-[45px] w-full rounded-[20px] px-5 bg-inherit border-2 border-green-200 mt-5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  className="h-[40px] sm:h-[45px] w-full rounded-[20px] px-5 bg-inherit border-2 border-green-200 mt-5"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Promo Code */}
            <div className="sm:w-[90%] rounded-[20px] px-5 bg-inherit border-2 border-green-200 py-5 shadow-xl mt-5">
              <h2 className="text-[14px] md:text-[20px] font-bold font-archivo mt-5 text-[#14532d]">Mã khuyến mãi</h2>
              <hr className="mt-3" />
              <input
                type="text"
                placeholder="Nhập mã khuyến mãi (tùy chọn)"
                className="h-[40px] sm:h-[45px] w-full rounded-[20px] px-5 bg-inherit border-2 border-green-200 mt-5"
                value={promoCode}
                onChange={handlePromoCodeChange}
              />
            </div>

            {/* Order Summary */}
            <div className="sm:w-[90%] rounded-[20px] px-5 bg-inherit border-2 border-green-200 py-5 shadow-xl mt-5">
              <h2 className="text-[14px] md:text-[20px] font-bold font-archivo mt-5 text-[#14532d]">Phòng đặt</h2>
              <hr className="mt-3" />
              {cartItems?.map((item, index) => (
                <div key={index} className="mt-5 flex">
                  <div className="w-[33%]">
                    <img src={`http://127.0.0.1:8000${item?.room_image}`} alt={item.room_type} className="rounded-[10px] w-[100px] h-auto" />
                  </div>
                  <div className="flex gap-2 w-[33%]">
                    <label className="text-[14px] md:text-[16px] font-semibold text-[#14532d]">Tên phòng:</label>
                    <div className="text-[14px] md:text-[16px] text-gray-700">{item?.room_type}</div>
                  </div>
                  <div className="flex gap-2 w-[33%]">
                    <label className="text-[14px] md:text-[16px] font-semibold text-[#14532d]">Giá tiền:</label>
                    <div className="text-[14px] md:text-[16px] text-gray-700">{Number(item?.total_price).toLocaleString()} VNĐ</div>
                  </div>
                </div>
              ))}
              <div className="mt-5 text-center">
                <label className="text-[14px] md:text-[16px] font-semibold text-[#14532d]">Tổng tiền:</label>
                <div className="text-[14px] md:text-[16px] text-gray-700">{(cartItems?.reduce((total, item) => total + Number(item.total_price), 0) * (1 - discount / 100)).toLocaleString()} VNĐ</div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="sm:w-[40%]">
            <div className="sm:w-[90%] rounded-[20px] px-5 bg-inherit border-2 border-green-200 py-5 shadow-xl mt-5 sm:mt-0">
              <h2 className="text-[14px] md:text-[20px] font-bold font-archivo mt-5 text-[#14532d]">Thanh toán</h2>
              <hr className="mt-3" />
              <select className="h-[40px] sm:h-[45px] w-full rounded-[20px] px-5 bg-inherit border-2 border-green-200 mt-5" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="">Chọn phương thức thanh toán</option>
                {/* <option value="atm">Thanh toán ATM</option> */}
                <option value="Tiền mặt">Thanh toán tiền mặt</option>
                <option value="postpaid">Thanh toán trả sau</option>
                {/* <option value="vnpay">Thanh toán VNPay</option> */}
                <option value="zalopay">Thanh toán Zalo Pay</option>
              </select>
              <button className="mt-5 w-full text-white bg-green-500 hover:bg-green-700 py-2 px-4 rounded-[20px]" onClick={handleConfirmPayment}>
                Xác nhận thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
