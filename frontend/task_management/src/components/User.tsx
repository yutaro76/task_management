import { useState } from 'react';

type User = {
    value: string;
  }

const User = () => {

  const [text, setText] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const handleSubmit = () => {
    if (!text) return;

    const newUser: User = {
      value: text,
    }

    setUsers((users) => [newUser, ...users])

    setText('');
  }

  return (
    <div>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input 
          type="text" 
          value ={text} 
          onChange={(e) => handleChange(e)} />
        <input
          type="submit"
          value="追加"
          onSubmit={handleSubmit}
        />
      </form>
      <ul>
        {users.map((user) => {return <li>{user.value}</li>;})}
      </ul>
    </div>
  );
};

export default User;