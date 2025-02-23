/* Folder Structure */

my-app/
|-- src/
|   |-- components/          # Reusable UI components
|   |-- navigation/          # Stack and Bottom Tab Navigation
|   |-- screens/             # App screens (Landing, Auth, Home, Post, Profile)
|   |-- redux/               # Redux state management
|   |   |-- slices/          # Redux slices for different states
|   |   |-- store.js         # Redux store configuration
|   |-- services/            # Firebase services (Auth, Firestore)
|   |-- themes/              # Theming (Dark & Light mode)
|   |-- utils/               # Helper functions
|-- assets/                  # Static assets (icons, images)
|-- App.js                   # Entry point
|-- package.json             # Dependencies
|-- README.md                # Documentation


/* Installation Guide */

1. Install dependencies:
```sh
npm install react-native-navigation react-redux @reduxjs/toolkit firebase @react-native-async-storage/async-storage react-native-screens react-native-vector-icons react-native-paper react-native-appearance @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context react-native-vector-icons
```

2. Configure Firebase:
   - Create a Firebase project
   - Add Firestore Database
   - Enable Authentication (Email & Password)
   - Get Firebase config and add it to `src/services/firebaseConfig.js`

3. Implement Firebase Authentication Service:
Create `src/services/authService.js`:
```js
import auth from 'firebase/auth';
import firestore from 'firebase/firestore';
import { firebaseApp } from './firebaseConfig';

const signUp = async (name, email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    await firestore().collection('users').doc(userCredential.user.uid).set({
      uid: userCredential.user.uid,
      name,
      email,
      profilePicture: '',
      bio: ''
    });
    return userCredential;
  } catch (error) {
    throw error;
  }
};

const signIn = async (email, password) => {
  try {
    return await auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    throw error;
  }
};

const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    throw error;
  }
};

export { signUp, signIn, signOut };
```

4. Implement Redux for Auth State Management:
Create `src/redux/slices/authSlice.js`:
```js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => { state.loading = true; },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
```

5. Configure Redux Store:
Create `src/redux/store.js`:
```js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
```

6. Implement Navigation:
Create `src/navigation/AppNavigator.js`:
```js
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Post" component={PostScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
```

7. Implement Theming with Dark & Light Mode:
Create `src/themes/theme.js`:
```js
import { useColorScheme } from 'react-native';

export const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  primary: '#6200ea',
};

export const darkTheme = {
  background: '#121212',
  text: '#ffffff',
  primary: '#bb86fc',
};

export const useTheme = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
};
```

8. Modify `App.js` to use Navigation:
```js
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
```

9. Run the app:
```sh
npx react-native run-android  # For Android
npx react-native run-ios      # For iOS (Mac only)
```


Light Mode:
Background: #F5F5F5 (Soft Light Gray)
Text Color: #333333 (Dark Gray for readability)
Input Background: #FFFFFF (White for clarity)
Input Border: #DDDDDD (Subtle border)
Primary Button: #6A1B9A (Deep Purple)
Button Text: #FFFFFF (White)
Label Color: #666666 (Medium Gray for readability)
Shadow Color: #00000010 (Subtle black with transparency)
Dark Mode:
Background: #121212 (Dark Charcoal for true dark mode)
Text Color: #E0E0E0 (Light Gray for contrast)
Input Background: #1E1E1E (Dark Gray for inputs)
Input Border: #333333 (Slightly lighter than background)
Primary Button: #BB86FC (Material You Purple)
Button Text: #121212 (Dark for contrast with light button)
Label Color: #AAAAAA (Muted Gray for readability)
Shadow Color: #00000050 (Softer black shadow)
These colors ensure a modern, accessible, and visually appealing UI in both modes! Want me to implement the changes? 🚀






import React from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Text,
} from "react-native";
import {
  ThemedView,
  ThemedText,
  ThemedButton,
} from "../themes/ThemedComponents";

const profileData = {
  username: "nasa",
  profileImage:
    "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg",
  posts: "3,946",
  followers: "95.3M",
  following: "77",
  bio: "🚀🌍 Exploring the universe and our home planet.",
  highlights: [
    { id: "1", title: "Join Us", icon: "📋" },
    { id: "2", title: "Wallpapers", icon: "📱" },
    { id: "3", title: "Follow", icon: "💙" },
    { id: "4", title: "Missions", icon: "🛰️" },
  ],
  postsImages: [
    { id: "1", image: "https://via.placeholder.com/150" },
    { id: "2", image: "https://via.placeholder.com/150" },
    { id: "3", image: "https://via.placeholder.com/150" },
    { id: "4", image: "https://via.placeholder.com/150" },
  ],
};

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.profileImageContainer}>
            <Image
              source={{ uri: profileData.profileImage }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <ThemedText style={styles.username}>
            @{profileData.username}
          </ThemedText>
          <ThemedText style={styles.bio}>{profileData.bio}</ThemedText>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>
                {profileData.posts}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Posts</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>
                {profileData.followers}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Followers</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>
                {profileData.following}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Following</ThemedText>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.followButton]}
              onPress={() => {}}
            >
              <Text style={styles.buttonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.messageButton]}
              onPress={() => {}}
            >
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          horizontal
          data={profileData.highlights}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.highlightItem}>
              <ThemedText style={styles.highlightIcon}>{item.icon}</ThemedText>
              <ThemedText style={styles.highlightText}>{item.title}</ThemedText>
            </View>
          )}
          contentContainerStyle={styles.highlightsContainer}
          showsHorizontalScrollIndicator={false} // Remove scrollbar
        />

        <FlatList
          key={profileData.postsImages.length}
          numColumns={3}
          data={profileData.postsImages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Image source={{ uri: item.image }} style={styles.postImage} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.postsContainer}
          showsVerticalScrollIndicator={false} // Remove scrollbar
        />
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Match the theme background
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#6A1B9A",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    color: "#666666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#666666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2, // Add elevation for Android shadow
  },
  followButton: {
    flex: 0.6, // 60% of the screen width
    backgroundColor: "#6A1B9A", // Purple color for follow button
    marginRight: 8, // Add some spacing between buttons
  },
  messageButton: {
    flex: 0.3, // 30% of the screen width
    backgroundColor: "#4CAF50", // Green color for message button
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#FFFFFF", // White text for better contrast
  },
  highlightsContainer: {
    paddingVertical: 10,
  },
  highlightItem: {
    alignItems: "center",
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    elevation: 2, // Add elevation for Android shadow
  },
  highlightIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 14,
    color: "#333333",
  },
  postsContainer: {
    paddingVertical: 16,
  },
  postImage: {
    width: "32%",
    aspectRatio: 1,
    margin: "0.5%",
    borderRadius: 8,
  },
});

export default ProfileScreen;