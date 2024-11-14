import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';

// 定义路由配置接口
interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<any>;
  meta: {
    title: string;
    public: boolean;
  };
}

// Loading 组件
export const LoadingComponent = () => (
  <Spin 
    size="large"
    fullscreen
    tip="加载中..."
  />
);

// 路由守卫组件
interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = localStorage.getItem('token');
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// 带 Suspense 的组件包装器
interface LazyComponentProps {
  component: React.LazyExoticComponent<any>;
}

export const LazyComponent = ({ component: Component }: LazyComponentProps) => (
  <Suspense fallback={<LoadingComponent />}>
    <Component />
  </Suspense>
);

// 处理路由配置
export const processRoutes = (routes: RouteConfig[]) => {
  return routes.map(route => ({
    path: route.path,
    element: route.meta.public ? (
      <LazyComponent component={route.component} />
    ) : (
      <PrivateRoute>
        <LazyComponent component={route.component} />
      </PrivateRoute>
    ),
  }));
}; 