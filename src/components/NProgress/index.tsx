import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 配置 NProgress
NProgress.configure({ 
  showSpinner: false,
  minimum: 0.1,
  easing: 'ease',
  speed: 500,
});

const RouteProgress = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    // 立即完成进度
    setTimeout(() => {
      NProgress.done();
    }, 100);  // 100ms 后完成
  }, [location.pathname]);

  return null;
};

export default RouteProgress; 