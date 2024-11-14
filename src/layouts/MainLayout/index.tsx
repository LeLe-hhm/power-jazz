import { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Avatar, Button, Space, message } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CompassOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import './index.scss';
import RouteProgress from '@/components/NProgress';
import classNames from 'classnames';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isLoggedIn = localStorage.getItem('token');

  // 检测是否为移动设备
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // 处理用户菜单点击
  const handleUserMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'profile':
        navigate('/profile');
        break;
      case 'logout':
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        message.success('已退出登录');
        navigate('/login');
        break;
      case 'switch':
        navigate('/login');
        break;
    }
  };

  // 用户菜单项
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'switch',
      icon: <UserSwitchOutlined />,
      label: '切换账号',
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      danger: true,
    },
  ];

  // 用户信息区域
  const UserInfo = () => {
    if (!isLoggedIn) {
      return (
        <Button 
          type="link" 
          icon={<LoginOutlined />}
          onClick={() => navigate('/login')}
        >
          登录
        </Button>
      );
    }

    return (
      <Dropdown
        menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
        placement="bottomRight"
        arrow
        trigger={['click']}
      >
        <Space className="user-info-trigger">
          <span className="username">
            {localStorage.getItem('username')}
          </span>
          <Avatar 
            size="small" 
            icon={<UserOutlined />}
            src={localStorage.getItem('avatar')}
          />
        </Space>
      </Dropdown>
    );
  };

  // 处理菜单显示/隐藏
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <Layout className={`main-layout ${isMobile ? 'mobile' : ''} ${menuVisible ? 'menu-opened' : ''}`}>
      {/* 移动端遮罩层 */}
      <div 
        className="mobile-overlay"
        onClick={() => setMenuVisible(false)}
      />

      <Sider 
        trigger={null} 
        collapsible={!isMobile}
        collapsed={isMobile ? false : menuVisible}
        className="main-sider"
      >
        <div className="logo">React Admin</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: '/home',
              icon: <CompassOutlined />,
              label: '首页',
            },
            {
              key: '/user',
              icon: <UserOutlined />,
              label: '用户管理',
            },
          ]}
          onClick={({ key }) => {
            navigate(key);
            if (isMobile) {
              setMenuVisible(false);
            }
          }}
        />
      </Sider>

      <Layout>
        <Header className="site-header">
          <div className="header-left">
            {!isLoginPage && (
              <div 
                className="trigger" 
                onClick={toggleMenu}
              >
                {isMobile || menuVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
            )}
          </div>
          
          <div className="header-right">
            <UserInfo />
          </div>
        </Header>
        
        <Content className="main-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 