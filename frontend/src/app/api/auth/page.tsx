interface User {
  name: string;
}


function HelloMessage(user : User) {
  return (
    <div>
      <h1>Hello, {user.name}!</h1>
    </div>
  );
}

export default HelloMessage;