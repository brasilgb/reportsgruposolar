import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Loading({ color }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={color} style={{ opacity: 0.5}}/>
        </View>
    );
}