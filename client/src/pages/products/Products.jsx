import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LayoutApp from "../../components/Layout";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { lHost } from "../../host";

const Products = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const getAllProducts = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(`${lHost}/api/products/get-products`);
      const sortedProducts = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProductData(sortedProducts);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(sortedProducts);
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handlerDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post(`${lHost}/api/products/delete-products`, {
        productId: record._id,
      });
      message.success("Product Deleted Successfully!");
      getAllProducts();
      setPopModal(false);
      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      message.error("Error!");
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      width: 50,
      textWrap: "word-break",
      render: (image, record) => (
        <img
          src={image}
          style={{ borderRadius: "5px" }}
          alt={record.name}
          height={60}
          width={60}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
      textWrap: "word-break",
    },

    {
      title: "Category",
      dataIndex: "category",
      width: 100,
      textWrap: "word-break",
    },

    {
      title: "Price",
      dataIndex: "price",
      width: 100,
      textWrap: "word-break",
    },
    {
      title: "Action",
      dataIndex: "_id",
      width: 50,
      textWrap: "word-break",
      render: (id, record) => (
        <div>
          <DeleteOutlined
            className="cart-action"
            onClick={() => handlerDelete(record)}
          />
          <EditOutlined
            className="cart-edit"
            onClick={() => {
              setEditProduct(record);
              setPopModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handlerSubmit = async (value) => {
    //console.log(value);
    if (editProduct === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post(
          `${lHost}/api/products/add-products`,
          value
        );
        message.success("Product Added Successfully!");
        getAllProducts();
        setPopModal(false);
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        dispatch({
          type: "HIDE_LOADING",
        });
        message.error("Error!");
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.put(`${lHost}/api/products/update-products`, {
          ...value,
          productId: editProduct._id,
        });
        message.success("Product Updated Successfully!");
        getAllProducts();
        setPopModal(false);
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        dispatch({
          type: "HIDE_LOADING",
        });
        message.error("Error!");
        console.log(error);
      }
    }
  };
  const styles = {
    container: {
      padding: "80px 10%",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      background: "#f5f5f5",
      borderBottom: "1px solid #ddd",
    },
    tableCell: {
      padding: "8px",
      border: "1px solid #ddd",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
    },
    img: {
      borderRadius: "5px",
      height: "60px",
      width: "60px",
    },
  };

  return (
    <LayoutApp>
      <div style={styles.container}>
        <h2>All Items </h2>
        <Button className="add-new" onClick={() => setPopModal(true)}>
          Add New
        </Button>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableCell}>Image</th>
              <th style={styles.tableCell}>Name</th>
              <th style={styles.tableCell}>Category</th>
              <th style={styles.tableCell}>Price</th>
              <th style={styles.tableCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((record) => (
              <tr key={record._id}>
                <td style={styles.tableCell}>
                  <img
                    src={record.image}
                    alt={record.name}
                    style={styles.img}
                  />
                </td>
                <td style={styles.tableCell}>{record.name}</td>
                <td style={styles.tableCell}>{record.category}</td>
                <td style={styles.tableCell}>{record.price}</td>
                <td style={styles.tableCell}>
                  <DeleteOutlined
                    className="cart-action"
                    onClick={() => handlerDelete(record)}
                  />
                  <EditOutlined
                    className="cart-edit"
                    onClick={() => {
                      setEditProduct(record);
                      setPopModal(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {popModal && (
          <Modal
            title={`${
              editProduct !== null ? "Edit Product" : "Add New Product"
            }`}
            open={popModal}
            onCancel={() => {
              setEditProduct(null);
              setPopModal(false);
            }}
            footer={false}
          >
            <Form
              layout="vertical"
              initialValues={editProduct}
              onFinish={handlerSubmit}
            >
              <FormItem name="name" label="Name">
                <Input />
              </FormItem>
              <Form.Item name="category" label="Category">
                <Select>
                  <Select.Option value="pizzas">Pizzas</Select.Option>
                  <Select.Option value="burgers">Burgers</Select.Option>
                  <Select.Option value="drinks">Drinks</Select.Option>
                </Select>
              </Form.Item>
              <FormItem name="price" label="Price">
                <Input />
              </FormItem>
              <FormItem name="image" label="Image URL">
                <Input />
              </FormItem>
              <div className="form-btn-add">
                <Button htmlType="submit" className="add-new">
                  Confirm
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </div>
    </LayoutApp>
  );
};

export default Products;
