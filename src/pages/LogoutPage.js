import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = (props) => {

  const navigate = useNavigate();

  const logout = () => {
    props.auth.signOut();
    navigate('/');
  }
  return (
    <div className='page'>
      <button className='login-button' onClick={() => logout()}>Sign Out</button>
    </div>
  )
}

export default LogoutPage;