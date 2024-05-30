import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Pressable, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import { setAccessToken, setRefreshToken } from '../../store/actions';
import withRedux from '../../store/withRedux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const menuWidth = windowWidth * (4 / 5);  // 메뉴바 너비를 전체 화면의 4/5로 설정


const MenuBar: React.FC<{ setResetMenuBar: (resetFn: () => void) => void }> = ({ setResetMenuBar }) => {
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(windowWidth))[0];
  const overlayAnim = useState(new Animated.Value(0))[0];
  const [containerZIndex, setContainerZIndex] = useState(0);
  const accessToken = useSelector((state: any) => state.accessToken);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://43.201.164.254:8080/api/v1/member/logout', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      console.log('Logout successful:', response.data);
      dispatch(setAccessToken(""));
      dispatch(setRefreshToken(""));
      EncryptedStorage.setItem("refreshToken" , "");
  
      navigation.replace('Login');
    } catch (error) {
      console.error('Error during logout:', error.response.data);
    }
  };
  
  const confirmLogout = () => {
    Alert.alert(
      "로그아웃",
      "정말 로그아웃하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "확인",
          onPress: handleLogout,
        }
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (setResetMenuBar) {
      setResetMenuBar(() => closeMenu);
    }
  }, [setResetMenuBar]);

  const buttons = [
    {
      text: 'CS면접\n시작하기',
      onPress: () => {
        closeMenu();
        navigation.navigate('SelectTopic');
      },
    },
    {
      text: '자기소개서\n면접 시작하기',
      onPress: () => {
        closeMenu();
        navigation.navigate('WriteSelfIntro');
      },
    },
    {
      text: '대화목록\n확인하기',
      onPress: () => { 
        closeMenu();
        navigation.navigate('ChattingRetrieve');
      },
    },
    {
      text: '로그아웃 하기',
      onPress: () => {
        closeMenu();
        confirmLogout();
      },
      style: { color: 'red' }, // "로그아웃 하기" 메뉴의 텍스트 색상을 빨간색으로 설정
    },
  ];

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    setContainerZIndex(100);
    Animated.timing(slideAnim, {
      toValue: windowWidth - menuWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(overlayAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    Animated.timing(slideAnim, {
      toValue: windowWidth,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      // 애니메이션이 완료된 후에 zIndex를 변경합니다.
      setContainerZIndex(0);
    });
    Animated.timing(overlayAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={[styles.container, { zIndex: containerZIndex }]}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Image source={require('../../assets/menu.png')} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
      {isMenuOpen && (
        <>
          {/* 로그아웃 버튼를 오버레이 밑으로 이동 */}
          <Pressable style={styles.overlay} onPress={closeMenu}>
            <Animated.View style={{
              ...styles.overlay,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              opacity: overlayAnim,
            }} />
          </Pressable>
          <Animated.View style={[
            styles.menuContainer,
            { transform: [{ translateX: slideAnim }] },
            { width: menuWidth, height: windowHeight },
          ]}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              {buttons.map((button, index) => (
                <TouchableOpacity key={index} style={styles.menuItem} onPress={button.onPress}>
                  <Text style={[styles.menuItemText, button.style]}>{button.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 101,
    padding: 10,
    borderRadius: 5,
    width: 20, // 너비를 20으로 설정
    height: 20, // 높이를 20으로 설정
  },
  
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 102,
    elevation: 4,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItemText: {
    fontSize: 18,
  },
});

export default withRedux(MenuBar);