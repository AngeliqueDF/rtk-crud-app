import { User } from "../services/types";
import { useGetAllUsersQuery } from "../services/users";
import UserRow from "./UserRow";

/**
 * Displays the list of all users.
 */
const UsersTable = () => {
  const { data, error, isLoading } = useGetAllUsersQuery();
  if (error) {
    return <div>There was an error retrieving users.</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <table>
      <thead>
        <tr>
          <td>Status</td>
          <td>E-mail</td>
          <td>Display name</td>
          <td>Actions</td>
        </tr>
      </thead>

      <tbody>
        {data?.map((user: User, index) => (
          <UserRow key={index} user={user} />
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
