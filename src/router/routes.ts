import { lazy } from 'react';

// 定义路由配置接口
interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<any>;
  meta: {
    title: string;
    public: boolean;
  };
}

// 懒加载组件
const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const UserList = lazy(() => import('@/pages/User/List'));
const Profile = lazy(() => import('@/pages/Profile'));

// 路由配置
export const routes: RouteConfig[] = [
  {
    path: 'login',
    component: Login,
    meta: {
      title: '登录',
      public: true,
    },
  },
  {
    path: 'home',
    component: Home,
    meta: {
      title: '首页',
      public: true,
    },
  },
  {
    path: 'user',
    component: UserList,
    meta: {
      title: '用户管理',
      public: false,
    },
  },
  {
    path: 'profile',
    component: Profile,
    meta: {
      title: '个人中心',
      public: false,
    },
  },
]; 