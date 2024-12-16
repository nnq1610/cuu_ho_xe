import React from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const RoomNotFound = ({ isCartPage }) => {
  return (
    <div className="rounded-[30px] border-2 px-3 py-5 shadow">
      <div className="flex justify-center">
        <img src="./images/tiecnuoi.jpg" alt="" className="px-5 py-5" />
      </div>
      {isCartPage ? (
        <>
          <h2 className="text-[24px] md:text-[30px] text-center font-bold">Giỏ hàng của bạn hiện tại trống</h2>
          <p className="text-[16px] mt-3 md:text-[20px] font-light text-[#101828] text-center">Bạn hãy quay lại trang chủ thêm phòng vào giỏ hàng.</p>
        </>
      ) : (
        <>
          <h2 className="text-[24px] md:text-[30px] text-center font-bold">Không tìm thấy kết quả hợp dành cho bạn</h2>
          <p className="text-[16px] mt-3 md:text-[20px] font-light text-[#101828] text-center">Nhấn OK để bắt đầu tìm kiếm mới.</p>
        </>
      )}
      <div className="flex justify-center mt-5">
        <Link to="/" className="flex items-center justify-center gap-2 w-[100px] rounded-[30px] border-2 px-3 py-3 text-[14px] md:text-[18px] hover:bg-red-200">
          <div className="font-bold font-archivo cursor-pointer">OK</div>
          <IoMdArrowForward className="font-bold" />
        </Link>
      </div>
    </div>
  );
};

export default RoomNotFound;
