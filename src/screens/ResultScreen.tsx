import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, ResultData } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { extractFields } from '../utils/extractFields';
import { handleSendScanData } from '../utils/sendScanData';

const ResultScreen = () => {
  const [data, setData] = useState<ResultData>({});
  const route = useRoute<any>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { result } = route.params;

  useEffect(() => {
    const { brand, model, deviceType, serialNumber, manufactureCountry } = extractFields(result);
    setData({ brand, model, deviceType, serialNumber, manufactureCountry });
  }, [result]);

  const handleChange = (field: keyof typeof data, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = Object.values(data).every(Boolean);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        {Object.keys(data).map((key, index) => (
          <TextInput
            key={index}
            value={data[key]}
            onChangeText={text => handleChange(key as keyof ResultData, text)}
            placeholder={key}
            placeholderTextColor="#999"
            style={styles.input}
          />
        ))}
      </ScrollView>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          disabled={!isFormValid}
          onPress={() => {
            handleSendScanData(data);
            setData({});
          }}
        >
          <Text style={styles.buttonText}>ОТПРАВИТЬ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scan')}>
          <Text style={styles.buttonText}>ПРОДОЛЖИТЬ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>ГЛАВНОЕ МЕНЮ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6d6d6',
    padding: 16,
  },
  form: {
    paddingBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    elevation: 1,
  },
  buttons: {
    gap: 12,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: '#90caf9',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ResultScreen;


