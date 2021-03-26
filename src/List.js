import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BiMessageSquareCheck } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
const List = ({ list, removeItem, onCheck, onEdit }) => {
  return (
    <>
      {list.map((item) => {
        return (
          <div
            className={`list-container ${item.completed ? "completed-bg" : ""}`}
            key={item.id}
          >
            <div className="list-content">
              <div className="list">
                <p className={`name ${item.completed ? "completed" : ""} `}>
                  {item.value}
                </p>
                <div className="icons">
                  <button
                    className="icon-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrashAlt className="icon" />
                  </button>
                  <button className="icon-btn">
                    <BiMessageSquareCheck
                      className="icon"
                      onClick={() => onCheck(item.id)}
                    />
                  </button>
                  <button className="icon-btn">
                    <FiEdit className="icon" onClick={() => onEdit(item.id)} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default List;
