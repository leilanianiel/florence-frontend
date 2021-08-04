import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId ='757030491654-o9ijmooa15go8rqbs8n8a0vj1ghfbgd1.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;