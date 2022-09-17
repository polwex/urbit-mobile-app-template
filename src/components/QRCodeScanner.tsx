import { useEffect, useState } from "react";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QrCodeReader: React.FC<{ onScan: (text: string) => void }> = ({
  onScan,
}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);
  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    onScan(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function toggle() {
    // const i = cameras.indexOf(cam);
    // const i2 = i === cameras.length - 1 ? 0 : i + 1;
    // if (scanner) scanner.stop();
    // startCamera(cameras[i2]);
  }

  const styles = StyleSheet.create({
    wrapper: {
      width: 320,
      height: 320,
      margin: "auto",
    },
  });

  return (
    <View style={styles.wrapper}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
      {/* <Button title="toggle" onPress={toggle}>
        Change Camera
      </Button> */}
    </View>
  );
};

export default QrCodeReader;
