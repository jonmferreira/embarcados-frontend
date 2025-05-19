import { ToastContainer } from 'react-toastify';
import { Routers } from '../router';
import './index.css';

export const App = () => {
  return (
    <>
      <Routers />
      <ToastContainer position="top-center" autoClose={5000} />
    </>
  );
};
