import React, { useState, useEffect, useCallback } from "react";
import { MAIN_APP_URL, USERS_URL } from "../apis";

const keys = {
  Name: "name",
  "User Name": "username",
  Email: "email",
  Phone: "phone",
  Website: "website",
};

const Table = () => {
  const [users, setUsers] = useState([]);
  const [sortingKey, setSortingKey] = useState(null);
  const [ascendingKeyClicked, setAscendingKeyClicked] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(USERS_URL)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  const viewProfile = useCallback((id) => {
    const data = JSON.stringify({ name: "viewProfile", id });
    window.top.postMessage(data, MAIN_APP_URL);
  }, []);

  const viewPost = useCallback((id) => {
    const data = JSON.stringify({ name: "viewPost", id });
    window.top.postMessage(data, MAIN_APP_URL);
  }, []);

  const handleAscendingSort = (key) => {
    let usersClone = [...users];
    setSortingKey(key);
    const sortedUsersClone = usersClone.sort((a, b) =>
      a[keys[key]] < b[keys[key]] ? -1 : 1
    );
    setUsers(sortedUsersClone);
    setAscendingKeyClicked(true);
  };

  const handleDescendingSort = (key) => {
    let usersClone = [...users];
    setSortingKey(key);
    const sortedUsersClone = usersClone.sort((a, b) =>
      b[keys[key]] < a[keys[key]] ? -1 : 1
    );

    setUsers(sortedUsersClone);
    setAscendingKeyClicked(false);
  };

  const renderHeader = () => {
    let headerElement = ["Name", "User Name", "Email", "Phone", "Website"];

    return headerElement.map((key, index) => {
      return (
        <th key={index}>
          <span
            onClick={() =>
              ascendingKeyClicked && sortingKey === key
                ? handleDescendingSort(key)
                : handleAscendingSort(key)
            }
          >
            {sortingKey === key && ascendingKeyClicked ? "A" : "V"}
          </span>{" "}
          {key.toUpperCase()}
        </th>
      );
    });
  };

  const renderBody = () => {
    return (
      users &&
      users.map((user) => {
        const { id, name, username, email, phone, website } = user;
        return (
          <tr key={id}>
            <td>{name}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{website}</td>
            <td className="opration">
              <button className="button" onClick={() => viewProfile(id)}>
                View Profile
              </button>
            </td>
            <td className="opration">
              <button className="button" onClick={() => viewPost(id)}>
                View Post
              </button>
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <>
      <h1 id="title">Table</h1>
      <table id="employee">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </>
  );
};

export default Table;
