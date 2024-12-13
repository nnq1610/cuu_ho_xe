import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      email: !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email),
      password: !formData.password,
      confirmPassword: formData.password !== formData.confirmPassword,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      try {
        const response = await fetch('http://127.0.0.1:8000/user/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const data = await response.json();
          Swal.fire({
            icon: 'success',
            title: 'Đăng ký thành công!',
            text: 'Chúc mừng bạn đã đăng ký tài khoản thành công.',
            timer: 3000,
            timerProgressBar: true,
            willClose: () => {
              navigate('/', {
                state: {
                  notify: {
                    type: 'success',
                    message: 'Đăng ký thành công!',
                  },
                },
              });
            },
          });
        } else {
          const errorData = await response.json();
          {
            Swal.fire({
              icon: 'error',
              title: 'Đăng ký thất bại!',
              text: errorData.detail || 'Có lỗi xảy ra.',
            });
          }
        }
      } catch (error) {
        console.error('Đã có lỗi xảy ra:', error);
        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra!',
          text: 'Vui lòng thử lại sau.',
        });
      }
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-re flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-center">
          <Link to="/">
            <img src="./images/logohavenhotel.png" alt="" className="w-[200px] h-[130px] mb-[30px]" />
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Tạo tài khoản</h2>
        <form id="registrationForm" onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">
              Họ
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập họ"
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-2">Không thể để trống.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
              Tên
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập tên"
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-2">Không thể để trống.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập email"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">Không thể để trống.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Mật khẩu
            </label>
            <input
              autoComplete=""
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập mật khẩu"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">Vui lòng nhập đúng định dạng.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập lại mật khẩu"
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">Mật khẩu không khớp.</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
            Đăng ký
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Bạn đã có tài khoản ?{' '}
          <Link to="/login" className="text-blue-500 font-semibold">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
