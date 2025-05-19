import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { useLogin } from './hooks';
import './LoginForm.style.css';

export const LoginForm: React.FC = () => {
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    loginError,
    setLoginError,
    onSubmit,
  } = useLogin();

  return (
    <>
      <div className="flex flex-column align-items-center justify-content-center min-h-screen login-page">
        <div className="flex justify-content-center items-center">
          <Image src="/logo-irma.png" alt="Logo iRMA" width="510" height="172" className="ml-4" />
        </div>
        <div className="login-card shadow-2 flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <div className="field">
              <Image src="/user.png" alt="user" width="200" height="218" className="img-user" />
              <IconField iconPosition="right" className="input-size">
                <InputIcon className="pi pi-user user-spacing" />
                <InputText
                  data-testid="username"
                  id="username"
                  placeholder="User"
                  {...register('username', { required: 'Username is required' })}
                  className={`p-inputtext-lg input-wrapper w-full user-text-login ${
                    errors.username ? 'p-invalid' : ''
                  }`}
                  onFocus={() => setLoginError(null)}
                />
              </IconField>
            </div>

            <div className="divider" />

            <div className="field">
              <IconField iconPosition="right" className="input-size">
                <InputIcon
                  className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                />
                <InputText
                  {...register('password', { required: 'Password is required' })}
                  className={`p-inputtext-lg input-wrapper user-text-login ${
                    errors.password || loginError ? 'p-invalid' : ''
                  }`}
                  onKeyUp={(e) => setCapsLockOn(e.getModifierState('CapsLock'))}
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  onFocus={() => setLoginError(null)}
                />
              </IconField>
              {capsLockOn && (
                <div className="flex items-center gap-2 mt-2 animate-fade-in font-medium">
                  <i
                    className="pi pi-exclamation-triangle text-yellow-500"
                    style={{ fontSize: '1.2rem', marginTop: '5px' }}
                  ></i>
                  <span className="text-black-700 text-md">Caps Lock is On</span>
                </div>
              )}
            </div>
            <div>
              {(loginError || errors.username || errors.password) && (
                <div className="flex justify-content-start align-items-center error-container">
                  <span className="text-red-400 text-lg block pl-1">
                    {loginError || errors.username?.message || errors.password?.message}
                  </span>
                </div>
              )}
              <div className="flex justify-content-center align-items-center">
                <Button
                  style={{
                    marginTop:
                      loginError || errors.username || errors.password || capsLockOn
                        ? '50px'
                        : '90px',
                  }}
                  className={`custom-button ${isSubmitting ? 'loading' : ''}`}
                  loading={isSubmitting}
                  type="submit"
                  disabled={!isValid}
                  label={isSubmitting ? '' : 'Sign In'}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="zilia-logo">
        <Image src="/logo-zilia.png" alt="Logo Zilia" width="136" height="76" />
      </div>
    </>
  );
};
