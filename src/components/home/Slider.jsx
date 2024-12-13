import React, { useEffect, useState } from 'react';
import { PiCrownThin } from 'react-icons/pi';
import axios from 'axios';

const Slider = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/reviews/')
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the reviews!', error);
      });

    if (autoSlide && reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [autoSlide, reviews.length]);

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

  const currentReview = reviews.length > 0 ? reviews[currentIndex] : null;

  return (
    <div className="mt-3 md:ml-[150px] md:w-full">
      <p className="text-[20px] md:text-[30px] text-wrap font-archivo font-thin flex gap-5 items-center">
        <PiCrownThin />
        Rescue Service
        <PiCrownThin />
      </p>
      <div className="mt-2 mb-5">{currentReview && renderStars(currentReview.rating)}</div>
      <div className="mb-5">
        <h2 className="mt-3 text-[14px] md:text-[19px] text-wrap font-archivo font-thin text-blue-950 h-[250px] md:h-[200px]">{currentReview ? currentReview.comment : 'Loading review...'}</h2>
        <h3 className="mt-3 text-[16px] md:text-[19px] text-wrap font-archivo font-light uppercase">Bạn - {currentReview ? `${currentReview.user.first_name} ${currentReview.user.last_name}` : ''}</h3>
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-hidden md:scrollbar-visible">
        {reviews.map((review, index) => (
          <div
            key={review.review_id}
            onClick={() => handleNameClick(index)}
            className="inline-block min-w-[30%] text-[13px] md:text-[18px] font-archivo font-bold uppercase text-center bg-gray-300 hover:bg-red-300 rounded-lg p-2 my-2 cursor-pointer"
          >
            {review.user.first_name} {review.user.last_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
