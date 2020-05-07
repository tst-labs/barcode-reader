export const testConfig = {
  frequency: 5,
  numOfWorkers: 2,
  locate: true,
  inputStream: {
    name: "Live",
    type: "LiveStream",
    constraints: {
      width: 800,
      height: 600,
      deviceId: "0",
      facingMode: "environment",
    },
    area: { top: "0%", right: "0%", left: "0%", bottom: "0%" },
  },
  decoder: { readers: ["code_39_reader"] },
  locator: { halfSample: true, patchSize: "medium" },
};
