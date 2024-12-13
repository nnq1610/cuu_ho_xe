import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/loading/loading';

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/vouchers/')
      .then((response) => {
        console.log('API response:', response.data);
        setVouchers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch vouchers');
        setLoading(false);
      });
  }, []);

  const copyToClipboard = (code, usageCount) => {
    if (usageCount === 0) {
      toast.error('Voucher đã hết lượt sử dụng!');
      return;
    }

    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast.success('Mã voucher đã được sao chép!');
      })
      .catch((err) => {
        toast.error('Không thể sao chép mã voucher: ' + err);
      });
  };

  const isVoucherExpired = (endDate) => {
    const currentDate = new Date();
    const voucherEndDate = new Date(endDate);
    return currentDate > voucherEndDate;
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-[16px] md:text-3xl font-archivo font-semibold text-center mb-6">Danh Sách Voucher</h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="space-y-6">
          {/* Tiêu đề cho mỗi cột */}
          <div className="hidden md:flex justify-between items-center border-b py-2">
            <div className="flex-1">
              <p className="font-semibold font-archivo text-[16px] md:text-[18px]">Mã Voucher</p>
            </div>
            <div className="flex-1">
              <p className="font-semibold font-archivo text-[16px] md:text-[18px]">Giảm Giá</p>
            </div>
            <div className="flex-1">
              <p className="font-semibold font-archivo text-[16px] md:text-[18px]">Số Lượng</p>
            </div>
            <div className="flex-1">
              <p className="font-semibold font-archivo text-[16px] md:text-[18px]">Hành Động</p>
            </div>
          </div>

          {/* Lọc và duyệt qua danh sách vouchers */}
          {vouchers
            .filter((voucher) => voucher.is_active) // Chỉ hiển thị các mã khuyến mãi có is_active: true
            .map((voucher) => {
              const expired = isVoucherExpired(voucher.end_date);
              const isDisabled = voucher.usage_count === 0 || expired;

              return (
                <div key={voucher.voucher_id} className={`flex flex-col md:flex-row justify-between items-center border-b py-4 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <div className="flex-1">
                    <p className="text-sm text-red-500 font-semibold">{voucher.code}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{voucher.discount_percentage}%</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Số Lượng: {voucher.usage_count}</p>
                  </div>
                  <div className="flex-1 mt-4 md:mt-0">
                    <button
                      onClick={() => copyToClipboard(voucher.code, voucher.usage_count)}
                      className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-300"
                      disabled={isDisabled} // Disable button if voucher is expired or usage count is 0
                    >
                      Sao Chép
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Voucher;
