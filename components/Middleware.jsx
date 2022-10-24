import { Text } from "react-native";
import React from "react";

import { useAuthStatus } from "../hooks/useAuthStatus";
import LoginScreen from "../screens/LoginScreen";

import Navigator from "../stacks/Navigator";

const Middleware = () => {

  
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Text>Checking status...</Text>;
  }

  return loggedIn ? <Navigator /> : <LoginScreen />;
};

export default Middleware;
