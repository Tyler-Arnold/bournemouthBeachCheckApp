import React from 'react';

import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {BeachMapScreen} from './screens/BeachMapScreen';
import {HomeScreen} from './screens/HomeScreen';
import {RootParamsType} from './types/RootParamsType';
import {Ionicons} from '@expo/vector-icons';
import {BeachContainer} from './state/BeachContainer';

/**
 * Entry point for the program
 * @return {React.FC}
 */
const App: React.FC = () => {
  const Drawer = createDrawerNavigator<RootParamsType>();
  const scheme = useColorScheme();

  interface IconProps {
    color: string;
    size: number;
    focused: boolean;
  }

  /**
   * Map Icon
   * @param {IconProps} props
   * @return {React.FC<IconProps>}
   */
  const mapIcon: React.FC<IconProps> = (props: IconProps) => {
    return <Ionicons name={'md-map'} color={props.color} size={props.size} />;
  };

  /**
   * Home Icon
   * @param {IconProps} props
   * @return {React.FC<IconProps>}
   */
  const homeIcon: React.FC<IconProps> = (props: IconProps) => (
    <Ionicons name={'md-home'} color={props.color} size={props.size} />
  );

  return (
    <BeachContainer.Provider>
      <AppearanceProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{
                drawerIcon: homeIcon,
              }}
            />
            <Drawer.Screen
              name="BeachMap"
              component={BeachMapScreen}
              options={{
                drawerIcon: mapIcon,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </AppearanceProvider>
    </BeachContainer.Provider>
  );
};

export default App;
