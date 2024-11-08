export function useLocalPersistence(key, storageType = 'local') {
  const storage = storageType === 'session' ? sessionStorage : localStorage;

  const getItem = () => {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  const setItem = (value) => {
    storage.setItem(key, JSON.stringify(value));
  };

  const removeItem = () => {
    storage.removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
}