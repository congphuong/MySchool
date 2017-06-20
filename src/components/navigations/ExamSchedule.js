import { StackNavigator } from 'react-navigation';
import ExamScheduleScreen from '../screens/ExamSchedule';

const ExamSchedule = StackNavigator({
    ExamSchedule: {
        screen: ExamScheduleScreen,
        navigationOptions: {
            drawerLabel: 'ExamSchedule'
        }
    },
});
export default ExamSchedule;
