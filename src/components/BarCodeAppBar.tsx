import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  makeStyles,
  Select,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import SettingsIcon from "@material-ui/icons/Settings";
import React, { useLayoutEffect, useState } from "react";
import { CameraConfig } from "../config/ConfigType";
import { VideoInput } from "./VideoInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

interface BarCodeAppBarProps {
  updateConfig: Function;
  actualConfiguration: CameraConfig;
}

export default function BarCodeAppBar(props: BarCodeAppBarProps) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openConfig, setOpenConfig] = useState<boolean>(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(
    props.actualConfiguration.inputStream.constraints.deviceId
  );
  const [videoDevicesList, setVideoDevicesList] = useState<VideoInput[]>();
  const [activeConfig, setActiveConfig] = useState<CameraConfig>(
    props.actualConfiguration
  );

  const toogleConfigurationDialog = () => {
    setOpenConfig(!openConfig);
  };

  const saveConfig = () => {
    props.updateConfig(activeConfig);
    toogleConfigurationDialog();
  };

  useLayoutEffect(() => {
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
    listVideoDevices();
    return () => {
      console.log("Closing");
    };
  }, []);

  let cameraIndex = 0;

  const handleCameraSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedVideoID: string = event.target.value as string;

    const newConstraints = {
      ...activeConfig.inputStream.constraints,
      deviceId: selectedVideoID,
    };
    const newInputStream = {
      ...activeConfig.inputStream,
      constraints: newConstraints,
    };
    const modConfig = {
      ...activeConfig,
      inputStream: newInputStream,
    };
    setSelectedDeviceId(selectedVideoID);
    setActiveConfig(modConfig);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Leitor de código de barras
          </Typography>
          <IconButton
            color="inherit"
            aria-label="config"
            className={classes.menuButton}
            onClick={toogleConfigurationDialog}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog
        open={openConfig}
        onClose={toogleConfigurationDialog}
        fullScreen={fullScreen}
      >
        <DialogTitle>Configurações</DialogTitle>
        <DialogContent>
          <InputLabel id="select-camera">Selecione a camera padrão</InputLabel>
          <Select
            labelId="select-camera"
            native
            onChange={handleCameraSelect}
            value={selectedDeviceId}
          >
            <option value={"0"}>---</option>
            {videoDevicesList?.map((vd) => {
              cameraIndex++;
              return (
                <option key={vd.groupId} value={vd.deviceId}>
                  {vd.label === "" ? `Camera ${cameraIndex}` : vd.label}
                </option>
              );
            })}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={saveConfig}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
