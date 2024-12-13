import React from 'react';

const Instruct = () => {
  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-[16px] md:text-3xl font-archivo font-semibold text-center mb-6">Hướng Dẫn Đặt Phòng</h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-[14px] md:text-[18px] font-archivo font-bold mb-4">Bước 1: Đăng Nhập</h2>
        <p className="mb-4 text-[14px] md:text-[18px] font-thin font-archivo">
          Để bắt đầu đặt phòng, bạn cần đăng nhập vào tài khoản của mình. Nếu chưa có tài khoản, bạn có thể tạo mới ngay trên trang web.
        </p>

        <h2 className="text-[14px] md:text-[18px] font-archivo font-bold mb-4">Bước 2: Chọn Chi Nhánh, Chọn Khách Sạn</h2>
        <p className="mb-4 text-[14px] md:text-[18px] font-thin font-archivo">
          Sau khi đăng nhập thành công, bạn sẽ được chuyển đến trang lựa chọn khách sạn. Tại đây, bạn có thể tìm kiếm các khách sạn theo tên, vị trí, hoặc loại phòng mà bạn muốn.
        </p>

        <h2 className="text-[14px] md:text-[18px] font-archivo font-bold mb-4">Bước 3: Chọn Phòng</h2>
        <p className="mb-4 text-[14px] md:text-[18px] font-thin font-archivo">
          Sau khi chọn khách sạn, bạn sẽ xem danh sách các phòng có sẵn ở giỏ hàng. Mỗi phòng sẽ có các thông tin như giá, diện tích, tiện ích, và trạng thái còn phòng. Chọn phòng bạn muốn đặt và nhấn
          vào "Chọn phòng".
        </p>

        <h2 className="text-[14px] md:text-[18px] font-archivo font-bold mb-4">Bước 4: Đặt Phòng</h2>
        <p className="mb-4 text-[14px] md:text-[18px] font-thin font-archivo">
          Sau khi chọn phòng, bạn sẽ được yêu cầu nhập thông tin cá nhân như tên, email, số điện thoại, và thời gian check-in, check-out. Hãy kiểm tra kỹ thông tin trước khi tiếp tục.
        </p>

        <h2 className="text-[14px] md:text-[18px] font-archivo font-bold mb-4">Bước 5: Thanh Toán</h2>
        <p className="mb-4 text-[14px] md:text-[18px] font-thin font-archivo">
          Sau khi hoàn tất việc nhập thông tin, bạn sẽ chuyển đến bước thanh toán. Bạn có thể thanh toán bằng thẻ tín dụng hoặc các phương thức khác tùy theo lựa chọn của hệ thống.
        </p>

        <h2 className="text-[14px] md:text-[18px] font-archivo font-bold mb-4">Bước 6: Xác Nhận Đặt Phòng</h2>
        <p className="mb-4 text-[14px] md:text-[18px] font-thin font-archivo">
          Sau khi thanh toán thành công, bạn sẽ nhận được thông báo xác nhận và thông tin chi tiết về đặt phòng của bạn. Bạn sẽ nhận được email xác nhận với các thông tin liên quan đến phòng và thời
          gian lưu trú.
        </p>

        <div className="text-center mt-6">
          <p className="text-xl font-semibold">Cảm ơn bạn rất nhiều!</p>
        </div>
      </div>
    </div>
  );
};

export default Instruct;
