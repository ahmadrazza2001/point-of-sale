import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  ShoppingOutlined,
  PoweroffOutlined,
  DollarOutlined,
  //LogoutOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./layout.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const { Header, Sider, Content } = Layout;

const LayoutApp = ({ children }) => {
  const { cartItems, loading } = useSelector((state) => state.rootReducer);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      {loading && <Spinner />}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          width: "100%",
        }}
      >
        <div className="logo">
          <img
            width="100px"
            src="https://res.cloudinary.com/sbcunueh/image/upload/v1691920749/pos_logo_otc0ti.png"
            alt=""
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/products" icon={<ShoppingOutlined />}>
            <Link to="/products">All Products</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<DollarOutlined />}>
            <Link to="/bills">All Bills</Link>
          </Menu.Item>

          <Menu.Item key="/customers" icon={<TeamOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item
            style={{
              background: "white",
              maxWidth: "80%",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              color: "red",
            }}
            key="/logout"
            icon={<PoweroffOutlined />}
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <div className="cart-items" onClick={() => navigate("/cart")}>
            <ShoppingCartOutlined />
            <span
              className=""
              style={{
                background: "orange",
                width: "50px",
                height: "0px",
                padding: "0px 7px",
                borderRadius: "100%",
              }}
            >
              {cartItems.length}
            </span>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
