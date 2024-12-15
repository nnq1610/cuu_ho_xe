import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { getUserId } from '../../utils/jwt';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';

const Review = () => {
  const { serviceId } = useParams();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('token');

  const fetchUserInfo = async () => {
    try {
      const uid = getUserId();
      const response = await axios.get(`http://localhost:5050/v1/api/user/${uid}`, {
        headers: {
          'x-access-token': token,
        },
      });
      setName(response.data.name);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };

  const fetchReviews = async () => {
    if (!token) {
      toast.error('Bạn cần đăng nhập để xem đánh giá.');
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = `http://localhost:5050/v1/api/rescue-units/reviews/${serviceId}`;
      const response = await axios.get(apiUrl, {
        headers: {
          'x-access-token': token,
        },
      });

      const { metadata } = response.data;
      setReviews(metadata);

      // Tính điểm trung bình
      const totalRating = metadata.reduce((sum, review) => sum + review.rating, 0);
      setAverageRating(metadata.length > 0 ? totalRating / metadata.length : 0);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi tải đánh giá.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);

    fetchUserInfo();
    fetchReviews();
  }, [serviceId]);

  const handleToggleReviews = () => {
    setShowAll((prev) => !prev);
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmitReview = async () => {
    if (!rating || !content) {
      toast.error('Vui lòng đánh giá và nhập nội dung.');
      return;
    }

    try {
      const payload = {
        userId: getUserId(),
        content,
        rating,
        name,
      };

      await axios.post(
          `http://localhost:5050/v1/api/rescue-units/reviews/${serviceId}`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
          }
      );

      toast.success('Bạn đã gửi đánh giá thành công.');
      setRating(0);
      setContent('');
      fetchReviews();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(Object.values(error.response.data)[0][0]);
      } else {
        toast.error('Có lỗi xảy ra trên máy chủ. Vui lòng thử lại sau.');
      }
    }
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
      <div className="px-[30px] md:px-[85px] mt-20">
        <h2 className="text-xl md:text-[32px] font-archivo font-bold">Đánh giá</h2>
        <img src="./images/heading-border.webp" alt="" className="mt-5" />

        {/* Tỉ lệ đánh giá */}
        <div className="mt-5">
          <div className="flex bg-red-50 justify-between py-10 rounded-xl shadow-xl">
            <div className="w-[20%] text-[14px] font-archivo font-extralight flex justify-center items-center sm:text-[28px]">
              <h2>{averageRating.toFixed(2)}</h2>
            </div>
            <div className="w-[80%] pl-5">
              {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="w-full">
                    <div className="flex items-center gap-5">
                      <h2 className="w-[150px] text-[14px] font-archivo font-extralight sm:text-[18px] text-center">{i + 1} sao</h2>
                      <div className="w-[100%] sm:w-[60%] h-[6px] rounded-full bg-white border-2"></div>
                      <h2 className="w-[150px] text-[14px] font-archivo font-extralight sm:text-[18px] text-center">
                        {reviews.filter((review) => review.rating === i + 1).length} đánh giá
                      </h2>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Các bài đánh giá */}
        <h2 className="text-[18px] font-archivo font-bold sm:text-[28px] mt-10">Các bài đánh giá</h2>
        <img src="./images/heading-border.webp" alt="" className="mt-5" />
        <div className="mt-10">
          {isLoading ? (
              <div>Loading...</div>
          ) : reviews.length === 0 ? (
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
                      <h2 className="text-[14px] font-archivo font-extralight sm:text-[18px] mt-5">{review.userId.name}</h2>
                      <h2 className="text-[14px] font-archivo font-extralight sm:text-[18px] mt-5">Nội dung: {review.content}</h2>
                      <h2 className="text-[14px] font-archivo font-extralight sm:text-[18px] mt-5">{new Date(review.updatedAt).toLocaleString()}</h2>
                    </div>
                  </div>
              ))
          )}

          {/* Người dùng đánh giá */}
          {isLoggedIn ? (
              <div className="bg-red-50 py-10 rounded-xl shadow-md px-[50px] mb-5">
                <div className="text-[14px] font-archivo font-extralight sm:text-[28px]">
                  <label className="block mb-2 text-[14px] md:text-[18px]">Đánh giá:</label>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }, (_, index) => (
                        <CiStar
                            key={index}
                            size={34}
                            color={index < rating ? '#FFD700' : '#D3D3D3'}
                            onClick={() => handleStarClick(index)}
                            className="cursor-pointer"
                        />
                    ))}
                  </div>

                  <label className="block mb-2 text-[14px] md:text-[18px]">Nội dung:</label>
                  <textarea
                      placeholder="Nhập nội dung đánh giá của bạn"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="border rounded-md w-full px-3 py-2 mb-5 text-[14px] md:text-[16px]"
                  />
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
                  Bạn cần <Link to="/login" className="text-red-700 underline">đăng nhập</Link> để gửi đánh giá.
                </p>
              </div>
          )}

          {/* Nút hiển thị thêm */}
          {reviews.length > 2 && (
              <div className="flex justify-center mt-5">
                <button onClick={handleToggleReviews} className="text-[14px] md:text-[18px] w-[220px] h-[40px] bg-red-500 hover:bg-red-700 rounded-md text-white font-archivo font-semibold">
                  {showAll ? 'Ẩn bớt' : 'Xem thêm'}
                </button>
              </div>
          )}
        </div>
      </div>
  );
};

export default Review;
