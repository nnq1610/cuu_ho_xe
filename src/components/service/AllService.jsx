import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiLocationOn } from 'react-icons/ci';
import { FaMoneyBillWave, FaCar } from 'react-icons/fa'; // Thêm biểu tượng
import { BsCardText } from 'react-icons/bs';
import {Link} from "react-router-dom";


const AllServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                const apiEndpoint = `${process.env.REACT_APP_BASE_API_URL}/rescue-unit/${userId}`;
                const response = await axios.get(apiEndpoint, {
                    headers: {
                        'x-access-token': token,
                        'x-user-id': userId,
                    },
                });
                const { metadata } = response.data;
                const allIncidentTypes = metadata.incidentTypes || [];


                setServices(allIncidentTypes);
            } catch (error) {
                console.error('Error fetching services data:', error);
            }
        };

        fetchService();
    }, []);

    return (
        <div className="px-6 md:px-20 mt-20">
            <h2 className="text-xl md:text-3xl font-archivo font-bold">Danh sách dịch vụ</h2>
            <img src="/images/heading-border.webp" alt="" className="mt-5" />
            <div className="mt-5">
                <div className="md:mt-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services && services.length > 0 ?

                            services.map((service) => (
                            <div key={service._id} className="border-2 rounded-2xl flex flex-col p-5 bg-white shadow-md">
                        <img
                            src={service.image || `/img.png`}
                            alt={`incident ${service.name || 'N/A'}`}
                            className="w-full h-[200px] max-w-full rounded-2xl border-purple-100 border-2"
                        />
                        {/* Tên dịch vụ */}
                        <div className="flex items-center mt-4">
                            <BsCardText className="text-black" />
                            <h2 className="text-sm md:text-base ml-2 font-semibold">{service.name || 'N/A'}</h2>
                        </div>
                        {/* Địa chỉ */}
                        <div className="flex items-center mt-2">
                            <CiLocationOn className="text-black" />
                            <h2 className="text-sm md:text-base ml-2">{service.address || 'N/A'}</h2>
                        </div>
                        {/* Giá tiền */}
                        <div className="flex items-center mt-2">
                            <FaMoneyBillWave className="text-black" />
                            <h2 className="text-sm md:text-base ml-2">{service.price || '0'} VNĐ</h2>
                        </div>
                        {/* Loại phương tiện */}
                        <div className="flex items-center mt-2">
                            <FaCar className="text-black" />
                            <h2 className="text-sm md:text-base ml-2">{service.vehicleType || 'N/A'}</h2>
                        </div>
                        <Link to={`/serviceDetail/${service._id}`} className="flex justify-center mt-4">
                            <button className="h-10 w-full md:w-36 bg-gray-300 rounded-full hover:bg-red-500 font-archivo font-bold text-gray-700 hover:text-white transition-colors">Xem chi tiết</button>
                        </Link>
                    </div>
                    ) ) : (
                            <p>Không có dịch vụ nào để hiển thị</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllServices;
