import React, { PropTypes } from 'react';
import { TouchableOpacity, Image } from 'react-native';

const propTypes = {
    navigation: PropTypes.object.isRequired
};
const DrawerButton = (navigation) => {
    return (
        < TouchableOpacity onPress={() => navigation.navigation.navigate('DrawerOpen')}>
            <Image source={require('../img/Menu.png')} style={{ width: 24, height: 24, marginLeft: 7 }} />
        </TouchableOpacity >
    );
};

DrawerButton.propTypes = propTypes;
export default DrawerButton;
