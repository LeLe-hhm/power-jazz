import { useState } from 'react';
import { Table, Card, Input, Button, Space, Tag, Modal, Form, Select, DatePicker } from 'antd';
import { SearchOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import './index.scss';

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  memberNo: string;
  memberStatus: 'active' | 'expired' | 'inactive';
  memberExpireDate: string;
  registerTime: string;
}

interface UserFormData {
  username: string;
  email: string;
  role: string;
  memberNo: string;
  memberStatus: string;
  memberExpireDate: dayjs.Dayjs;
}

const UserList = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // 会员状态配置
  const memberStatusConfig = {
    active: { color: 'success', text: '有效' },
    expired: { color: 'error', text: '已过期' },
    inactive: { color: 'default', text: '未激活' }
  };

  // 处理搜索
  const handleSearch = () => {
    setLoading(true);
    // 模拟搜索请求
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // 重置搜索
  const handleReset = () => {
    // 重置搜索条件
  };

  // 打开新增弹框
  const handleAdd = () => {
    setModalTitle('新增会员');
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 打开编辑弹框
  const handleEdit = (record: UserData) => {
    setModalTitle('编辑会员');
    setEditingId(record.id);
    form.setFieldsValue({
      ...record,
      memberExpireDate: dayjs(record.memberExpireDate),
    });
    setModalVisible(true);
  };

  // 处理弹框确认
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('表单数据:', values);
      setModalVisible(false);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const columns: TableColumnsType<UserData> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      fixed: 'left',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      width: 120,
      fixed: 'left',
      ellipsis: true,
    },
    {
      title: '会员编号',
      dataIndex: 'memberNo',
      width: 120,
      ellipsis: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 180,
      ellipsis: true,
      responsive: ['md'],
    },
    {
      title: '角色',
      dataIndex: 'role',
      width: 100,
      responsive: ['sm'],
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
    },
    {
      title: '会员状态',
      dataIndex: 'memberStatus',
      width: 100,
      render: (status: 'active' | 'expired' | 'inactive') => (
        <Tag color={memberStatusConfig[status].color}>
          {memberStatusConfig[status].text}
        </Tag>
      ),
    },
    {
      title: '会员到期时间',
      dataIndex: 'memberExpireDate',
      width: 160,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      width: 160,
      responsive: ['lg'],
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  const data: UserData[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: '管理员',
      status: '启用',
      memberNo: 'VIP10001',
      memberStatus: 'active',
      memberExpireDate: '2024-12-31 23:59:59',
      registerTime: '2023-01-01 12:00:00',
    },
    {
      id: 2,
      username: 'user1',
      email: 'user1@example.com',
      role: '普通用户',
      status: '启用',
      memberNo: 'VIP10002',
      memberStatus: 'expired',
      memberExpireDate: '2023-12-31 23:59:59',
      registerTime: '2023-06-15 14:30:00',
    },
    {
      id: 3,
      username: 'newuser',
      email: 'newuser@example.com',
      role: '普通用户',
      status: '启用',
      memberNo: 'VIP10003',
      memberStatus: 'inactive',
      memberExpireDate: '2024-06-30 23:59:59',
      registerTime: '2024-01-10 09:15:00',
    },
    // 可以添加更多测试数据...
  ];

  return (
    <div className="user-list-page">
      <Card bodyStyle={{ padding: '20px' }}>
        <div className="table-toolbar">
          <Space wrap>
            <Input
              placeholder="搜索用户名/邮箱/会员编号"
              prefix={<SearchOutlined />}
              style={{ width: 250 }}
            />
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
              搜索
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              重置
            </Button>
          </Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增会员
          </Button>
        </div>
        
        <div className="table-container">
          <Table<UserData>
            loading={loading}
            columns={columns}
            dataSource={data}
            rowKey="id"
            scroll={{ x: 1500 }}
            pagination={{
              total: 100,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条`,
            }}
          />
        </div>
      </Card>

      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: 'active',
            role: '普通用户',
          }}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="memberNo"
            label="会员编号"
            rules={[{ required: true, message: '请输入会员编号' }]}
          >
            <Input placeholder="请输入会员编号" />
          </Form.Item>

          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select>
              <Select.Option value="管理员">管理员</Select.Option>
              <Select.Option value="普通用户">普通用户</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="memberStatus"
            label="会员状态"
            rules={[{ required: true, message: '请选择会员状态' }]}
          >
            <Select>
              <Select.Option value="active">有效</Select.Option>
              <Select.Option value="expired">已过期</Select.Option>
              <Select.Option value="inactive">未激活</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="memberExpireDate"
            label="会员到期时间"
            rules={[{ required: true, message: '请选择到期时间' }]}
          >
            <DatePicker 
              showTime 
              style={{ width: '100%' }} 
              placeholder="请选择到期时间"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList; 