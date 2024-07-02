import AsyncStorage from '@react-native-async-storage/async-storage';

const getAllAsyncStorageData = async () => {
  try {
    // Get all keys from AsyncStorage
    const keys = await AsyncStorage.getAllKeys();
    if (keys.length === 0) {
      console.log('No data found in AsyncStorage.');
      return;
    }

    // Get all values for the keys
    const result = await AsyncStorage.multiGet(keys);
    
    // Create an object to store the key-value pairs
    const asyncStorageData = {};
    result.forEach(([key, value]) => {
      asyncStorageData[key] = value;
    });

    console.log('All AsyncStorage data:', asyncStorageData);
    return asyncStorageData;
  } catch (error) {
    console.error('Error getting AsyncStorage data:', error);
  }
};


export default {
    getAllAsyncStorageData
}