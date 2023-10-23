import React, { useState, useEffect } from 'react';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { Modal } from './modal';
import { Signup } from './signup';
import { Login } from './login';
import { userLogin, logout, userData } from './api'
import { ProductCard } from './products';

const App = () => {
  const [isSignUpModal, setSignUpModal] = useState(false);
  const [isLoginModal, setLoginModal] = useState(false);
  const [inputValue, setInputValue] = useState({ username: "", password: "" });
  const [user, setUser] = useState({ userName: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const showModal = (type) => {
    type === 'SIGNUP' ? setSignUpModal(true) : setLoginModal(true);
  };
  const handleOk = (type) => {
    type === 'SIGNUP' ? setSignUpModal(false) : setLoginModal(false);
  };
  const handleCancel = (type) => {
    type === 'SIGNUP' ? setSignUpModal(false) : setLoginModal(false);
  };
  const handleLogout = async () => {
    await logout();
    setUser({ userName: '' });
    setIsLoggedIn(false);
    setUserName('');
  }
  
  const handleLogin = async (event) => {
    event.preventDefault();
    let res;
    try {
      res = await userLogin(inputValue);
      if (res.status === 200) {
        setUserName(res.data.username);
        setIsLoggedIn(true);
        alert('Login success');
        handleCancel();
      } else {
        alert(res.data.error.message ? res.data.error?.message : res.data);
      }
    } catch (error) {
      alert('Something went wrong!');
    }
  }

  const fetchUserDetails = async () => {
    try {
      const res = await userData();
      if (res.status === 200) {
        setUser({ userName: res.data.username });
        setUserName(res.data.username);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('first')
    }
  }

  useEffect(() => {
    try {
      fetchUserDetails();
    } catch (error) {
      console.log('first')
    }
  }, [isLoggedIn, userName]);

  return (
    <div className="App">
      <Navbar showModal={showModal} userName={userName} handleLogout={handleLogout} />
      <Modal handleOk={() => handleOk("SIGNUP")} isModalOpen={isSignUpModal} handleCancel={() => handleCancel('SIGNUP')}>
        <Signup closeModal={() => handleCancel('SIGNUP')} />
      </Modal>
      <Modal handleOk={handleOk} isModalOpen={isLoginModal} handleCancel={handleCancel}>
        <Login handleLogin={handleLogin} handleChange={handleChange} inputValue={inputValue} />
      </Modal>
      { isLoggedIn ? <ProductCard user={user}/> : '' }
      <Footer />
    </div>
  )
}
export default App;
