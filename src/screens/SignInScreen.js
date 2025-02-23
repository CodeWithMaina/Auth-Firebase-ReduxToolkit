import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn } from '../services/authService';
import { ThemedView, ThemedText, ThemedInput, ThemedButton } from '../themes/ThemedComponents';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSignIn = () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    dispatch(signIn(email, password));
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Sign In</ThemedText>
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
      <ThemedInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <ThemedInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <ThemedButton title="Sign In" onPress={handleSignIn} style={styles.button} />
      <ThemedText style={styles.link} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 10,
  },
  link: {
    marginTop: 10,
    color: '#6A1B9A',
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;
