import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const WinnerModal = (props) => {
    return(
        <TouchableWithoutFeedback 
            style={styles.container}
            onPress={()=>{props.init()}}
        >
            <Text style={styles.h1}>WINNER</Text>
            {/* <Text style={styles.h3}>Congratulations! You beat the game in {props.turnCount} turns!</Text> */}
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderWidth: 6,
        borderColor: 'black',
        zIndex: 2,
        paddingVertical: 40,
        padding: 40,
        borderStyle: 'dotted',
        width: '90%',
    },

    h1: {
        fontSize: 48,
        fontFamily: 'Futura',
        textAlign: 'center',
    },
    
    h3: {
        fontSize: 28,
        fontFamily: 'Futura',
        textAlign: 'center',
        // marginTop: 20,
    }
})

export default WinnerModal;