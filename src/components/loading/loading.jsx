import React from 'react';

const Loading = ({ message = "Đang xử lý..." }) => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent border-t-4 rounded-full animate-spin"></div>
            <span className="text-blue-500 font-semibold">{message}</span>
        </div>
    );
};

export default Loading;