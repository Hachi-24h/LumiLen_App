// UpdateEmailScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const UpdateEmailScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState(route.params.email); // lấy email hiện tại từ route params
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  const handleUpdateEmail = () => {
    if (!validateEmail(email)) {
      setError('Yêu cầu nhập đúng định dạng Gmail.');
      return;
    }
    // Nếu đúng định dạng, cập nhật email
    navigation.navigate('AccountManagement', { updatedEmail: email }); // Quay lại và cập nhật email
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Nhập Gmail của bạn"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: validateEmail(email) ? '#2196F3' : '#ccc' }]}
        onPress={handleUpdateEmail}
        disabled={!validateEmail(email)} // Vô hiệu hóa nếu email không hợp lệ
      >
        <Text style={styles.buttonText}>Cập nhật</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  button: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default UpdateEmailScreen;
