import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { lHost } from "../../host";

import axios from "axios";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (values) => {
    try {
      dispatch({ type: "SHOW_LOADING" });

      // If your server is running on a different port or domain,
      // provide the full URL. This is an example assuming your server is on port 5000:
      await axios.post(`${lHost}/api/user/signup`, values);

      message.success("Register Successfully!");
      navigate("/login");
    } catch (error) {
      message.error("Error!");
      console.error(error);
    } finally {
      dispatch({ type: "HIDE_LOADING" });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="form">
      <h2>Point Of Sale</h2>
      <p>Signup to a new account</p>
      <div className="form-group">
        <Form layout="vertical" onFinish={handlerSubmit}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please input your email address!" },
            ]}
          >
            <Input placeholder="Enter Email Address" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input type="password" placeholder="Enter Password" />
          </Form.Item>
          <div className="form-btn-add">
            <Button htmlType="submit" className="add-new">
              Signup
            </Button>
            <Link className="form-other" to="/login">
              Already have an account? Login now!
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
