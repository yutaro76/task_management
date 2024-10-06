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

    console.log("Sending update for user ID:", id, "with name:", name); // ここでデバッグ出力

    axios.put(`http://127.0.0.1:8000/api/users/${id}`, {name}, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    // .then(res => {setUsers(users.map(user => user.id === id ? res.data : user))});
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

  // const handleRemove = (id: number, removed: boolean) => {
  //   setUsers((users) => {
  //     const newUsers = users.map((user) => {
  //       if (user.id === id) {
  //         return {...user, removed};
  //       }
  //       return user;
  //     });
      
  //     const filteredRemovedUsers = newUsers.filter((user) => !user.removed);
  //     return filteredRemovedUsers;
  //   })
  // };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users/')
    .then(res => {setUsers(res.data)})
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
              {/* <button className="deleteButton" onClick={() => handleRemove(user.id, !user.removed)}>削除</button> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default User;