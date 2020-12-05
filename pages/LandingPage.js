import React, { useRef } from 'react';
import { StyleSheet, View, Text, Image, Animated, Button, TouchableOpacity } from 'react-native';

const LandingPage = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim2 = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim2, {
            toValue: 1,
            delay: 6000,
            duration: 2000,
            useNativeDriver: true
        }).start()
    }
    
    const introSequence = () => {
        Animated.timing()
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 3500,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 2500,
                useNativeDriver: true,
            })
        ]).start()
    }
    
    return (
        <View style={styles.container}>
            {/* <Animated.View
                style = {[styles.logoContainer, {opacity: fadeAnim}]}
            >
                <Text style={styles.h1}>SURDIST</Text>
                <Image 
                    style={styles.logo}
                    source={require('../assets/images/logo.png')}
                    width={250}
                    height={100}
                    resizeMode='contain'
                />
                <Text style={styles.h1}>DESIGNS</Text>
            </Animated.View> */}
            <Animated.View
                style = {styles.container}
                // style = {[styles.container, {opacity: fadeAnim2}]}
            >
                <TouchableOpacity onPress={() => props.navigation.navigate('LightsOut')}>
                    <Text style={styles.button}>LIGHTS OUT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('MarbleSolitaire')}>
                    <Text style={styles.button}>MARBLE SOLITAIRE</Text>
                </TouchableOpacity>
            </Animated.View>
            {introSequence()}
            {fadeIn()}
        </View>
    )
}

const styles = StyleSheet.create({
    
    landingText: {
        fontFamily: 'Avenir',
        fontSize: 20
    },

    h1: {
        fontSize: 60,
        fontFamily: 'Avenir',
        margin: 0,
        lineHeight: 70,
        textAlign: 'center'
    },

    h2: {
        fontSize: 24,
        margin: -10,
    },

    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
    },

    logo: {
        marginTop: 10,
        marginBottom: 25,
    },

    button: {
        color: 'white',
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 2,
        padding: 8,
        fontSize: 28,
        // width: '70%'
        margin: 10,
    },

    buttonPress: {
        color: 'black',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        padding: 8,
        fontSize: 28,
        // width: '70%'
        margin: 10,
    }



})

export default LandingPage;

