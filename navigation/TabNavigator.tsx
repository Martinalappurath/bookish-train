import { Ionicons } from '@expo/vector-icons'; // Import the icon set
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyCabScreen from '../Screens/MyCabScreen';
import HomeStackNavigator from './HomeStackNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: true, // Show labels
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#fff', // Set background color
          borderTopWidth: 0, // Remove the border
          elevation: 0, // Remove shadow
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: 'home' | 'car'; // Restrict to the valid icon names
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'My Cab') {
            iconName = 'car';
          } else {
            iconName = 'home'; // Default value (shouldn't reach here)
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <View style={styles.labelContainer}>
              <Ionicons color={color} size={16} />
              <Text style={[styles.label, { color }]}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="My Cab"
        component={MyCabScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <View style={styles.labelContainer}>
              <Ionicons color={color} size={16} />
              <Text style={[styles.label, { color }]}>My Cab</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export default TabNavigator;
