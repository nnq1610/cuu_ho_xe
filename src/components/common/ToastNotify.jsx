import { useEffect } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const ToastNotify = () => {
  const options = {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { notify } = location.state || {}; // Lấy thông tin notify từ location.state hoặc gán giá trị rỗng nếu không có

    if (notify) {
      toast[notify.type](notify.message, options); // Hiện thông báo toast với loại và thông điệp đã chỉ định

      // Xóa trạng thái notify sau khi hiển thị thông báo
      const newLocationState = { ...location.state }; // Tạo một bản sao của location.state
      delete newLocationState.notify; // Xóa trường notify

      // Sử dụng navigate để cập nhật vị trí mà không làm mới trang
      navigate(location.pathname, { state: newLocationState }); // Chuyển hướng đến đường dẫn hiện tại với trạng thái mới
    }
  }, [location, navigate]); // Thêm navigate vào danh sách phụ thuộc

  return (
    <div className="relative z-[9999999999999999]">
      <ToastContainer style={{ top: '100px' }} />
    </div>
  );
};

export default ToastNotify;
