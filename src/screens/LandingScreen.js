import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedView, ThemedText, ThemedButton, useTheme } from '../themes/ThemedComponents';

const LandingScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Welcome to My App</ThemedText>
      <ThemedText style={styles.subtitle}>Connect, explore, and enjoy your experience with us.</ThemedText>
      <ThemedButton title="Sign In" onPress={() => navigation.navigate('SignIn')} style={styles.button} />
      <ThemedButton title="Sign Up" onPress={() => navigation.navigate('SignUp')} style={styles.button} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
  },
  button: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 10,
    textAlign: 'center',
  },
});

export default LandingScreen;
