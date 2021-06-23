import React, { useContext, useState } from 'react';

import CarImg from '../../assets/images/car.jpg';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';
import { ForogtPassword } from '../../users/components/ForogtPassword';

export const Home = () => {
  const auth = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  const openForgotPasswordModal = () => {
    setOpenModal(true);
  };

  const onCloseForgotPasswordModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {openModal && (
        <ForogtPassword open={openModal} onClose={onCloseForgotPasswordModal} />
      )}
      <section>
        <h1>Welcome!</h1>
        <img
          alt='car'
          style={{ width: '600px', height: '350px' }}
          src={CarImg}
        />
      </section>
      <section>
        <h3>About Us</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut
          mattis purus, quis scelerisque lectus. Praesent at leo facilisis,
          facilisis libero sit amet, interdum lectus. Maecenas id sagittis
          libero, nec convallis lacus.
          <br /> Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Vivamus est sapien, tincidunt non
          luctus in, feugiat ultrices dui. Nullam vestibulum mi id nisi molestie
          vestibulum. Vivamus vitae massa tristique,
          <br /> interdum risus a, finibus risus. In lectus magna, gravida in
          elementum id, viverra ac ante.
        </p>
      </section>
      <section>
        <h4>What would you want to do?</h4>
        <div style={{ display: 'flex' }}>
          <Button to='/shop' variant='contained' size='large' color='secondary'>
            Go Shopping!
          </Button>
          {!auth.isLoggedIn && (
            <Button
              to='/auth'
              variant='contained'
              size='large'
              color='secondary'
            >
              Sign In / Sign Up
            </Button>
          )}
          {!auth.isLoggedIn && (
            <Button onClick={openForgotPasswordModal}>Forgot Password</Button>
          )}
        </div>
      </section>
    </div>
  );
};
