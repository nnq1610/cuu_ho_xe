import { jwtDecode } from 'jwt-decode';

export const getUserId = () => {
  const accessToken = localStorage.getItem('token');
  if (!accessToken) return null;
  try {
    const decodedToken = jwtDecode(accessToken);
    return decodedToken.userId;
  } catch (error) {
    console.error('Lỗi khi giải mã token:', error);
    return null;
  }
};
