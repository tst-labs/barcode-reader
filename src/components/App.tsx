import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import BarCodeAppBar from "./BarCodeAppBar";
import BarcodeCardList from "./BarcodeCardList";
import BarcodeScanner from "./BarcodeScanner";
import { load, persist } from "../utils/Storage";
import defaultCameraConfig from "../config/defaultCameraConfig";
import { CameraConfig } from "../config/ConfigType";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

const App = () => {
  const classes = useStyles();
  const [codeScanned, setCodeScanner] = useState("");
  const [config, setConfig] = useState(defaultCameraConfig);
  useEffect(() => {
    const loadConfig = () => {
      const barcodeConfig = load("barcode-config");
      if (!barcodeConfig) {
        persist("barcode-config", defaultCameraConfig);
        setConfig(defaultCameraConfig);
      } else {
        setConfig(barcodeConfig);
      }
    };

    loadConfig();
    return () => {};
  }, []);

  const updateConfig = (newConfig: CameraConfig): object => {
    persist("barcode-config", newConfig);
    setConfig(newConfig);
    return newConfig;
  };

  return (
    <div className={classes.root}>
      <BarCodeAppBar updateConfig={updateConfig} actualConfiguration={config} />
      <BarcodeCardList
        setCodeScanner={setCodeScanner}
        codeScannerd={codeScanned}
      />
      <BarcodeScanner setCodeScanner={setCodeScanner} activeConfig={config} />
    </div>
  );
};

export default App;
