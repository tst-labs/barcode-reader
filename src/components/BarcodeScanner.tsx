import React, { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  useMediaQuery,
  DialogContent,
  DialogActions,
  Button,
  Select,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import BarcodeStartScanButton from "./BarcodeStartScanButton";
import Scanner from "./Scanner";

interface VideoInput {
  deviceId: string;
  label: string;
  groupId: string;
}

const defaultConfig = {
  frequency: 5,
  numOfWorkers: 2,
  locate: true,
  inputStream: {
    name: "Live",
    type: "LiveStream",
    constraints: {
      width: 800,
      height: 600,
      deviceId:
        "904ee42c2e57a164e7d04af030736360d6e47195c9bf9dea84cf86b5c47cbf3c",
      facingMode: "environment",
    },
    area: {
      top: "0%",
      right: "0%",
      left: "0%",
      bottom: "0%",
    },
  },
  decoder: {
    readers: ["ean_reader", "code_39_reader", "code_128_reader"],
  },
  locator: {
    halfSample: true,
    patchSize: "medium",
  },
};

const testConfig = {
  frequency: 5,
  numOfWorkers: 2,
  locate: true,
  inputStream: {
    name: "Live",
    type: "LiveStream",
    constraints: {
      width: 800,
      height: 600,
      deviceId:
        "95ac0fe1ebe4f57ca81f8f24f005daad8782280cd109b562bbef92bbcab662f4",
      facingMode: "environment",
    },
    area: { top: "0%", right: "0%", left: "0%", bottom: "0%" },
  },
  decoder: { readers: ["code_39_reader"] },
  locator: { halfSample: true, patchSize: "medium" },
};

interface BarcodeScannerProps {
  setCodeScanner: React.Dispatch<React.SetStateAction<string>>;
}

const BarcodeScanner = (props: BarcodeScannerProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<VideoInput>();
  const [videoDevicesList, setVideoDevicesList] = useState<VideoInput[]>();

  const listVideoDevices = async () => {
    const lDevices: MediaDeviceInfo[] = await navigator.mediaDevices.enumerateDevices();
    const lvd: VideoInput[] = lDevices
      .filter((d: MediaDeviceInfo) => d.kind === "videoinput")
      .map((videoDevice) => {
        return {
          deviceId: videoDevice.deviceId,
          label: videoDevice.label,
          groupId: videoDevice.groupId,
        };
      });
    setVideoDevicesList(lvd);
  };

  useEffect(() => {
    listVideoDevices();
    return () => {
      {
        console.log("Closing");
      }
    };
  }, []);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const closeCamera = () => {
    setOpen(false);
  };
  const openScanner = () => {
    setOpen(true);
  };

  const handleScanResult = (result: any) => {
    if (result) {
      closeCamera();
      props.setCodeScanner(result.codeResult.code);
    }
  };

  const handleCameraSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log("Evento chamado");
    console.log(event.target.value as string);
  };

  const stopScan = () => {
    closeCamera();
  };

  return (
    <>
      <Dialog open={open} onClose={closeCamera} fullScreen={fullScreen}>
        <DialogTitle id="barcode-camera-dialog">{"Camera"}</DialogTitle>
        <DialogContent>
          <Scanner
            config={testConfig}
            onDetected={handleScanResult}
            onCancel={stopScan}
          />
        </DialogContent>
        <DialogActions>
          <Select native value={selectedCamera} onChange={handleCameraSelect}>
            {videoDevicesList?.map((vd) => (
              <option key={vd.deviceId} value={vd.deviceId}>
                {vd.label}
              </option>
            ))}
          </Select>
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
