import {Alert} from 'react-native';
import {API_URL} from '@env';

const handledeleteScanData = async (serialNumber: string) => {
  try {
    const response = await fetch(
      `${API_URL}/api/products?serialNumber=${serialNumber}`,
      {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      },
    );

    const result = await response.json();
    if (response.ok) {
      console.log(result);
      Alert.alert('Успех', 'Данные удалены!');
    } else {
      Alert.alert(`Ошибка : ${result?.message}`, `Код: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Сетевая ошибка', 'Не удалось отправить данные');
  }
};
export const handleDeletePress = (serialNumber: string) => {
  Alert.alert(
    'Удаление товара',
    `Вы уверены, что хотите удалить товар с серийным номером ${serialNumber}?`,
    [
      {
        text: 'Отмена',
        style: 'cancel',
        onPress: () => console.log('Удаление отменено'),
      },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: () => {
          handledeleteScanData(serialNumber);
        },
      },
    ],
    {cancelable: false},
  );
};
