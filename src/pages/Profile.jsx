import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../utils/jwt';
import Swal from 'sweetalert2';

const Profile = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({});
    const [editInfo, setEditInfo] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const token = localStorage.getItem('token');

    const fetchUserInfo = async () => {
        try {
            const uid = getUserId();
            const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/user/${uid}`, {
                headers: {
                    'x-access-token': token,
                },
            });
            setUserInfo(response.data.metadata);
            setEditInfo(response.data.metadata);
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
    };

    const handleSaveInfo = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_API_URL}/user/update`, editInfo, {
                headers: {
                    'x-access-token': token,
                },
            });
            if (response.status === 200) {
                setUserInfo(editInfo);
                setIsEditing(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Chỉnh sửa thành công!',
                });
            }
        } catch (error) {
            console.error('Error saving user info:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
            <h1 className="text-2xl font-bold mb-6">Thông Tin Cá Nhân</h1>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Họ tên</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editInfo.name}
                            onChange={(e) => setEditInfo({ ...editInfo, name: e.target.value })}
                            className="w-full border p-2 rounded"
                        />
                    ) : (
                        <p className="text-gray-700">{userInfo.name}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <p className="text-gray-700">{userInfo.email}</p>
                </div>

                <div>
                    <label className="block text-sm font-medium">Số điện thoại</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editInfo.phone}
                            onChange={(e) => setEditInfo({ ...editInfo, phone: e.target.value })}
                            className="w-full border p-2 rounded"
                        />
                    ) : (
                        <p className="text-gray-700">{userInfo.phone}</p>
                    )}
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
                {isEditing ? (
                    <>
                        <button
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() => setIsEditing(false)}
                        >
                            Hủy
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={handleSaveInfo}
                        >
                            Lưu
                        </button>
                    </>
                ) : (
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => setIsEditing(true)}
                    >
                        Chỉnh Sửa
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;
