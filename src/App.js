import React, { useState, useEffect } from "react";
import "./index.css";
import List from "./List";

import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEdit, setIsEdit] = useState(false); //for editing
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      // alert
      showAlert(true, "danger", "Please enter value");
    } else if (value && isEdit) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, value };
          }
          return item;
        })
      );
      setValue("");
      setEditId(null);
      setIsEdit(false);
      showAlert(true, "success", "value changed");
    } else {
      // adding items to the list
      showAlert(true, "success", "Item added to the list");
      setList([...list, { value, id: new Date().getTime().toString() }]);
      setValue("");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  // delete button
  const clearAll = () => {
    showAlert(true, "danger", "List is empty");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "Item is deleted");
    const newItem = list.filter((item) => item.id !== id);
    setList(newItem);
  };
  const onCheck = (id) => {
    // showAlert(true, "success", "todo completed");
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };
  const onEdit = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEdit(true);
    setEditId(id);
    setValue(specificItem.value);
  };
  // store to localStorage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <div className="container">
      <div className="inner-container">
        <h1 className="title">Ernazar's TODO List</h1>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            {alert.show && (
              <Alert {...alert} list={list} showAlert={showAlert} />
            )}
            <div className="content">
              <input
                type="text"
                className="input"
                value={value}
                placeholder="Type something ..."
                onChange={(e) => setValue(e.target.value)}
              />
              <button className="btn ">{isEdit ? "Edit" : "Submit"}</button>
            </div>
          </form>
        </div>
        <div className="list-items">
          <List
            list={list}
            removeItem={removeItem}
            onCheck={onCheck}
            onEdit={onEdit}
          />
          {list.length > 0 && (
            <div className="clear" onClick={clearAll}>
              clear
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
