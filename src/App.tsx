import React, { useEffect, useState } from "react";
import {
  DeviceConnected,
  DeviceDisconnected,
  FingerprintReader,
  QualityCode,
  QualityReported,
  SampleFormat,
  SamplesAcquired,
} from "@digitalpersona/devices";
import "./App.css";

import "./core/modules/WebSdk/index";
import FingerRegister from "./FingerRegister/fingerRegister";
import { useModal } from "./Hooks/useModals";
import TestFinger from "./FingerRegister/FingerTest/fingerTest";

function App() {
  const testFinger = useModal("testFinger");
  const [reader, setReader] = useState<FingerprintReader | null>(null);
  const [connectedDevices, setConnectedDevices] = useState<number>(0);
  const [id, setId] = useState<string>();

  useEffect(() => {
    const initReader = async () => {
      const fingerprintReader = new FingerprintReader();
      setReader(fingerprintReader);
      console.log(fingerprintReader);

      // fingerprintReader.on("DeviceConnected", onDeviceConnected);
      // fingerprintReader.on("DeviceDisconnected", onDeviceDisconnected);
      // fingerprintReader.on("QualityReported", onQualityReported);
      fingerprintReader.on("SamplesAcquired", onSamplesAcquired);
      // fingerprintReader.on("ErrorOccurred", onReaderError);

      try {
        const huella = await fingerprintReader.startAcquisition(
          SampleFormat.Intermediate
        );
        console.log(huella);
      } catch (error) {
        console.error(
          "Error al iniciar la adquisición de huellas dactilares:",
          error
        );
      }
    };

    initReader();
  }, []);

  const onDeviceConnected = (event: DeviceConnected) => {
    console.log(event);
  };

  const onDeviceDisconnected = (event: DeviceDisconnected) => {
    console.log(event);
  };

  const onQualityReported = (event: QualityReported) => {
    if (event.quality === 0) {
    }
  };

  const onSamplesAcquired = async (event: SamplesAcquired) => {
    try {
      const samples = event.samples;
      // Enviar las muestras al servidor para identificación o autenticación
      // ...
    } catch (error) {
      console.error("Error al procesar muestras de huellas dactilares:", error);
    }
  };

  const onReaderError = (event: any) => {
    // Manejar el evento de error del lector de huellas dactilares
  };

  return (
    <>
      <FingerRegister reader={reader} openTest={testFinger.openModal} />
      {/*<button onClick={testFinger.openModal}>Iniciar Captura de Huellas</button>*/}
      {testFinger.isOpen && testFinger.modalName === "testFinger" ? (
        <TestFinger
          isOpen={testFinger.isOpen}
          onClose={testFinger.closeModal}
          id={""}
        >
          Finger register testing
        </TestFinger>
      ) : null}
    </>
  );
}

export default App;
