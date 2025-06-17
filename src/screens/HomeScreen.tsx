import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  StatusBar,
} from 'react-native';
import { RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#808080" barStyle="dark-content" />
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>ProjScan</Text>
      <Text style={styles.subtitle}>Сканирование и учёт проекторов</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scan')}>
        <Text style={styles.buttonText}>НАЧАТЬ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => BackHandler.exitApp()}>
        <Text style={styles.buttonText}>ВЫЙТИ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6d6d6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;

