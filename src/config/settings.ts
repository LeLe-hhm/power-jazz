export default {
  // 网站标题
  title: 'React Admin',
  
  // 路由模式 - intelligence: 前端控制, all: 后端控制
  authentication: 'intelligence',
  
  // 布局设置
  layout: {
    // 是否显示标签栏
    showTabs: true,
    // 是否显示面包屑
    showBreadcrumb: true,
    // 是否固定头部
    fixedHeader: true,
    // 是否显示页脚
    showFooter: true,
  },
  
  // 主题配置
  theme: {
    // 主题色
    primaryColor: '#1890ff',
    // 暗黑模式
    darkMode: false,
  },
  
  // 请求配置
  request: {
    // 超时时间
    timeout: 10000,
    // 请求基础URL
    baseURL: '/api',
  }
}; 