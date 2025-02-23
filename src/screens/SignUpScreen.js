import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { signUp } from '../services/authService';
import { ThemedView, ThemedText, ThemedInput, ThemedButton } from '../themes/ThemedComponents';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    dispatch(signUp(name, email, password));
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Sign Up</ThemedText>
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
      <ThemedInput placeholder="Name" value={name} onChangeText={setName} />
      <ThemedInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <ThemedInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <ThemedInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <ThemedButton title="Sign Up" onPress={handleSignUp} style={styles.button} />
      <ThemedText style={styles.link} onPress={() => navigation.navigate('SignIn')}>
        Already have an account? Sign In
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

export default SignUpScreen;
