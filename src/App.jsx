import React from 'react';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';
import UserList from './UserList';

function App() {
  return (
    <div>
      <header>
      </header>
      <LoginForm />
      <LogoutButton/>
      <UserList/>
    </div>
  );
}

export default App;
