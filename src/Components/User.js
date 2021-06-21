import React from "react";
import { useState } from "react";
import ModalElement from "./ModalElement";
function User({ user, setDeleteUser, delMultiple, isCheckedAll }) {
  const [isChecked, setIsChecked] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <tr
        // "#169C7D"
        style={{
          color: isCheckedAll ? "#0275d8" : isChecked ? "#0275d8" : "black",
        }}
      >
        <td>
          <input
            type="checkbox"
            value={user.id}
            onChange={(event) => {
              setIsChecked(event.currentTarget.checked);
              delMultiple(event.currentTarget.checked, user.id);
            }}
            checked={isCheckedAll ? isCheckedAll : isChecked}
          />
        </td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <i
            className="far fa-edit"
            style={{ marginRight: "10px" }}
            onClick={() => setModalShow(true)}
          ></i>
          <i
            className="fa fa-trash"
            onClick={() => {
              setDeleteUser(user.id);
            }}
          ></i>
        </td>
      </tr>
      <ModalElement
        show={modalShow}
        details={user}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default User;
