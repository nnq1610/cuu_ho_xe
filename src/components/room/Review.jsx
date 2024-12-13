import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { getUserId } from '../../utils/jwt';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Review = ({ hotelId }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const userId = getUserId();
    setIsLoggedIn(!!userId);

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/reviews/?hotel_id=${hotelId}`);
        const reviewData = response.data;
        console.log(reviewData);
        setReviews(reviewData);

        const filteredReviews = reviewData.filter((review) => review.hotel_id === parseInt(hotelId));
        setReviews(filteredReviews);

        const avgRating = filteredReviews.reduce((acc, review) => acc + parseFloat(review.rating), 0) / filteredReviews.length;
        setAverageRating(avgRating.toFixed(2));
      } catch (error) {
        toast.error('Lỗi khi tải đánh giá.');
      }
    };

    fetchReviews();
  }, [hotelId]);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  const handleToggleReviews = () => {
    setShowAll((prev) => !prev);
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmitReview = async () => {
    const review_date = new Date().toISOString().split('T')[0];

    const formData = new FormData();
    formData.append('hotel_id', hotelId);
    formData.append('user_id_id', getUserId());
    formData.append('comment', content);
    formData.append('review_date', review_date);
    formData.append('rating', rating);
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/reviews/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Review submitted successfully', response.data);
      toast.success('Bạn đã gửi đánh giá thành công.');
      setRating(0);
      setContent('');
      setImage(null);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(Object.values(error.response.data)[0][0]);
      } else {
        toast.error('Có lỗi xảy ra trên máy chủ. Vui lòng thử lại sau.');
      }
    }
  };

  return (
    <div className="px-[30px] md:px-[85px] mt-20">
      <h2 className="text-xl md:text-[32px] font-archivo font-bold">Đánh giá</h2>
      <img src="./images/heading-border.webp" alt="" className="mt-5" />

      {/* tỉ lệ đánh giá */}
      <div className="mt-5">
        <div className="flex bg-red-50 justify-between py-10 rounded-xl shadow-xl">
          <div className="w-[20%] text-[14px] font-archivo font-extralight flex justify-center items-center sm:text-[28px]">
            <h2>{averageRating > 0 ? averageRating : '5.00'}</h2> {/* Show default rating if no reviews */}
          </div>
          <div className="w-[80%] pl-5">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="w-full">
                <div className="flex items-center gap-5">
                  <h2 className="w-[150px] text-[14px] font-archivo font-extralight sm:text-[18px] text-center">{i + 1} sao</h2>
                  <div className="w-[100%] sm:w-[60%] h-[6px] rounded-full bg-white border-2"></div>
                  <h2 className="w-[150px] text-[14px] font-archivo font-extralight sm:text-[18px] text-center">0 đánh giá</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* khách hàng đánh giá */}
      <h2 className="text-[18px] font-archivo font-bold sm:text-[28px] mt-10">Các bài đánh giá</h2>
      <img src="./images/heading-border.webp" alt="" className="mt-5" />
      <div className="mt-10">
        {reviews.length === 0 ? (
          <div className="bg-red-50 py-10 rounded-xl shadow-md px-[50px] mb-5">
            <p className="text-red-500 text-[14px] md:text-[18px]">Chi nhánh chưa có đánh giá.</p>
          </div>
        ) : (
          displayedReviews.map((review) => (
            <div key={review.review_id} className="flex bg-red-50 justify-between py-10 rounded-xl shadow-md px-[50px] mb-5">
              <div className="text-[14px] font-archivo font-extralight sm:text-[28px]">
                <h2 className="flex gap-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <CiStar key={i} color={i < review.rating ? '#FFD700' : '#D3D3D3'} />
                  ))}
                </h2>
                <h2 className="text-[14px] font-archivo font-extralight sm:text-[18px] mt-5">
                  {review.user.first_name} {review.user.last_name}
                </h2>
                <h2 className="text-[14px] font-archivo font-extralight sm:text-[18px] mt-5">Nội dung: {review.comment}</h2>
                <h2 className="text-[14px] font-archivo font-extralight sm:text-[18px] mt-5">{review.review_date}</h2>
              </div>
            </div>
          ))
        )}

        {/* người dùng đánh giá */}
        {isLoggedIn ? (
          <div className="bg-red-50 py-10 rounded-xl shadow-md px-[50px] mb-5">
            <div className="text-[14px] font-archivo font-extralight sm:text-[28px]">
              <label className="block mb-2 text-[14px] md:text-[18px]">Đánh giá:</label>
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }, (_, index) => (
                  <CiStar key={index} size={34} color={index < rating ? '#FFD700' : '#D3D3D3'} onClick={() => handleStarClick(index)} className="cursor-pointer" />
                ))}
              </div>

              <label className="block mb-2 text-[14px] md:text-[18px]">Nội dung:</label>
              <textarea
                placeholder="Nhập nội dung đánh giá của bạn"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border rounded-md w-full px-3 py-2 mb-5 text-[14px] md:text-[16px]"
              />

              <label className="block mb-2 text-[14px] md:text-[18px]">Hình ảnh:</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="border rounded-md w-full px-3 py-2 mb-5 text-[14px] md:text-[16px]" />
            </div>

            <div className="flex justify-center mt-5">
              <button onClick={handleSubmitReview} className="text-[14px] md:text-[18px] w-[220px] h-[40px] bg-red-500 hover:bg-red-700 rounded-md text-white font-archivo font-semibold">
                Gửi đánh giá
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 py-10 rounded-xl shadow-md px-[50px] mb-5">
            <p className="text-red-500 text-[14px] md:text-[18px]">
              Bạn cần{' '}
              <Link to="/login" className="text-blue-500 underline hover:text-blue-700 text-[14px] md:text-[18px]">
                đăng nhập
              </Link>{' '}
              để gửi đánh giá.
            </p>
          </div>
        )}

        <div className="flex justify-center pb-10 mt-5">
          <button onClick={handleToggleReviews} className="text-[14px] md:text-[18px] w-[220px] h-[40px] bg-gray-200 rounded-[30px] hover:bg-red-200">
            {showAll ? 'Thu gọn' : 'Xem tất cả'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
