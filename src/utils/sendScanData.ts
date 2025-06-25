import {ResultData} from '../types/types';
import {Alert} from 'react-native';
import {API_URL} from '@env';

export const handleSendScanData = async (structuredData: ResultData) => {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(structuredData),
    });

    const result = await response.json();
    if (response.ok) {
      console.log(result);
      Alert.alert('Успех', 'Данные успешно отправлены!');
    } else {
      Alert.alert(`Ошибка : ${result?.message}`, `Код: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Сетевая ошибка', 'Не удалось отправить данные');
  }
};
