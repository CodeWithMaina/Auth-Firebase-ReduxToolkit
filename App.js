import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./src/redux/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { restoreUser } from "./src/redux/slices/authSlice";
import { ThemeProvider } from "./src/themes/ThemedComponents";

const AppWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser()); // 🔥 Restore user state on app start
  }, [dispatch]);

  return <AppNavigator />;
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppWrapper />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
