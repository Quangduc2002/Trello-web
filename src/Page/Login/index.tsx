import FormSignIn from './FormSignIn';
import FormRegister from './FormRegister';
import { useState } from 'react';

function Login() {
  const [authStep, setAuthStep] = useState('login');

  const handleToggle = (value: string) => {
    setAuthStep(value);
  };
  return (
    <div>
      {authStep === 'login' ? (
        <FormSignIn handleToggle={handleToggle} />
      ) : (
        <FormRegister handleToggle={handleToggle} />
      )}
    </div>
  );
}

export default Login;
