import styles from './UserList.module.css';
import useUsers from './useUsers.js';
import debug from 'debug';

const log = debug('UserList:');

export default function UserList() {
  const { users, loading } = useUsers();

  if (loading) {
    log('Not loaded yet');
    return null;
  }

  log("Rendering users %o", users);
  return (
    <ul className={styles.list}>
      {users.map(user => <li key={user.id}>{user.username}</li>)}
    </ul>
  )
}