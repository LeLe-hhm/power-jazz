import { useState } from 'react';
import { Card, Form, Input, Button, Upload, Avatar, message, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import './index.scss';

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string>(localStorage.getItem('avatar') || '');

  // 处理表单提交
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      console.log('更新信息:', values);
      // TODO: 调用更新接口
      message.success('更新成功');
    } catch (error) {
      message.error('更新失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理头像上传
  const handleAvatarChange = (info: any) => {
    if (info.file.status === 'done') {
      // 这里应该是从后端返回的URL
      const avatarUrl = info.file.response.url;
      setAvatar(avatarUrl);
      localStorage.setItem('avatar', avatarUrl);
      message.success('头像上传成功');
    }
  };

  return (
    <div className="profile-page">
      <Card title="个人信息">
        <Row gutter={[24, 0]}>
          <Col xs={24} md={8}>
            <div className="avatar-section">
              <Avatar 
                size={120} 
                icon={<UserOutlined />} 
                src={avatar}
                className="avatar"
              />
              <Upload
                name="avatar"
                showUploadList={false}
                action="/api/upload" // 需要替换为实际的上传接口
                onChange={handleAvatarChange}
              >
                <Button icon={<UploadOutlined />}>更换头像</Button>
              </Upload>
            </div>
          </Col>

          <Col xs={24} md={16}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                username: localStorage.getItem('username'),
                email: localStorage.getItem('email'),
              }}
            >
              <Form.Item
                name="username"
                label="用户名"
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
                name="email"
                label="邮箱"
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
                name="oldPassword"
                label="原密码"
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="不修改密码请留空" 
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label="新密码"
                dependencies={['oldPassword']}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!getFieldValue('oldPassword') || value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('请输入新密码'));
                    },
                  }),
                  { min: 6, message: '密码至少6位' }
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="不修改密码请留空" 
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                >
                  保存修改
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Profile; 