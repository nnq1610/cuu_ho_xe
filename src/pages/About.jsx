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
          <p className="text-[14px] md:text-[18px] px-5 mt-3">
            Từ sự kiện doanh nghiệp đến họp mặt công ty, Haven Hotel cung cấp đầy đủ các dịch vụ và tiện nghi đáp ứng mọi nhu cầu của quý khách và đồng nghiệp.
          </p>
          <p className="text-[14px] md:text-[18px] px-5 mt-3">
            Dù quý khách muốn tổ chức một sự kiện hay các dịp kỷ niệm đặc biệt khác, Haven Hotel là lựa chọn tuyệt vời cho quý khách với phòng chức năng rộng lớn, được trang bị đầy đủ để sẵn sàng đáp
            ứng mọi yêu cầu.
          </p>
          <p className="text-[14px] md:text-[18px] px-5 mt-3">
            Hãy tận hưởng thời gian vui vẻ cùng cả gia đình với hàng loạt tiện nghi giải trí tại Haven Hotel, một khách sạn tuyệt vời phù hợp cho mọi kỳ nghỉ bên người thân. Hãy tận hưởng trải nghiệm
            lưu trú có một không hai tại tòa nhà mang đậm dấu ấn lịch sử của Haven Hotel, điều quý khách khó có thể tìm thấy tại bất kỳ đâu.
          </p>
          <p className="text-[14px] md:text-[18px] px-5 mt-3">
            Khách sạn này là lựa chọn hoàn hảo cho các kỳ nghỉ mát lãng mạn hay tuần trăng mật của các cặp đôi. Quý khách hãy tận hưởng những đêm đáng nhớ nhất cùng người thương của mình tại Haven
            Hotel. Nếu dự định có một kỳ nghỉ dài, thì Haven Hotel chính là lựa chọn dành cho quý khách. Với đầy đủ tiện nghi và chất lượng dịch vụ tuyệt vời, Haven Hotel sẽ khiến quý khách cảm thấy
            thoải mái như đang ở nhà vậy.
          </p>
          {/*<p className="text-[14px] md:text-[18px] px-5 mt-3">*/}
          {/*  Du lịch một mình cũng không hề kém phần thú vị và Haven Hotel là nơi thích hợp dành riêng cho những ai đề cao sự riêng tư trong kỳ lưu trú. Một trong những đặc điểm chính của khách sạn này*/}
          {/*  là các liệu pháp spa đa dạng. Hãy nâng niu bản thân bằng các liệu pháp thư giãn, phục hồi giúp quý khách tươi trẻ thân, tâm.*/}
          {/*</p>*/}
          {/*<p className="text-[14px] md:text-[18px] px-5 mt-3">*/}
          {/*  Hãy sẵn sàng đón nhận trải nghiệm khó quên bằng dịch vụ độc đáo và hoàn hảo của khách sạn cùng các tiện nghi đầy đủ, đáp ứng mọi nhu cầu của quý khách. Trung tâm thể dục của khách sạn là*/}
          {/*  một trong những tiện nghi không thể bỏ qua khi lưu trú tại đây. Hưởng thụ một ngày thư thái đầy thú vị tại hồ bơi dù quý khách đang du lịch một mình hay cùng người thân.*/}
          {/*</p>*/}
          {/*<p className="text-[14px] md:text-[18px] px-5 mt-3">*/}
          {/*  Quầy tiếp tân 24 giờ luôn sẵn sàng phục vụ quý khách từ thủ tục nhận phòng đến trả phòng hay bất kỳ yêu cầu nào. Nếu cần giúp đỡ xin hãy liên hệ đội ngũ tiếp tân, chúng tôi luôn sẵn sàng*/}
          {/*  hỗ trợ quý khách. Tận hưởng những món ăn yêu thích với phong cách ẩm thực đặc biệt từ Haven Hotel chỉ dành riêng cho quý khách.{' '}*/}
          {/*</p>*/}
          {/*<p className="text-[14px] md:text-[18px] px-5 mt-3">*/}
          {/*  Sóng WiFi phủ khắp các khu vực chung của khách sạn cho phép quý khách luôn kết nối với gia đình và bè bạn. Haven Hotel là khách sạn sở hữu đầy đủ tiện nghi và dịch vụ xuất sắc theo nhận*/}
          {/*  định của hầu hết khách lưu trú. Hãy sẵn sàng đón nhận những giây phút vô giá khó phai trong suốt kỳ nghỉ của quý khách tại Haven Hotel.{' '}*/}
          {/*</p>*/}
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
