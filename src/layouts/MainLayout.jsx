import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ToastNotify from '../components/common/ToastNotify';

const MainLayout = ({ children }) => {
  return (
    <div className="relative ">
      <Header />
      <ToastNotify />
      <Menu />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
