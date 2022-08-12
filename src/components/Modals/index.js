import React from 'react';
import { Dimensions } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Icon from '@expo/vector-icons/Ionicons';
import { Portal } from 'react-native-portalize';
import { Header } from './style';

export default function Modals({ children, title, modalizeRef }) {

    const { width, height } = Dimensions.get('screen');

    const handleClose = dest => {
        if (modalizeRef.current) {
            modalizeRef.current.close(dest);
        }
    };
    return (
        <Portal>
            <Modalize
                ref={modalizeRef}
                snapPoint={height / 1.2}
                modalHeight={height / 1.2}
                withHandle={false}
                HeaderComponent={
                    <Header>
                        <Icon onPress={handleClose} name="chevron-down-circle-outline" size={30} color={'#555'} />
                        <Header.Title>{ title }</Header.Title>
                    </Header>
                }
            >
                {children}
            </Modalize>
        </Portal>
    );
}
