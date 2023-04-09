import { useSelector } from 'react-redux';

export default function useAdminAuth() {
  const auth = useSelector((state) => state.auth);

  if (auth?.adminToken && auth?.admin) {
    return true;
  }
  return false;
}
