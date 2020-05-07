export interface Constraints {
  width: number;
  height: number;
  deviceId: string;
  facingMode: string;
}

export interface Area {
  top: string;
  right: string;
  left: string;
  bottom: string;
}

export interface InputStream {
  name: string;
  type: string;
  constraints: Constraints;
  area: Area;
}

export interface Decoder {
  readers: string[];
}

export interface Locator {
  halfSample: boolean;
  patchSize: string;
}

export interface CameraConfig {
  frequency: number;
  numOfWorkers: number;
  locate: boolean;
  inputStream: InputStream;
  decoder: Decoder;
  locator: Locator;
}
