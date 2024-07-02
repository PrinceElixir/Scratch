import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Home';
import SvgComponent from './components/Svg';
import { Button } from 'react-native';
import ActionScreen from './components/ActionScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Stack = createNativeStackNavigator();


function LogoTitle() {
  return (
    <SvgComponent width={100} height={100} viewBox='0 0 317.9 150'
      
    />
  );
}
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

// App component
const App = () => {
  return (
    <GestureHandlerRootView>
    <NavigationContainer theme={DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#E6E6FA',
          },
        }}
        initialRouteName='Home'
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            headerTitle: () => <LogoTitle />,
            headerStyle: {
              backgroundColor: '#5B67FA',
            },
            headerRight: () => (
              <Button
                onPress={() => alert('This functionality is not defined yet')}
                title="Sign In"
                color="#5B67FA"
              />
            ),
           }}
        />
        <Stack.Screen name="Action" component={ActionScreen}
        options={{ 
          headerTitle: () => <LogoTitle />,
          headerStyle: {
            backgroundColor: '#5B67FA',
          },
          headerRight: () => (
            <Button
              onPress={() => alert('This functionality is not defined yet')}
              title="Sign In"
              color="#5B67FA"
            />
          ),
         }} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
