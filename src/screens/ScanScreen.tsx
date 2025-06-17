import React from 'react';
import { View, StyleSheet } from 'react-native';
import CameraView from '../components/CameraView';
import { useNavigation } from '@react-navigation/native';
import MlkitOcr from 'react-native-mlkit-ocr';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ScanScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePicture = async (path: string) => {
    const result = await MlkitOcr.detectFromFile(path);
    const lines = result.map((b) => b.text);
    navigation.navigate('Result', { result: lines });
  };

  return (
    <View style={styles.container}>
      <CameraView onPictureTaken={handlePicture} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScanScreen;

