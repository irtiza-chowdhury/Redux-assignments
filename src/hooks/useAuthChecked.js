import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminLoggedIn, userLoggedIn } from '../features/auth/authSlice';

export default function useAuthChecked() {
  const [authChecked, setAuthChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const localAuth = localStorage.getItem('auth');

    const localAdminAuth = localStorage.getItem('admin');

    if (localAuth) {
      const authentication = JSON.parse(localAuth);

      if (authentication?.accessToken && authentication?.user) {
        dispatch(
          userLoggedIn({
            accessToken: authentication?.accessToken,
            user: authentication?.user,
          })
        );
      }
    }
    if (localAdminAuth) {
      const authentication = JSON.parse(localAdminAuth);

      if (authentication?.accessToken && authentication?.user) {
        dispatch(
          adminLoggedIn({
            adminToken: authentication?.accessToken,
            admin: authentication?.user,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch]);

  return authChecked;
}
