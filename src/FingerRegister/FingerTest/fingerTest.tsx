import { FingerprintReader, SampleFormat } from "@digitalpersona/devices";
import styles from "./fingerTest.module.css";
import { useState } from "react";
import "../../core/modules/WebSdk";
interface Props {
  isOpen: any;
  onClose: any;
  children: any;
  id: string;
}
export default function TestFinger({ isOpen, onClose, children, id }: Props) {
  const [reader, setReader] = useState<FingerprintReader | null>(null);
  const [capturedFingerprint, setCapturedFingerprint] = useState<string | null>(
    null
  );
  const [huella, setHuella] = useState();

  const initReader = async () => {
    try {
      const fingerprintReader = new FingerprintReader();
      setReader(fingerprintReader);
      console.log("Fingerprint reader initialized:", fingerprintReader);

      fingerprintReader.on("SamplesAcquired", onSamplesAcquired);

      await fingerprintReader.startAcquisition(
        SampleFormat.PngImage,
        "D10C5D6F-6A62-A447-89B7-A4BB77B7BA10"
      );
      console.log("Fingerprint acquisition started successfully.");
    } catch (error) {
      console.error("Error during fingerprint reader initialization:", error);
      if (reader) {
        reader.off();
        setReader(null);
      }
    }
  };

  /*
  const initReader = async () => {
    const fingerprintReader = new FingerprintReader();
    setReader(fingerprintReader);
    console.log(fingerprintReader);

    fingerprintReader.on("SamplesAcquired", onSamplesAcquired);

    try {
      await fingerprintReader.startAcquisition(SampleFormat.Intermediate);
    } catch (error) {
      console.error(
        "Error al iniciar la adquisición de huellas dactilares:",
        error
      );
      fingerprintReader.off();
      setReader(null);
    }
  };
  */

  const onSamplesAcquired = async (event: any) => {
    try {
      const samples = event.samples;
      console.log(samples);
      console.log("ENTRE ACA");
      const fingercapture = samples[0].replace(/_/g, "/").replace(/-/g, "+");
      // Aquí podrías procesar las muestras y convertirlas a una representación de cadena (huella)
      // const fingerprint = processSamples(samples);
      //setCapturedFingerprint(fingerprint);
      setHuella(fingercapture);
    } catch (error) {
      console.error("Error al procesar muestras de huellas dactilares:", error);
    }
  };

  const processSamples = (samples: any) => {
    // Implementa la lógica para procesar las muestras y convertirlas a una representación de cadena (huella)
    // Devuelve la huella procesada (cadena)
    return "Fingerprint Data"; // Reemplaza esto con tu lógica real
  };

  const startFingerprintCapture = () => {
    initReader();
  };

  return (
    <div className={styles.screen}>
      <section className={styles.modal}>
        <h1>{children}</h1>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div>
          <button onClick={startFingerprintCapture}>
            Iniciar Captura de Huellas
          </button>
        </div>
        {capturedFingerprint && (
          <div>
            <p>Huella Capturada:</p>
            <pre>{capturedFingerprint}</pre>
          </div>
        )}
        <div className={styles.capture}>
          {huella && (
            <img src={`data:image/png;base64,${huella}`} alt="Imagen" />
          )}
        </div>
      </section>
    </div>
  );
}
