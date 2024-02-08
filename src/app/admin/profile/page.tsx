import React from 'react';

const AdminProfilePage = () => {
    localStorage.setItem(
        "auth",
        JSON.stringify({
          accessToken: signUpData.accessToken,
          user: signUpData.newUser,
        })
      );
      dispatch(
        userLoggedIn({
          accessToken: signUpData.accessToken,
          user: signUpData.newUser,
        })
      );
    return (
        <div>
            <h1>Admin Profile</h1>
        </div>
    );
};

export default AdminProfilePage;