import { Button, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
//import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";

const Bills = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/bills/getbills");
      const sortedBills = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBillsData(sortedBills);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(sortedBills);
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Contact Number",
      dataIndex: "customerPhone",
    },
    {
      title: "Customer Address",
      dataIndex: "customerAddress",
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
    },
    {
      title: "Tax",
      dataIndex: "tax",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            className="cart-edit eye"
            onClick={() => {
              setSelectedBill(record);
              setPopModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Layout>
      <h2>All Bills </h2>
      <Table dataSource={billsData} columns={columns} bordered />

      {popModal && (
        <Modal
          title="Point Of Sale"
          width={400}
          pagination={false}
          visible={popModal}
          onCancel={() => setPopModal(false)}
          footer={false}
        >
          <div className="card" ref={componentRef}>
            <div
              className="cardHeader"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <img
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                }}
                width="100px"
                src="https://res.cloudinary.com/sbcunueh/image/upload/v1691920749/pos_logo_otc0ti.png"
                alt=""
              />
              <h4 className="logo">(Internship Project by Ahmad Raza)</h4>
              <span>
                Number: <b> +923339869526</b>
              </span>
              <span>
                Address: <b> 136, Sunfort Gardens, Lahore</b>
              </span>
            </div>
            <div className="cardBody">
              <div className="group">
                <span>Customer Name:</span>
                <span>
                  <b>{selectedBill.customerName}</b>
                </span>
              </div>
              <div className="group">
                <span>Customer Phone:</span>
                <span>
                  <b>+92{selectedBill.customerPhone}</b>
                </span>
              </div>
              <div className="group">
                <span>Customer Address:</span>
                <span>
                  <b>{selectedBill.customerAddress}</b>
                </span>
              </div>
              <div className="group">
                <span>Date Order:</span>
                <span>
                  <b>{selectedBill.createdAt.toString().substring(0, 10)}</b>
                  <b>({selectedBill.createdAt.toString().substring(11, 19)})</b>
                </span>
              </div>
              <div className="group">
                <span>Total Amount:</span>
                <span>
                  <b>Rs.{selectedBill.totalAmount}</b>
                </span>
              </div>
            </div>
            <div className="cardFooter">
              <h4>Order Details</h4>
              {selectedBill.cartItems.map((product) => (
                <>
                  <div
                    className="footerCard"
                    style={{
                      boxShadow: "none",
                      border: "1px dashed grey",
                    }}
                  >
                    <div className="group">
                      <span>Item:</span>
                      <span>
                        <b>{product.name}</b>
                      </span>
                    </div>
                    <div className="group">
                      <span>Qty:</span>
                      <span>
                        <b>{product.quantity}</b>
                      </span>
                    </div>
                    <div className="group">
                      <span>Price:</span>
                      <span>
                        <b>Rs.{product.price}</b>
                      </span>
                    </div>
                  </div>
                </>
              ))}
              <div className="footerCardTotal">
                <div className="group">
                  <h3>
                    {" "}
                    <small>Total:</small>{" "}
                  </h3>
                  <h3>
                    <b> Rs.{selectedBill.totalAmount}</b>
                  </h3>
                </div>
              </div>
              <div className="footerThanks">
                <span
                  style={{
                    color: "#D4D4D4",
                  }}
                >
                  (8% GST included)
                </span>
              </div>
            </div>
          </div>
          <div className="bills-btn-add">
            <Button onClick={handlePrint} htmlType="submit" className="add-new">
              Print Bill
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
};

export default Bills;
