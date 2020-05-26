import React, { useEffect, useRef } from "react";
import Quagga from "quagga";
import { InputStream } from "../config/ConfigType";
import "./Scanner.css";

interface ScannerProps {
  onDetected: Function;
  onCancel: Function;
  config: {
    inputStream: InputStream;
  };
}

const Scanner = (props: ScannerProps) => {
  const cameraOverlay = useRef(null);

  const scanner = Quagga.config(props.config).fromSource({
    ...props.config.inputStream,
    target: ".overlay__content",
  });

  const handleClose = () => {
    scanner.removeEventListener("detected", props.onDetected).stop();

    props.onCancel();
  };

  useEffect(() => {
    const scannerPromisse: any = scanner.toPromise();
    scannerPromisse.promise.then(props.onDetected).catch(props.onCancel);

    return () => {
      handleClose();
    };
  }, []);

  return (
    <div
      ref={cameraOverlay}
      className="overlay__content"
      style={{ textAlign: "center" }}
    >
      <video className="videoClass"></video>
    </div>
  );
};

export default Scanner;
