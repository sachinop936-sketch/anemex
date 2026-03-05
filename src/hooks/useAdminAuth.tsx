import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';

export const useAdminAuth = () => {
  const { user, session, loading: authLoading, signIn, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      const { data } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' });
      setIsAdmin(!!data);
      setLoading(false);
    };
    if (!authLoading) checkAdmin();
  }, [user, authLoading]);

  return { user, session, isAdmin, loading: authLoading || loading, signIn, signOut };
};
