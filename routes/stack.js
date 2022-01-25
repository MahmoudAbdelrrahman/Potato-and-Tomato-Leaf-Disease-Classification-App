import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import HomeScreen from '../screens/home'
import PhotoScreen from '../screens/photo'
import ResultScreen from '../screens/result'

const screens = {

    Home: {
        screen: HomeScreen
    },
    Photo: {
        screen: PhotoScreen
    },
    Result : {
        screen: ResultScreen
    }

}

const Stack = createStackNavigator(screens);

export default createAppContainer(Stack);