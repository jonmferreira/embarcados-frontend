import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginFormInputs } from '../types';
import { useStore } from '../../../store';
import { RoutesConfig } from '../../../router/types';

export const useLogin = () => {
  const { login, home, isAuthenticated } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<LoginFormInputs>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(home);
    }
  }, [isAuthenticated, home]);

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    setLoginError(null);

    try {
      await login(data);
    } catch (e: any) {
      setLoginError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const redirectToRegister = () => {
    navigate(RoutesConfig.DASHBOARD.path);
  };

  return {
    redirectToRegister,
    onSubmit,
    loading,
    loginError,
    setLoginError,
    ...form,
  };
};
