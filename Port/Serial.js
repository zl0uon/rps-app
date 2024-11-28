import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-classic';

const App = () => {
  const [device, setDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initializeBluetooth = async () => {
      await BluetoothSerial.requestEnable();
      const devices = await BluetoothSerial.list();
      const foundDevice = devices.find(d => d.name === 'YourDeviceName');
      if (foundDevice) {
        setDevice(foundDevice);
      }
    };

    initializeBluetooth();

    // Cleanup function when the component is unmounted
    return () => {
      if (isConnected) {
        BluetoothSerial.disconnect();
      }
    };
  }, [isConnected]);

  const connect = async () => {
    if (device) {
      await BluetoothSerial.connect(device.id);
      setIsConnected(true);
    }
  };

  const sendData = async (data) => {
    if (isConnected) {
      await BluetoothSerial.write(data);
    }
  };

  return (
    <View>
      <Text>{isConnected ? 'Connected' : 'Not Connected'}</Text>
      <Button title="Connect" onPress={connect} />
      <Button title="Turn ON" onPress={() => sendData('1')} />
      <Button title="Turn OFF" onPress={() => sendData('0')} />
    </View>
  );
};

export const sendSerial = (choice) => {
  console.log(`Sending to Serial: ${choice}`);
};

export default App;
