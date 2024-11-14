import { useState } from 'react';
import { Card, Form, Input, Button, Tabs, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './index.scss';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  // 发送验证码
  const handleSendCode = async () => {
    try {
      // 验证手机号
      await form.validateFields(['phone']);
      const phone = form.getFieldValue('phone');
      
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // TODO: 调用发送验证码接口
      message.success(`验证码已发送至 ${phone}`);
    } catch (error) {
      // 验证失败
    }
  };

  // 处理登录
  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      console.log('登录信息:', values);
      // TODO: 调用登录 API
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('username', values.username || values.phone);
      message.success('登录成功');
      navigate('/home');
    } catch (error) {
      message.error('登录失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理注册
  const handleRegister = async (values: any) => {
    setLoading(true);
    try {
      console.log('注册信息:', values);
      // TODO: 调用注册 API
      message.success('注册成功');
      setActiveTab('login');
    } catch (error) {
      message.error('注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Card className="login-card">
        <h2 className="title">React Admin</h2>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          centered
        >
          <TabPane tab="账号登录" key="login">
            <Form
              form={form}
              onFinish={handleLogin}
              size="large"
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: '请输入用户名/邮箱/手机号' },
                ]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="用户名/邮箱/手机号" 
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: '请输入密码' },
                  { min: 6, message: '密码至少6位' }
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="密码" 
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  loading={loading}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          {/* <TabPane tab="手机登录" key="phone">
            <Form
              form={form}
              onFinish={handleLogin}
              size="large"
            >
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
                ]}
              >
                <Input 
                  prefix={<PhoneOutlined />} 
                  placeholder="手机号" 
                />
              </Form.Item>

              <Form.Item>
                <Row gutter={8}>
                  <Col flex="auto">
                    <Form.Item
                      name="code"
                      noStyle
                      rules={[
                        { required: true, message: '请输入验证码' },
                        { len: 6, message: '验证码为6位数字' }
                      ]}
                    >
                      <Input 
                        placeholder="验证码" 
                      />
                    </Form.Item>
                  </Col>
                  <Col flex="none">
                    <Button 
                      disabled={countdown > 0}
                      onClick={handleSendCode}
                    >
                      {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  loading={loading}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </TabPane> */}

          <TabPane tab="注册" key="register">
            <Form
              form={form}
              onFinish={handleRegister}
              size="large"
            >
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
                ]}
              >
                <Input 
                  prefix={<PhoneOutlined />} 
                  placeholder="手机号" 
                />
              </Form.Item>

              {/* <Form.Item>
                <Row gutter={8}>
                  <Col flex="auto">
                    <Form.Item
                      name="code"
                      noStyle
                      rules={[
                        { required: true, message: '请输入验证码' },
                        { len: 6, message: '验证码为6位数字' }
                      ]}
                    >
                      <Input 
                        placeholder="验证码" 
                      />
                    </Form.Item>
                  </Col>
                  <Col flex="none">
                    <Button 
                      disabled={countdown > 0}
                      onClick={handleSendCode}
                    >
                      {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
                    </Button>
                  </Col>
                </Row>
              </Form.Item> */}

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined />} 
                  placeholder="邮箱" 
                />
              </Form.Item>

              <Form.Item
                name="username"
                rules={[
                  { required: true, message: '请输入用户名' },
                  { min: 3, message: '用户名至少3位' }
                ]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="用户名" 
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: '请输入密码' },
                  { min: 6, message: '密码至少6位' }
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="密码" 
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: '请确认密码' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次输入的密码不一致'));
                    },
                  }),
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="确认密码" 
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  loading={loading}
                >
                  注册
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login; 