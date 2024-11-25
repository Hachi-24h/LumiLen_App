import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, StyleSheet, Modal } from 'react-native';

const LoadingModal = ({ loading, text = "Xin vui lòng chờ..." }) => {
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.stagger(300, [
        Animated.sequence([
          Animated.timing(opacity1, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(opacity1, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(opacity2, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(opacity2, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(opacity3, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(opacity3, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, [opacity1, opacity2, opacity3]);

  if (!loading) {
    return null;
  }

  return (
    <Modal transparent={true} visible={loading}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Hiệu ứng 3 dấu chấm */}
          <View style={styles.dotsContainer}>
            <View style={styles.dotsWrapper}>
              <Animated.Text style={[styles.dot, { opacity: opacity1 }]}>.</Animated.Text>
              <Animated.Text style={[styles.dot, { opacity: opacity2 }]}>.</Animated.Text>
              <Animated.Text style={[styles.dot, { opacity: opacity3 }]}>.</Animated.Text>
            </View>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền tối mờ
  },
  container: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Không có màu nền
  },
  dotsWrapper: {
    flexDirection: 'row',
  },
  dot: {
    fontSize: 100, // Kích thước dấu chấm
    color: 'red', // Đổi màu thành đỏ
    marginHorizontal: 0,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    color: 'white', // Màu chữ trắng
    textAlign: 'center',
  },
});

export default LoadingModal;
