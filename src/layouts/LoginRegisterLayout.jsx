import React from 'react';
import ToastNotify from '../components/common/ToastNotify';

const LoginRegisterLayout = ({ children }) => {
  return (
    <div className="relative ">
      <main>{children}</main>
      <ToastNotify />
    </div>
  );
};

export default LoginRegisterLayout;
