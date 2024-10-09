import React, { useState, useEffect } from 'react';
import axios from 'axios';

type User = {
    name: string;
    readonly id: number;
  }

const User = () => {

  const [text, setText] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const handleSubmit = () => {
    if (!text) return;

    const newUser: Omit<User, 'id'> = {
      name: text,
    }

    axios.post('http://127.0.0.1:8000/api/users/', newUser, {
      headers: {
        'Content-Type': 'application/json',
    }})
    .then(res => {
      setUsers((users) => [...users, res.data]);
      setText('');
    })
  }

  const handleEdit = (id: number, name: string) => {
    setUsers((users) => {
      const newUsers = users.map((user) => {
        if (user.id === id) {
          return {...user, name};
        }
        return user;
      })
      return newUsers;
    });  
  }

  const handleUpdate = (id: number, name: string) => {
    const updateName = {name: name};
    axios.put(`http://127.0.0.1:8000/api/users/${id}/`, updateName, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(() => {
      setUsers((users) => {
        const newUsers = users.map((user) => {
          if (user.id === id) {
            return {...user, name};
          }
          return user;
        })
        return newUsers;
      });  
    });
  }

  const handleRemove = (id: number) => {
    axios.delete(`http://127.0.0.1:8000/api/users/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(() => {
      setUsers(users.filter(user => user.id !== id));
   });
  }

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users/')
    .then(res => {setUsers(res.data)});
  }, [])

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
                value={user.name}
                onChange={(e) => handleEdit(user.id, e.target.value)}
              />
              <button className="deleteButton" onClick={() => handleRemove(user.id)}>削除</button>
              <button className="updateButton" onClick={() => handleUpdate(user.id, user.name)} disabled={!user.name.trim()}>更新</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default User;