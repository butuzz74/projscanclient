import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useRoute, useNavigation} from '@react-navigation/native';
import {RootStackParamList, ResultData} from '../types/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {extractFields} from '../utils/extractFields';
import {handleSendScanData} from '../utils/sendScanData';
import {handleDeletePress} from '../utils/deleteScanData';
import {countryOfOrigin} from '../config/config';

const getEmptyData = (): ResultData => ({
  brand: '',
  model: '',
  deviceType: '',
  serialNumber: '',
  manufactureCountry: '',
});

const ResultScreen = () => {
  const [data, setData] = useState<ResultData>(getEmptyData());
  const [serialNum, setSerialNum] = useState('');
  const [country, setCountry] = useState('');
  const route = useRoute<any>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {result} = route.params;

  useEffect(() => {
    const {brand, model, deviceType, serialNumber, manufactureCountry} =
      extractFields(result);
    setData({brand, model, deviceType, serialNumber, manufactureCountry});
    setSerialNum(serialNumber);
    if (manufactureCountry) {
      setCountry(manufactureCountry);
    }
  }, [result]);

  useEffect(() => {
    setData(prev => ({...prev, manufactureCountry: country}));
  }, [country]);

  const handleChange = (field: keyof ResultData, value: string) => {
    setData(prev => ({...prev, [field]: value}));
  };

  const isFormValid = Object.values({
    ...data,
    manufactureCountry: country,
  }).every(v => v && v !== '');

  const resetForm = () => {
    setData(getEmptyData());
    setCountry('');
    setSerialNum('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {Object.entries(data).map(([key, dataValue], index) =>
          key !== 'manufactureCountry' ? (
            <TextInput
              key={index}
              value={dataValue}
              onChangeText={text => handleChange(key as keyof ResultData, text)}
              placeholder={key}
              placeholderTextColor="#999"
              style={styles.input}
            />
          ) : (
            <View key={index} style={styles.input}>
              <Picker
                selectedValue={country}
                onValueChange={value => setCountry(value)}>
                <Picker.Item
                  label={
                    country.length !== 0
                      ? country
                      : 'Выберите страну происхождения'
                  }
                  value={country}
                />
                {countryOfOrigin.map(b => (
                  <Picker.Item label={b} value={b} key={b} />
                ))}
              </Picker>
            </View>
          ),
        )}

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            disabled={!isFormValid}
            onPress={() => {
              handleSendScanData(data);
              resetForm();
            }}>
            <Text style={styles.buttonText}>ОТПРАВИТЬ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            disabled={!isFormValid}
            onPress={() => {
              handleDeletePress(serialNum);
              resetForm();
            }}>
            <Text style={styles.buttonText}>УДАЛИТЬ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => resetForm()}>
            <Text style={styles.buttonText}>ОЧИСТИТЬ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Scan')}>
            <Text style={styles.buttonText}>ПРОДОЛЖИТЬ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>ГЛАВНОЕ МЕНЮ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6d6d6',
  },
  scrollContent: {
    padding: 16,
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
    marginTop: 16,
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
