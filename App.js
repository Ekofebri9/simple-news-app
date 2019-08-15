import { createAppContainer,createStackNavigator } from "react-navigation";
import Home from './src/home';
import Detail from './src/detail';
const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Detail: {
    screen: Detail,
  }
},
{
  defaultNavigationOptions: {
    header: null,
  }
});

const appContainer = createAppContainer(AppNavigator);
export default appContainer;