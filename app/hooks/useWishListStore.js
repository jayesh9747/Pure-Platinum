// import { create } from 'zustand';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { persist } from 'zustand/middleware';

// const storage = {
//   getItem: async (key) => {
//     const value = await AsyncStorage.getItem(key);
//     return value ? JSON.parse(value) : null;
//   },
//   setItem: (key, value) => {
//     return AsyncStorage.setItem(key, JSON.stringify(value));
//   },
//   removeItem: (key) => {
//     return AsyncStorage.removeItem(key);
//   },
// };

// const useWishListStore = create(
//   persist(
//     (set) => ({
//       products: [],
//       addProduct: (product) => set((state) => ({
//         products: [...state.products, product]
//       })),
//       removeProduct: (productId) => set((state) => ({
//         products: state.products.filter(p => p.id !== productId)
//       })),
//       clearWishList: () => set({ products: [] })
//     }),
//     {
//       name: 'cart-storage',
//       storage,
//     }
//   )
// );

// export default useWishListStore;


// import { create } from 'zustand';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { persist } from 'zustand/middleware';

// const storage = {
//   getItem: async (key) => {
//     const value = await AsyncStorage.getItem(key);
//     return value ? JSON.parse(value) : null;
//   },
//   setItem: (key, value) => {
//     return AsyncStorage.setItem(key, JSON.stringify(value));
//   },
//   removeItem: (key) => {
//     return AsyncStorage.removeItem(key);
//   },
// };

// const useWishListStore = create(
//   persist(
//     (set) => ({
//       products: [],
//       addProduct: (product) => set((state) => ({
//         products: [...state.products, product]
//       })),
//       removeProduct: (productId) => set((state) => ({
//         products: state.products.filter(p => p.id !== productId)
//       })),
//       clearWishList: () => set({ products: [] }),
//       setProducts: (products) => set({ products })
//     }),
//     {
//       name: 'wishlist-storage',
//       storage,
//     }
//   )
// );

// export default useWishListStore;




import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from 'zustand/middleware';

const storage = {
  getItem: async (key) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: (key, value) => {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key) => {
    return AsyncStorage.removeItem(key);
  },
};

const useWishListStore = create(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) => set((state) => ({
        products: [...state.products, product]
      })),
      removeProduct: (productId) => set((state) => ({
        products: state.products.filter(p => p.id !== productId)
      })),
      clearWishList: () => set({ products: [] }),
      setProducts: (products) => set({ products })
    }),
    {
      name: 'wishlist-storage',
      storage,
    }
  )
);

export default useWishListStore;
