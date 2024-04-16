import { useCreateUserMutation, useGetAllUsersQuery } from "../services/users";
import UserForm from "./UserForm";

/**
 * Displays a form to add users.
 */
const AddUserForm = () => {
  const createUser = useCreateUserMutation()[0];
  const { data: usersData } = useGetAllUsersQuery();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget.elements;
    const newUserDisplayName = form.namedItem(
      "displayName"
    ) as HTMLInputElement;
    const newUserEmail = form.namedItem("email") as HTMLInputElement;
    if (!newUserDisplayName.value || !newUserEmail.value) {
      alert("Error: please input a display name and email to add a new user.");
    } else {
      const duplicateUser = usersData?.find(
        (user) =>
          user.displayName === newUserDisplayName.value ||
          user.email === newUserEmail.value
      );
      if (duplicateUser) {
        alert("Error: please input a unique display name and email.");
      } else {
        createUser({
          displayName: newUserDisplayName.value,
          email: newUserEmail.value,
        });
      }
    }
  };
  return (
    <section>
      <h2>Add a user:</h2>
      <UserForm handleSubmit={handleSubmit} buttonText="Add user" />
    </section>
  );
};

export default AddUserForm;
