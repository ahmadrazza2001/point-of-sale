import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { lHost } from "../../host";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (values) => {
    try {
      dispatch({ type: "SHOW_LOADING" });

      const { email, password } = values;
      const res = await axios.post(`${lHost}/api/user/login`, {
        email,
        password,
      });

      dispatch({ type: "HIDE_LOADING" });
      message.success("Login Success!");

      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });

      // Displaying server error message if available
      const serverMessage = error?.response?.data?.message;
      message.error(serverMessage || "Error during login!");

      console.error(error);
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
      <p>Login to your account</p>
      <div className="form-group">
        <Form layout="vertical" onFinish={handlerSubmit}>
          <Form.Item name="email" label="Email Address">
            <Input placeholder="Enter Email Address" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input type="password" placeholder="Enter Password" />
          </Form.Item>
          <div className="form-btn-add">
            <Button htmlType="submit" className="add-new">
              Login
            </Button>
            <Link className="form-other" to="/signup">
              Don't have an account? Signup now!
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
