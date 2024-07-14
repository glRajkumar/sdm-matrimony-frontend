import { users } from "./data";
import Card from "./card";

function UsersList() {
  return users.map(user => (
    <Card
      key={user.id}
      id={user.id}
      fullName={user.fullName}
      image={user.image}
      email={user.email}
    />
  ))
}

export default UsersList
