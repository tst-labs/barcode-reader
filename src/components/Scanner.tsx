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
  const scanner = Quagga.config(props.config).fromSource({
    ...props.config.inputStream,
    target: ".overlay__content",
  });

  useEffect(() => {
    const scannerPromisse: any = scanner.toPromise();
    scannerPromisse.promise.then(props.onDetected).catch(props.onCancel);

    return () => {
      scanner.removeEventListener("detected", props.onDetected).stop();
      console.log("cleanup...");
    };
  }, [scanner, props.onDetected, props.onCancel]);

  return <div className="overlay__content" />;
};

export default Scanner;
