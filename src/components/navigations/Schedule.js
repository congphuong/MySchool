import { StackNavigator } from 'react-navigation';
import ScheduleScreen from '../screens/Schedule';

const Schedule = StackNavigator({
    Schedule: {
        screen: ScheduleScreen,
        navigationOptions: {
            drawerLabel: 'Schedule'
        }
    },
});
export default Schedule;
