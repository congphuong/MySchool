import { StackNavigator } from 'react-navigation';
import ScoreScreen from '../screens/Score';

const Score = StackNavigator({
    Score: {
        screen: ScoreScreen,
        navigationOptions: {
            drawerLabel: 'Score'
        }
    },
});
export default Score;
