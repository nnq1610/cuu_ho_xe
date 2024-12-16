import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditService = () => {
    const { serviceId } = useParams();
    const location = useLocation();
    const [serviceData, setServiceData] = useState(location.state?.serviceData || {});
    const [image, setImage] = useState(serviceData.image || '');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Lưu file ảnh trực tiếp
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: serviceData.name,
                description: serviceData.description,
                price: serviceData.price,
                image: typeof image === 'string' ? image : null, // Nếu đã là URL thì gửi trực tiếp
                vehicleType: serviceData.vehicleType,

            };

            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${process.env.REACT_APP_BASE_API_URL}/rescue-units/incident-types/${serviceId}`,
                payload,
                {
                    headers: {
                        'x-access-token': token,
                    },
                }
            );
            Swal.fire({
                icon: 'success',
                title: 'Đăng ký thành công!',
                text: 'Chúc mừng bạn đã đăng ký tài khoản thành công.',
                timer: 3000,
                timerProgressBar: true,
                // willClose: () => {
                //     navigate('/', {
                //         state: {
                //             notify: {
                //                 type: 'success',
                //                 message: 'Đăng ký thành công!',
                //             },
                //         },
                //     });
                // },
            });
        } catch (error) {
            console.error('Error updating service:', error.response?.data || error);
            Swal.fire({
                icon: 'error',
                title: 'Đăng ký thất bại!',
                text: error.detail || 'Có lỗi xảy ra.',
            });        }
    };



    return (
        <div className="px-4 md:px-20 lg:px-40">
            <h1 className="text-3xl font-bold text-center text-blue-600 mt-5">
                Chỉnh sửa dịch vụ</h1>

            {/* Form chỉnh sửa */}
            <form onSubmit={handleSubmit} className="mt-10">
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700" htmlFor="name">
                        Tên dịch vụ
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={serviceData.name || ''}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                        placeholder="Tên dịch vụ"
                    />
                </div>

                {/* Phần chỉnh sửa hình ảnh */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700" htmlFor="image">
                        Hình ảnh dịch vụ
                    </label>
                    <div className="flex items-center gap-4 mt-2">
                        <img
                            src={image || '/placeholder-image.jpg'}
                            alt="Dịch vụ"
                            className="h-24 w-24 object-cover border rounded"
                        />
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e)}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700" htmlFor="vehicleType">
                        Loại phương tiện
                    </label>
                    <select
                        id="vehicleType"
                        name="vehicleType"
                        value={serviceData.vehicleType || ''}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                    >
                        <option value="">Chọn loại phương tiện</option>
                        <option value="Car">Ô tô</option>
                        <option value="Bike">Xe máy</option>
                        <option value="Truck">Xe tải</option>
                        {/* Thêm các tùy chọn khác nếu cần */}
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700" htmlFor="description">
                        Mô tả
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={serviceData.description || ''}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                        placeholder="Mô tả dịch vụ"
                        rows="4"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700" htmlFor="price">
                        Giá tiền (VNĐ)
                    </label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        value={serviceData.price || ''}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                        placeholder="Giá dịch vụ"
                    />
                </div>

                <button type="submit"
                        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
                    Cập nhật
                </button>
            </form>

        </div>
    );
};

export default EditService;
