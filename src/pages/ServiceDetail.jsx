import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiLocationOn } from 'react-icons/ci';
import { FaMoneyBillWave, FaCar } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const [serviceData, setServiceData] = useState(null);
    const [userRole, setUserRole] = useState(''); // Add user role state
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchService = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
                const role = jwtDecode(token).role;
                const apiEndpoint = `http://localhost:5050/v1/api/rescue-units/incident-types/${serviceId}`;
                const response = await axios.get(apiEndpoint, {
                    headers: {
                        'x-access-token': token,
                        'x-user-id': userId,
                    },
                });
                setServiceData(response.data.metadata.incidentDetail);
                setUserRole(role); // Set user role from response
            } catch (error) {
                console.error('Error fetching service data:', error);
            }
        };

        fetchService();
    }, [serviceId]);

    const handleDeleteClick = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');

            const apiEndpoint = `http://localhost:5050/v1/api/rescue-units/incident-types/${serviceId}`;
            const response = await axios.delete(apiEndpoint, {
                headers: {
                    'x-access-token': token,
                    'x-user-id': userId,
                },
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Xoá thành công!',
                    text: response.data.message || 'Xoá dịch vụ thành công',
                    timer: 3000,
                    timerProgressBar: true,
                    willClose: () => {
                        navigate('/allServices', {
                            state: {
                                notify: {
                                    type: 'success',
                                    message: 'Xoá thành công!',
                                },
                            },
                        });
                    },
                });
                // alert(response.data.message || 'Xóa dịch vụ thành công!');
            } else {
                console.error('Unexpected response:', response);
                alert('Không thể xóa dịch vụ. Vui lòng thử lại sau!');
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Đã xảy ra lỗi khi xóa dịch vụ.');
        }
    };

    if (!serviceData) {
        return <div>Đang tải thông tin dịch vụ...</div>;
    }

    const handleEditClick = () => {
        navigate(`/edit-service/${serviceId}`, { state: { serviceData } });
    };

    return (
        <div className="px-4 md:px-20 lg:px-40">
            {/* Tiêu đề và ảnh */}
            <img src="/images/heading-border.webp" alt="" className="mt-10 mx-auto" />

            {/* Tên dịch vụ */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-blue-600 mt-5">
                {serviceData.name || 'Chưa có tên dịch vụ'}
            </h1>

            {/* Ảnh dịch vụ */}
            <div className="relative flex mt-10 gap-5 justify-center">
                <div className="h-[200px] sm:h-[300px] w-full md:w-[50%] overflow-hidden rounded-xl border-pink-100 border-2">
                    <img
                        src={serviceData.image}
                        alt="Dịch vụ"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Mô tả dịch vụ */}
            <div className="mt-10 text-center">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-800">
                    Giới thiệu về dịch vụ
                </h2>
                <img src="/images/heading-border.webp" alt="" className="mt-5 mx-auto" />
                <p className="text-sm md:text-base lg:text-lg text-gray-600 mt-5">
                    {serviceData.description || 'Chưa có mô tả'}
                </p>
            </div>

            {/* Chi tiết dịch vụ */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                {/* Loại phương tiện */}
                <div className="flex flex-col items-center">
                    <FaCar className="text-3xl text-gray-700 mb-2" />
                    <p className="text-base md:text-lg font-semibold text-gray-800">
                        {serviceData.vehicleType || 'Chưa có loại phương tiện'}
                    </p>
                    <span className="text-sm text-gray-500">Loại phương tiện sử dụng dịch vụ</span>
                </div>

                {/* Giá tiền */}
                <div className="flex flex-col items-center">
                    <FaMoneyBillWave className="text-3xl text-gray-700 mb-2" />
                    <p className="text-base md:text-lg font-semibold text-gray-800">
                        {serviceData.price ? `${serviceData.price} VNĐ` : 'Chưa có giá'}
                    </p>
                    <span className="text-sm text-gray-500">Chi phí dịch vụ</span>
                </div>

                {/* Địa chỉ */}
                <div className="flex flex-col items-center">
                    <CiLocationOn className="text-3xl text-gray-700 mb-2" />
                    <p className="text-base md:text-lg font-semibold text-gray-800">
                        {serviceData.address || 'Chưa có địa chỉ'}
                    </p>
                    <span className="text-sm text-gray-500">Địa điểm cung cấp dịch vụ</span>
                </div>
            </div>

            {/* Nút chỉnh sửa và xóa */}
            {userRole === 'rescue' && (
                <div className="mt-10 flex justify-center gap-4">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
                        onClick={handleEditClick} // Khi click vào sẽ chuyển trang chỉnh sửa
                    >
                        Chỉnh sửa dịch vụ
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600"
                        onClick={handleDeleteClick} // Thêm hàm xóa
                    >Xoá dịch vụ
                    </button>
                </div>
            )}
        </div>
    );
};

export default ServiceDetail;
