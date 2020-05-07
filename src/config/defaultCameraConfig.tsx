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

export default defaultConfig;
