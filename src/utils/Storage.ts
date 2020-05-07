function storageWrapper(cb: Function) {
  if (typeof window.localStorage !== "undefined") {
    return cb(window.localStorage);
  } else {
    console.log("localStorage not available");
  }
}

export function persist(key: string, object: object) {
  storageWrapper((storage: Storage) => {
    storage.setItem(key, JSON.stringify(object));
  });
}

export function push(key: string, object: object) {
  storageWrapper((storage: Storage) => {
    const item: string = storage.getItem(key) || "[]",
      parsed = JSON.parse(item);
    if (Array.isArray(parsed)) {
      parsed.push(object);
      storage.setItem(key, JSON.stringify(parsed));
    }
  });
}

export function load(key: string) {
  return storageWrapper((storage: Storage) => {
    const item = storage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  });
}
