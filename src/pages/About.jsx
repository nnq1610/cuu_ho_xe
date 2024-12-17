import React from 'react';
import { IoArrowRedo, IoLocationOutline } from 'react-icons/io5';
import { PiCrownThin } from 'react-icons/pi';
import Adress from '../components/home/Adress';

const About = () => {
  return (
    <div>
      {/* Giới thiệu */}
      <div className="mx-[10px] md:mx-[40px] px-[30px] mt-3 md:mt-10 border-2 rounded-[15px] bg-white shadow-xl pb-[30px]">
        <div>
          <h2 className="text-[18px] md:text-[32px] font-archivo font-bold flex items-center gap-3 mt-5 justify-center text-green-900">
            <PiCrownThin />
            Quang dep zai
            <PiCrownThin />
          </h2>
          <div className=" flex items-center justify-center mt-3">
            <p className="w-[120px] h-[25px] px-5 bg-blue-200 flex items-center justify-center rounded-xl">Cứu hộ</p>
          </div>
          <p className="text-[24px] text-yellow-300 flex items-center justify-center mt-3">★★★★★</p>
        </div>

        {/* Mô tả */}
        <div className="mt-5">
          <h2 className="text-[18px] md:text-[22px] px-5 bg-blue-200 flex items-center justify-center rounded-xl text-green-900 font-archivo font-bold">Mô tả</h2>
          <p className="text-[14px] md:text-[18px] px-5 mt-5">
            Khi không may gặp sự cố trên đường, dịch vụ cứu hộ của chúng tôi sẽ là giải pháp lý tưởng giúp bạn giải quyết vấn đề một cách nhanh chóng và hiệu quả. Với đội ngũ nhân viên chuyên nghiệp,
            bạn sẽ cảm thấy an tâm và an toàn khi được hỗ trợ. Chúng tôi cung cấp dịch vụ cứu hộ 24/7, sẵn sàng giúp đỡ bạn bất cứ lúc nào và ở bất kỳ đâu.
          </p>
          <p className="text-[14px] md:text-[18px] px-5 mt-3">
            Dịch vụ cứu hộ của chúng tôi được thiết kế để mang lại sự tiện lợi và nhanh chóng cho khách hàng. Được trang bị đầy đủ thiết bị cứu hộ hiện đại, chúng tôi cam kết mang lại giải pháp khẩn
            cấp hiệu quả nhất. Bạn chỉ cần gọi, và chúng tôi sẽ có mặt ngay lập tức để giúp bạn khắc phục sự cố.
          </p>
        </div>

        <div className="sm1:flex sm1:justify-between gap-[30px] mt-5">
          {/* Tiện ích */}
          <div className="sm1:w-[50%]">
            <div className="sm1:mx-[20px] flex justify-center mt-3">
              <h2 className="text-[18px] w-full md:text-[22px] px-5 bg-blue-200 flex items-center justify-center rounded-xl text-green-900 font-archivo font-bold">Tiện ích</h2>
            </div>
            <div className="w-full grid md:grid-cols-2 mx-[80px]">
              <div className="flex items-center gap-5 mt-5">
                <img src="./images/svg/maylanh.svg" alt="" className="w-[20px] h-[20px]" />
                <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[100px]">Máy lạnh</h2>
              </div>
              <div className="flex items-center gap-5 mt-5">
                <img src="./images/svg/wifi.svg" alt="" className="w-[20px] h-[20px]" />
                <h2 className="text-[14px] md:text-[18px] font-archivo font-thin w-[100px]">Wifi</h2>
              </div>
              <div className="flex items-center gap-5 mt-5">
                <img src="./images/svg/letan.svg" alt="" className="w-[20px] h-[20px]" />
                <h2 className="text-[14px] md:text-[18px] font-archivo font-thin w-[100px]">Lễ tân 24h</h2>
              </div>
              <div className="flex items-center gap-5 mt-5">
                <img src="./images/svg/hoboi.svg" alt="" className="w-[20px] h-[20px]" />
                <h2 className="text-[14px] md:text-[18px] font-archivo font-thin w-[100px]">Hồ Bơi</h2>
              </div>
              <div className="flex items-center gap-5 mt-5">
                <img src="./images/svg/thangmay.svg" alt="" className="w-[20px] h-[20px]" />
                <h2 className="text-[14px] md:text-[18px] font-archivo font-thin w-[100px]">Thang máy</h2>
              </div>
              <div className="flex items-center gap-5 mt-5">
                <img src="./images/svg/an.svg" alt="" className="w-[20px] h-[20px]" />
                <h2 className="text-[14px] md:text-[18px] font-archivo font-thin w-[100px]">Ăn</h2>
              </div>
            </div>
          </div>
          {/* vị trí */}
          <div className="sm1:w-[50%]">
            <div className="sm1:mx-[20px] flex justify-center mt-3">
              <h2 className="text-[18px] w-full md:text-[22px] px-5 bg-blue-200 flex items-center justify-center rounded-xl text-green-900 font-archivo font-bold">Vị trí</h2>
            </div>
            <div className="w-full grid md:grid-cols-2">
              <div className="w-full mx-[80px]">
                <div className="flex items-center gap-5 mt-5">
                  <IoLocationOutline />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[100px]">Vị trí</h2>
                </div>
                <div className="flex gap-3 items-center ml-5">
                  <IoArrowRedo />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[100px] mt-3">Hải Châu</h2>
                </div>
                <div className="flex gap-3 items-center ml-5">
                  <IoArrowRedo />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[100px] mt-3">Hòa Khánh</h2>
                </div>
                <div className="flex gap-3 items-center ml-5">
                  <IoArrowRedo />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[100px] mt-3">Sơn Trà</h2>
                </div>
              </div>
              <div className="w-full mx-[80px]">
                <div className="flex items-center gap-5 mt-5">
                  <IoLocationOutline />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[200px]">Vị trí thuận tiện</h2>
                </div>
                <div className="flex gap-3 items-center ml-5">
                  <IoArrowRedo />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[200px] mt-3">Bệnh viện Hoàn Mỹ</h2>
                </div>
                <div className="flex gap-3 items-center ml-5">
                  <IoArrowRedo />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[200px] mt-3">Cầu rồng</h2>
                </div>
                <div className="flex gap-3 items-center ml-5">
                  <IoArrowRedo />
                  <h2 className="text-[14px] md:text-[18px] font-archivo font-thin sm:w-[200px] mt-3">Cầu sông Hàn</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chi nhánh */}
      <Adress />
    </div>
  );
};

export default About;
