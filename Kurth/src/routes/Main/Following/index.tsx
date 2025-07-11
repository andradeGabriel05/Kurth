import { UserDTO } from "../../../models/user";

type Props = {
  user: UserDTO;
};

export default function Following({ user }: Props) {
  return <div>Following {user.name}</div>;
}
