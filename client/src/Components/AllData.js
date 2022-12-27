import { React, useState, useEffect } from "react";
import AppContext from "../context";
import { useContext } from "react";
import { Card } from "react-bootstrap";
//var ReactTable = window.ReactTable.default;

const AllData = () => {
  const ctx = useContext(AppContext);
  const { allUsers, setAllUsers } = useContext(AppContext);
  useEffect(() => {
    getAllUsers();
  }, [allUsers.length]);
  async function getAllUsers() {
    const response = await fetch(`http://localhost:5000/users`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const records = await response.json();
    console.log(JSON.stringify(records));
    console.log("****************Found " + records.length + " records");
    setAllUsers(records);
    console.log("****************Found " + allUsers.length + " records");
  }

  const renderUser = (user, index) => {
    return (
      <tr key={index}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>{user.balance}</td>
      </tr>
    );
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h1>ALL DATA</h1>
        </Card.Title>
        <br />
        <table class="table table-sm table-dark">
          <thead>
            <tr>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">PASSWORD</th>
              <th scope="col">BALANCE</th>
            </tr>
          </thead>
          <tbody>{ctx.allUsers.map(renderUser)}</tbody>
        </table>
      </Card.Body>
    </Card>
  );
};
export default AllData;
