import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './screens/Home';
import Authorization from './screens/Authorization';
import Registration from './screens/Registration';
import Hotels from './screens/Hotels';
import Rooms from './screens/Rooms';
import Room from './screens/Room';

const AuthNavigator = createStackNavigator(
    {
        Home: { screen: Home },
        Authorization: { screen: Authorization },
        Registration: { screen: Registration }
    },
    {
        initialRouteName: 'Home',
        initialRouteParams: 'user',
        headerMode: 'none',
    }
);

const MainNavigator = createStackNavigator(
    {
        Hotels: { screen: Hotels },
        Rooms: { screen: Rooms },
        Room: { screen: Room }
    },
    {
        initialRouteName: 'Hotels',
        headerMode: 'none',
    }
);

const AppNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        Main: MainNavigator
    },
    {
        initialRouteName: 'Auth'
    }
);

const App = createAppContainer(AppNavigator);

export default App;