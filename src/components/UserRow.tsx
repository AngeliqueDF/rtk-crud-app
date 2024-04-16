import { useState } from "react";
import { User } from "../services/types";
import {
  useUpdateUserStatusMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../services/users";
import UserForm from "./UserForm";

/**
 * Displays a single row in the users table. Clicking on the "Edit" button toggles the form to update users.
 */
const UserRow = ({ user }: { user: User }) => {
  const updateUserStatus = useUpdateUserStatusMutation()[0];
  const updateUser = useUpdateUserMutation()[0];
  const deleteUser = useDeleteUserMutation()[0];
  const [showEditUserForm, setshowEditUserForm] = useState(false);
  const handleUpdateUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget.elements;
    const newUserDisplayName = form.namedItem(
      "displayName"
    ) as HTMLInputElement;
    const newUserEmail = form.namedItem("email") as HTMLInputElement;
    if (!newUserDisplayName.value && !newUserEmail.value) {
      alert("Please input display name and email.");
    } else {
      updateUser({
        updateID: user.id,
        displayName: newUserDisplayName.value || user.displayName,
        email: newUserEmail.value || user.email,
      });

      setshowEditUserForm(false);
    }
  };
  return (
    <>
      <tr>
        <td>{user.enabled ? "Active" : "Disabled"}</td>
        <td>{user.email}</td>
        <td>{user.displayName}</td>
        <td>
          <button onClick={() => setshowEditUserForm((prev) => !prev)}>
            Edit
          </button>
          <button
            onClick={() =>
              updateUserStatus({ updateID: user.id, enabled: user.enabled })
            }
          >
            {user.enabled ? "Disable account" : "Activate account"}
          </button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </td>
      </tr>
      {showEditUserForm ? (
        <tr>
          <td colSpan={4}>
            <UserForm
              handleSubmit={handleUpdateUser}
              buttonText="Update user"
            />
          </td>
        </tr>
      ) : null}
    </>
  );
};
export default UserRow;
