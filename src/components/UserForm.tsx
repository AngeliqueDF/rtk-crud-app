/**
 * Reusable component to add and update users
 */
const UserForm = ({ handleSubmit, buttonText }: UserFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">E-mail: </label>
      <input id="email" type="text" name="email" />

      <label htmlFor="displayName">Display name: </label>
      <input id="displayName" type="text" name="displayName" />

      <input type="submit" value={buttonText} />
    </form>
  );
};
export default UserForm;

type UserFormProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
};
