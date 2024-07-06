// import React, { useEffect, useState } from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { View, Text, ActivityIndicator } from 'react-native';
// import categoriesApi from '../apis/category';

// const Drawer = createDrawerNavigator();

// const CategoryScreen = ({ route }) => {
//   const { category } = route.params;
//   console.log("this is the category routes ",route);

//   return (
//     <View>
//       <Text>{category.name}</Text>
//     </View>
//   );
// };

// // Recursive function to create nested drawers
// const createNestedDrawer = (categories) => {
//   return categories?.map(category => {
//     if (category.sub_categories && category.sub_categories.length > 0) {
//       return (
//         <Drawer.Screen key={category.id} name={category.name}>
//           {() => (
//             <Drawer.Navigator>
//               {createNestedDrawer(category.sub_categories)}
//             </Drawer.Navigator>
//           )}
//         </Drawer.Screen>
//       );
//     } else {
//       return (
//         <Drawer.Screen key={category.id} name={category.name}>
//           {props => <CategoryScreen {...props} category={category} />}
//         </Drawer.Screen>
//       );
//     }
//   });
// };

// console.log("this is nested ",createNestedDrawer);

// const CategoryNavigator = () => {
//   const [categories, setCategories] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const handleCategory = async () => {
//     try {
//       const result = await categoriesApi.getCategories();
//       setCategories(result.data.data.sub_categories);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleCategory();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <Drawer.Navigator>
//       {createNestedDrawer(categories)}
//     </Drawer.Navigator>
//   );
// };

// export default CategoryNavigator;


import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, ActivityIndicator } from 'react-native';
import categoriesApi from '../apis/category';
import TestScreen from '../screens/TestScreen';

const Drawer = createDrawerNavigator();

const CategoryScreen = ({ route }) => {
    console.log(route);
    const { category } = route.params || route.name || "";

    return (
        <View>
            <Text>{category?.name}</Text>
        </View>
    );
};

// Recursive function to create nested drawers
const createNestedDrawer = (categories) => {
    console.log('Creating nested drawer for categories:', categories);
    return categories?.map(category => {
        if (category.sub_categories && category.sub_categories.length > 0) {
            return (
                <Drawer.Screen key={category.id} name={category.name}>
                    {() => (
                        <NestedDrawer categories={category.sub_categories} />
                    )}
                </Drawer.Screen>
            );
        } else {
            return (
                <Drawer.Screen key={category.id} name={category.name}>
                    {props => <CategoryScreen {...props} category={category} />}
                </Drawer.Screen>
            );
        }
    });
};

const NestedDrawer = ({ categories }) => {
    console.log('Rendering NestedDrawer with categories:', categories);
    return (
        <Drawer.Navigator >
            {createNestedDrawer(categories)}
        </Drawer.Navigator>
    );
};

const CategoryNavigator = () => {
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleCategory = async () => {
        try {
            const result = await categoriesApi.getCategories();
            console.log('Fetched categories:', result.data.data);
            setCategories(result.data.data);
            console.log("this is category data", categories);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleCategory();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    console.log('Rendering CategoryNavigator with categories:', categories);

    return (
        <Drawer.Navigator >
            {createNestedDrawer(categories)}
        </Drawer.Navigator>
    );
};

export default CategoryNavigator;


// screenOptions={{ headerShown: false }}