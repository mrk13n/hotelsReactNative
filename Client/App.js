import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from "./screens/Home";
import Authorization from "./screens/Authorization";
import Registration from "./screens/Registration";
import Hotels from "./screens/Hotels";
import Rooms from "./screens/Rooms";
import Room from "./screens/Room";

const MainNavigator = createStackNavigator({
    Home: { screen: Home },
    Authorization: { screen: Authorization },
    Registration: { screen: Registration },
    Hotels: { screen: Hotels },
    Rooms: { screen: Rooms },
    Room: { screen: Room }
});

const App = createAppContainer(MainNavigator);

export default App;