import AddUserForm from "./components/AddUser";
import UsersTable from "./components/UsersTable";

function App() {
  return (
    <div>
      <h1>User management app</h1>
      <AddUserForm />
      <UsersTable />
    </div>
  );
}

export default App;
