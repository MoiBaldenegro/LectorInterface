import {
  FingerprintReader,
  DeviceInfo,
  SampleFormat,
  QualityReported,
} from "@digitalpersona/devices";
import styles from "./finger.module.css";
import { useEffect, useState } from "react";
interface Props {
  reader: FingerprintReader | null;
  openTest: () => void;
}

export default function FingerRegister({ reader, openTest }: Props) {
  /*
    // Configurar eventos y acciones según sea necesario
    fingerprintReader.on("DeviceConnected", onDeviceConnected);
    fingerprintReader.on("DeviceDisconnected", onDeviceDisconnected);
*/
  /*
    // Iniciar la adquisición de huellas dactilares
    try {
      await fingerprintReader.startAcquisition(SampleFormat.Intermediate);
      setIsReaderInitialized(true); // Marcar el lector como inicializado
    } catch (error) {
      console.error(
        "Error al iniciar la adquisición de huellas dactilares:",
        error
      );
    }
  };
*/
  const [isReaderInitialized, setIsReaderInitialized] = useState(false);
  const [samples, setSamples] = useState();
  const [devices, setDevices] = useState<DeviceInfo[]>();
  useEffect(() => {
    reader?.on("DeviceConnected", onDeviceConnected);
    if (reader) {
      setIsReaderInitialized(true);
    }
    console.log(reader);
    return () => {
      setIsReaderInitialized(false);
    };
  });

  const handleEnumerateDevices = async () => {
    const devices = await reader?.enumerateDevices();
    console.log("Dispositivos conectados:", devices);
    handleGetDeviceInfo(devices);

    /*
  
    try {
      if (isReaderInitialized) {
        const devices = await reader?.enumerateDevices();
        console.log("Dispositivos conectados:", devices);
      } else {
        console.error("Fingerprint reader not initialized");
      }
    } catch (error) {
      console.error("Error al enumerar dispositivos:", error);
    }
    */
  };

  const handleGetDeviceInfo = async (devices: string[] | undefined) => {
    if (!devices) return;

    const deviceInfoArray: DeviceInfo[] = [];

    for (const element of devices) {
      const deviceInfo = await reader?.getDeviceInfo(element);
      if (deviceInfo) {
        deviceInfoArray.push(deviceInfo);
      }
    }

    setDevices(deviceInfoArray);
    console.log(deviceInfoArray);

    /*
    try {
      if (isReaderInitialized) {
        // Debes proporcionar el deviceUid del lector específico que deseas obtener
        const deviceUid = "device-specific-uid";
        const deviceInfo = await reader?.getDeviceInfo(deviceUid);
        console.log("Información del dispositivo:", deviceInfo);
      } else {
        console.error("Fingerprint reader not initialized");
      }
    } catch (error) {
      console.error("Error al obtener información del dispositivo:", error);
    }
    */
  };

  const onDeviceConnected = (event: any) => {
    console.log("Device connected:", event.deviceId);
  };

  const onDeviceDisconnected = (event: any) => {
    console.log("Device Disconnected:", event.deviceId);
  };

  return (
    <div className={styles.container}>
      <h1>REVISION DE LECTORES CONECTADOS DISPONIBLES</h1>
      <h5> v1.0, Test SDK helper, Powered by MBM for Tomate Febrero 2024</h5>

      <button onClick={handleEnumerateDevices}>Enumerar Dispositivos</button>
      {devices?.map((element, index) => (
        <div
          className={styles.card}
          onClick={() => {
            reader?.off(), openTest();
          }}
          key={index}
        >
          <h2>ID: {element.DeviceID}</h2>
          <h2>{element.eDeviceModality} Modalidad de Area</h2>
          <h2>{element.eDeviceTech} Optico</h2>
          <h2>{element.eUidType} Removible </h2>
        </div>
      ))}
    </div>
  );
}
