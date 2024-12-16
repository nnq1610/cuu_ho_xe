import LoginRegisterLayout from './layouts/LoginRegisterLayout';
import MainLayout from './layouts/MainLayout';
import About from './pages/About';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from "./pages/Profile";
import Register from './pages/Register';
import ServicesManagement from "./pages/MangeService";
import AllService from "./components/service/AllService";
import serviceDetail from "./pages/ServiceDetail";
import EditService from "./pages/EditService";
import SearchService from "./pages/SearchService";
import Review from "./components/service/Review";
export const mainRouters = [
  {
    path: '/services',
    component: ServicesManagement,
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
    component: Profile,
    layout: MainLayout,
  },{
    path: '/reviews/:serviceId',
    component: Review,
    layout: MainLayout,
  },

];
