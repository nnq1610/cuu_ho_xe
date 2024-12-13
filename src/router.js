import LoginRegisterLayout from './layouts/LoginRegisterLayout';
import MainLayout from './layouts/MainLayout';
import About from './pages/About';
import AboutBranch from './pages/AboutBranch';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import HistoryDetails from './pages/HistoryDetails';
import HistoryOrder from './pages/HistoryOrder';
import Home from './pages/Home';
import Instruct from './pages/Instruct';
import Login from './pages/Login';
import Register from './pages/Register';
import Voucher from './pages/Voucher';
import ServicesManagement from "./pages/MangeService";
import AllService from "./components/room/AllService";
import serviceDetail from "./pages/ServiceDetail";
import EditService from "./pages/EditService";
import SearchService from "./pages/SearchService";
export const mainRouters = [
  {
    path: '/lịch-sử-chi-tiết/:orderId',
    component: HistoryDetails,
    layout: MainLayout,
  },{
    path: '/services',
    component: ServicesManagement,
    layout: MainLayout,
  },
  {
    path: '/lịch-sử-đặt-phòng',
    component: HistoryOrder,
    layout: MainLayout,
  },
  {
    path: '/mã-khuyến-mãi',
    component: Voucher,
    layout: MainLayout,
  },
  {
    path: '/hướng-dẫn-đặt-phòng',
    component: Instruct,
    layout: MainLayout,
  },
  {
    path: '/thanh-toán',
    component: Checkout,
    layout: MainLayout,
  },
  {
    path: '/gio-hang',
    component: Cart,
    layout: MainLayout,
  },
  {
    path: '/',
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/gioi-thieu',
    component: About,
    layout: MainLayout,
  },
  {
    path: '/gioi-thieu-chi-nhanh/:hotelId',
    component: AboutBranch,
    layout: MainLayout,
  },
  {
    path: '/serviceDetail/:serviceId',
    component: serviceDetail,
    layout: MainLayout,
  },{
    path: '/register',
    component: Register,
    layout: LoginRegisterLayout,
  },
  {
    path: '/searchService',
    component: SearchService,
    layout: MainLayout,
  },
  {
    path: '/login',
    component: Login,
    layout: LoginRegisterLayout,
  },{
    path: '/allServices',
    component: AllService,
    layout: MainLayout,
  },{
    path: '/edit-service/:serviceId',
    component: EditService,
    layout: MainLayout,
  },{
    path: '/profile',
    component: EditService,
    layout: MainLayout,
  },

];
