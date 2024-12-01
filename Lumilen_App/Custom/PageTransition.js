import React from 'react';
import * as Animatable from 'react-native-animatable';  // Đảm bảo import đúng thư viện

const PageTransition = ({ children, effect, duration = 300, delay = 0 }) => {
  let animationType = '';
  
  // Chọn animationType tùy vào prop effect truyền vào
  switch (effect) {
    case 1:  // từ trái sang phải
      animationType = 'fadeInLeft';
      break;
    case 2:  // từ phải sang trái
      animationType = 'fadeInRight';
      break;
    case 3: // từ dưới lên
      animationType = 'fadeInUp';
      break;
    case 4: // từ trên xuốngxc                                          
      animationType = 'fadeInDown';
      break;
    default: // Mặc định là fadeIn
      animationType = 'fadeIn';  // Mặc định là fadeIn
  }

  return (
    <Animatable.View animation={animationType} duration={duration} delay={delay} style={{ flex: 1 }}>
      {children}
    </Animatable.View>
  );
};

export default PageTransition;  // Đảm bảo export mặc định
