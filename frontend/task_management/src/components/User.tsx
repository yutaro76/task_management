import { useState } from 'react';

type User = {
    value: string;
    readonly id: number;
    removed: boolean;
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
      id: new Date().getTime(),
      removed: false,
    }

    setUsers((users) => [newUser, ...users])

    setText('');
  }

  const handleEdit = (id: number, value: string) => {
    setUsers((users) => {
      const newUsers = users.map((user) => {
        if (user.id === id) {
          return {...user, value};
        }
        return user;
      })
      return newUsers;
    });  
  }

  const handleRemove = (id: number, removed: boolean) => {
    setUsers((users) => {
      const newUsers = users.map((user) => {
        if (user.id === id) {
          return {...user, removed};
        }
        return user;
      });
      
      const filteredRemovedUsers = newUsers.filter((user) => !user.removed);
      return filteredRemovedUsers;
    })
  };

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
        {users.map((user) => {
          return (
            <li key={user.id}>
              <input 
                type="text"
                value={user.value}
                onChange={(e) => handleEdit(user.id, e.target.value)}
              />
              <button className="deleteButton" onClick={() => handleRemove(user.id, !user.removed)}>削除</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default User;