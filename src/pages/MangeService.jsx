import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {jwtDecode} from 'jwt-decode';
import Loading from '../components/loading/loading';

const RescueForm = ({ serviceId }) => {
    const [formData, setFormData] = useState({
        name: '',
        vehicleType: '',
        price: '',
        address: '',
        description: '',
        image: null
    });
    const [isLoading, setIsLoading] = useState(false); // Chỉ hiển thị loading khi xử lý lưu

    useEffect(() => {
        if (serviceId) {
            axios
                .get(`/api/rescue-service/${serviceId}`)
                .then((response) => {
                    setFormData(response.data.metadata);
                })
                .catch((error) => console.error("Error fetching service data:", error));
        }
    }, [serviceId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Hiển thị loading ngay khi bắt đầu gửi API
        setIsLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('vehicleType', formData.vehicleType);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('image', formData.image);

        const apiEndpoint = `http://localhost:5050/v1/api/rescue-units/incident-types`
        const token = localStorage.getItem('token');
        axios
            .post(apiEndpoint, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': token
                },
            })
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng ký thành công!',
                    text: 'Chúc mừng bạn đã đăng ký tài khoản thành công.',
                    timer: 3000,
                    timerProgressBar: true,
            })})
            .catch((error) => {
                console.error('Đã có lỗi xảy ra:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Có lỗi xảy ra!',
                    text: 'Vui lòng thử lại sau.',
                });
            })
            .finally(() => setIsLoading(false)); // Tắt loading sau khi hoàn tất
    };

    return (
        <div className="w-1/2 mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <Loading message="Đang xử lý, vui lòng chờ..." />
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-lg font-semibold text-gray-700">Tên dịch vụ</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-semibold text-gray-700">Loại phương tiện</label>
                    <input
                        type="text"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-semibold text-gray-700">Giá</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-semibold text-gray-700">Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-semibold text-gray-700">Mô tả</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-semibold text-gray-700">Tải lên ảnh</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="py-2 px-6 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600 transition"
                        disabled={isLoading} // Vô hiệu hóa nút khi đang gửi
                    >
                        {isLoading ? "Đang lưu..." : "Lưu"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RescueForm;