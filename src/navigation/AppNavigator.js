import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import LandingScreen from '../screens/LandingScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../themes/ThemedComponents';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBarLabel = ({ title }) => (
  <View style={{ position: 'absolute', top: -30, alignSelf: 'center' }}>
    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
  </View>
);

const AuthStack = () => (
  <Stack.Navigator initialRouteName='Landing' screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const MainTabs = () => {
  const { theme } = useTheme(); // Corrected to use `theme` instead of `colors`

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.background, // Themed background
          height: 60,
          borderTopWidth: 1,
          borderTopColor: theme.inputBorder, // Themed border
          elevation: 5, // For shadow effect
        },
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Post') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={28}
              color={focused ? theme.buttonBackground : theme.label} // Themed colors
            />
          );
        },
        tabBarActiveTintColor: theme.buttonBackground,
        tabBarInactiveTintColor: theme.label,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
const AppNavigator = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;