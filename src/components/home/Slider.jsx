import React, { useEffect, useState } from 'react';
import { PiCrownThin } from 'react-icons/pi';

const Slider = () => {
  const fixedReviews = [
    {
      name: 'Quang',
      rating: 2,
      comment: 'Hãng này sửa ok',
    },
    {
      name: 'Bình',
      rating: 5,
      comment: 'Dịch vụ tốt, nhân viên thân thiện!',
    },
    {
      name: 'Trang',
      rating: 4,
      comment: 'Hỗ trợ nhanh, xe được cứu kịp thời.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  useEffect(() => {
    if (autoSlide && fixedReviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % fixedReviews.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [autoSlide, fixedReviews.length]);

  const handleNameClick = (index) => {
    setAutoSlide(false);
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    const starCount = Math.round(rating);
    return (
        <div className="flex text-[32px]">
          {Array.from({ length: starCount }, (_, index) => (
              <span key={index} className="text-yellow-500">
            ★
          </span>
          ))}
          {Array.from({ length: 5 - starCount }, (_, index) => (
              <span key={index + starCount} className="text-gray-300">
            ★
          </span>
          ))}
        </div>
    );
  };

  const currentReview = fixedReviews.length > 0 ? fixedReviews[currentIndex] : null;

  return (
      <div className="mt-3 md:ml-[150px] md:w-full">
        <p className="text-[20px] md:text-[30px] text-wrap font-archivo font-thin flex gap-5 items-center">
          <PiCrownThin />
          Rescue Service
          <PiCrownThin />
        </p>
        <div className="mt-2 mb-3">
          {currentReview && renderStars(currentReview.rating)}
        </div>
        <div className="mb-4">
          <h2 className="mt-1 text-[14px] md:text-[19px] text-wrap font-archivo font-thin text-blue-950">
            {currentReview ? currentReview.comment : 'Loading review...'}
          </h2>
          <h3 className="mt-2 text-[16px] md:text-[19px] text-wrap font-archivo font-light uppercase text-gray-600">
            {currentReview ? `- ${currentReview.name}` : ''}
          </h3>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hidden md:scrollbar-visible">
          {fixedReviews.map((review, index) => (
              <div
                  key={index}
                  onClick={() => handleNameClick(index)}
                  className="inline-block min-w-[30%] text-[13px] md:text-[18px] font-archivo font-bold uppercase text-center bg-gray-300 hover:bg-red-300 rounded-lg p-2 my-2 cursor-pointer"
              >
                {review.name}
              </div>
          ))}
        </div>
      </div>
  );
};

export default Slider;
