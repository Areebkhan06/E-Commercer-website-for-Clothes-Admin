import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setorders] = useState([]);
  const currency = "$";

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        "https://e-commercer-website-for-clothes-backend.onrender.com/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setorders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        "https://e-commercer-website-for-clothes-backend.onrender.com/api/order/status",
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if(response.data.success){
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Orders
      </h1>
      <div className="grid gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-4 md:p-6 border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={assets.parcel_icon}
                alt="Parcel"
                className="w-12 h-12"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-sm text-gray-500">{order.address.phone}</p>
              </div>
            </div>

            <div className="text-sm text-gray-700 mb-3">
              {order.items.map((item, i) => (
                <p key={i}>
                  {item.name} x {item.quantity}{" "}
                  <span className="text-xs text-gray-500">({item.size})</span>
                </p>
              ))}
            </div>

            <div className="text-sm text-gray-600 mb-3">
              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}, {order.address.zipcode}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm mb-4">
              <p>
                <span className="font-medium">Items:</span> {order.items.length}
              </p>
              <p>
                <span className="font-medium">Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                <span
                  className={order.payment ? "text-green-600" : "text-red-500"}
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-gray-800">
                {currency}
                {order.amount}
              </p>

              <select
              onChange={(e)=>statusHandler(e,order._id)}
                value={order.status}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="Order Placed"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;


// 12:13