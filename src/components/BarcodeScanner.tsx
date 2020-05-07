import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
import BarcodeStartScanButton from "./BarcodeStartScanButton";
import Scanner from "./Scanner";
import { CameraConfig } from "../config/ConfigType";
interface BarcodeScannerProps {
  setCodeScanner: React.Dispatch<React.SetStateAction<string>>;
  activeConfig: CameraConfig;
}

const BarcodeScanner = (props: BarcodeScannerProps) => {
  const [openCamera, setOpenCamera] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const closeCamera = () => {
    setOpenCamera(false);
  };
  const openScanner = () => {
    setOpenCamera(true);
  };

  const handleScanResult = (result: any) => {
    if (result) {
      closeCamera();
      props.setCodeScanner(result.codeResult.code);
    }
  };

  const stopScan = () => {
    closeCamera();
  };

  return (
    <>
      <Dialog open={openCamera} onClose={closeCamera} fullScreen={fullScreen}>
        <DialogTitle id="barcode-camera-dialog">{"Camera"}</DialogTitle>
        <DialogContent>
          <Scanner
            config={props.activeConfig}
            onDetected={handleScanResult}
            onCancel={stopScan}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={closeCamera}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      <BarcodeStartScanButton openScanner={openScanner} />
    </>
  );
};

export default BarcodeScanner;
