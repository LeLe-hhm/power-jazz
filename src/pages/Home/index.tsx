import { Card, Row, Col, Statistic, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import './index.scss';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  return (
    <div className="home-page">
      {!isLoggedIn && (
        <Card className="visitor-tip" style={{ marginBottom: 16 }}>
          <Paragraph>
            您当前以游客身份访问，部分功能受限。
            <Button 
              type="link" 
              onClick={() => navigate('/login')}
              style={{ padding: '0 8px' }}
            >
              立即登录
            </Button>
            体验完整功能。
          </Paragraph>
        </Card>
      )}

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="A股平均涨幅"
              value={50.9}
              precision={1}
              prefix={<UserOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="比特币价格"
              value={88000}
              prefix={<DollarOutlined />}
              suffix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="快递日处理量"
              value={7.01}
              precision={2}
              prefix={<ShoppingCartOutlined />}
              suffix="亿件"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="影视行业盈利公司"
              value={8}
              prefix={<FileTextOutlined />}
              suffix="/18"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home; 