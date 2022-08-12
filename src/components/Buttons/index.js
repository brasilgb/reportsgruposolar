import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { BackgroundIcon, ButtomText, NavButton, ScrollContainer } from './style';

const BoxButtom = ({ children }) => {

  return (
    <ScrollContainer>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ display: 'flex' }}>
        {children}
      </ScrollView>
    </ScrollContainer>

  );
}

const ButtomSetores = ({ bgColor, icon, title, onPress, startColor, endColor, textColor }) => {

  const navigation = useNavigation();
  const [loadButtom, setLoadButtom] = useState(false);

  const toggleLoading = (onPress) => {
    setLoadButtom(!loadButtom);
    setTimeout(() => {
      navigation.navigate(onPress);
      setLoadButtom(false);
    }, 1);

  };
  return (

    <NavButton
      bgColor={bgColor}
      onPress={() => toggleLoading(onPress)}
    >
      <LinearGradient colors={[startColor, endColor]}
        style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}
        start={{ x: 0.1, y: 0.8 }}
        end={{ x: 0.1, y: 0.1 }}
      >

        <>
          <BackgroundIcon bgColor={startColor}>
            {loadButtom ?
              <ActivityIndicator size={25} color={textColor} />
              :
              <Icon name={icon} size={25} color={textColor} />
            }
          </BackgroundIcon>
          <ButtomText color={textColor} >
            {title}
          </ButtomText>
        </>

      </LinearGradient>
    </NavButton>

  );
}

export { BoxButtom, ButtomSetores }