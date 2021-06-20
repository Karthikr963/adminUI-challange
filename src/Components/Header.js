import React from "react";

export default function Header({ setCheck, checkAll }) {
  return (
    <thead>
      <tr>
        <th>
          <input
            type="checkbox"
            onChange={(event) => {
              checkAll(event.currentTarget.checked);
            }}
            checked={setCheck}
          />
        </th>
        <th>Name</th>
        <th>Role</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}
