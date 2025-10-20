import { type AuthUser } from 'wasp/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useRedirectHomeUnlessUserIsUser({ user }: { user: AuthUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, history]);
}
