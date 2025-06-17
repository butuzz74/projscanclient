import React, {useRef} from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

type Props = {
  onPictureTaken: (path: string) => void;
};

const CameraView: React.FC<Props> = ({ onPictureTaken }) => {
   const cameraRef = useRef<RNCamera>(null);

  const takePicture = async () => {
     if (cameraRef.current) {
       const options = { quality: 0.5, base64: false };
       const data = await cameraRef.current.takePictureAsync(options);
       onPictureTaken(data.uri);
     }

  };

  return (
    <View style={styles.container}>
       <RNCamera
        ref={cameraRef}
        style={styles.preview}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
      />
      <TouchableOpacity onPress={takePicture} style={styles.capture}>
        <Text style={styles.captureText}>📷 Сканировать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  preview: { flex: 1 },
  capture: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  captureText: { fontSize: 16 },
});

export default CameraView;


