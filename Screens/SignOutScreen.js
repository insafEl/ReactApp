import React, { useContext } from 'react';
import { TokenContext, UsernameContext } from '../Context/Context';
import SignOut from '../Components/SignOut';

export default function SignOutScreen() {
  const [, setToken] = useContext(TokenContext);
  const [, setUsername] = useContext(UsernameContext);

  const handleSignOut = () => {
    setToken(null);
    setUsername(null);
  };

  return <SignOut onSignOutPress={handleSignOut} />;
}
