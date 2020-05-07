import React, { useEffect } from "react";
import Quagga from "quagga";

interface ScannerProps {
  onDetected: Function;
  onCancel: Function;
  config: {
    inputStream: any;
  };
}

const Scanner = (props: ScannerProps) => {
  const handleClose = () => {
    scanner.removeEventListener("detected", props.onDetected).stop();
    props.onCancel();
  };

  const scanner = Quagga.config(props.config).fromSource({
    ...props.config.inputStream,
    target: ".overlay__content",
  });

  useEffect(() => {
    const scannerPromisse: any = scanner.toPromise();
    scannerPromisse.promise.then(props.onDetected).catch(props.onCancel);

    return () => {
      console.log("handle close");
      handleClose();
    };
  }, []);

  return (
    <div className="overlay__content">
      <video style={{ width: "95%", height: "95%" }}></video>
    </div>
  );
};

export default Scanner;
