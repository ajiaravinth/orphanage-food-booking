import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import "../App.css";
import request from "./config/api";
import moment from "moment"
import { toast, ToastContainer } from "react-toastify";

const Dashboard = (props) => {
  const data = {
    bookingList: [],
    sortOrder: false,
    count: 0,
    tableOptions: {
      search: "",
      filter: "all",
      page: {
        history: "",
        current: 1,
      },
      order: -1,
      field: "createdAt",
      limit: 5,
      skip: 0,
    },
  }

  const username = props ? props.location.state.username : "";
  const [values, setValues] = useState(data);

  useEffect(() => {    
    request({
      url: "/booking/list",
      method: "POST",
      data: values.tableOptions
    }).then(res => {
      if (res.status === 1) {
        setValues(state => {
          state.bookingList = res.response.result;
            state.count = res.response.fullcount;
          return {...state}
        })
      }
    }).catch(err => console.log(err))
  }, [])

  const logout = () => {
    localStorage.clear()
    toast.success("Logged Out!!")
    setTimeout(() => {
      props.history.push("/admin")
    }, 1000);
  }


  return (
    <div className="container">
      <ToastContainer autoClose={1000} position="top-right" />
      <div className="header">
        <h5 className="mr-3 mb-0 mt-2" style={{ textTransform: "capitalize" }}>
          {username ? username : "Admin"}
        </h5>
        <Button color="danger" onClick={logout}>Logout</Button>
      </div>
      <div className="booking-count">
        <h5>Total Bookings</h5>
        <h6>{values.count}</h6>
      </div>
      <hr />
      <div className="booking-list-table">
        <Table hover>
          <thead>
            <tr>
              <th>S.NO</th>
              <th>USERNAME</th>
              <th>PHONE NUMBER</th>
              <th>ADDRESS</th>
              <th>ORPHANAGE NAME</th>
              <th>DATE OF BOOKING</th>
              <th>BOOKING TIME</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {values.bookingList &&
              values.bookingList.length > 0 &&
              values.bookingList.map((list, i) => (
                <tr>
                  <td>{i+1}</td>
                  <td>{list.username}</td>
                  <td>{list.user_phone}</td>
                  <td>{list.user_address}</td>
                  <td>{list.orphanage_name}</td>
                  <td>{moment(list.booking_date).format("DD/MM/YYYY")}</td>
                  <td>{list.slot_timing}</td>
                  <td>{list.status === 1 ? "confirmed" : "Canceled"}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Dashboard;