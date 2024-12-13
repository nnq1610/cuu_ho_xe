import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Mỗi khi thay đổi route, cuộn lên đầu trang
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
