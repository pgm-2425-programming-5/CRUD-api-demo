interface User {
  name: string;
}

interface Props {
  user: User;
}

function HelloMessage({ user }: Props) {
  return (
    <div>
      <h1>Hello, {user.name}!</h1>
    </div>
  );
}

export default HelloMessage;