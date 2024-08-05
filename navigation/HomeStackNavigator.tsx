
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CabDetailScreen from '../Screens/CabDetailScreen';
import CabsListScreen from '../Screens/CabsListScreen';

const Stack = createStackNavigator();

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cabs List" component={CabsListScreen} />
      <Stack.Screen name="Cab Detail" component={CabDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
