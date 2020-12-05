import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, Animated, Button, TouchableOpacity } from 'react-native';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import WinnerModal from '../components/WinnerModal';

const LightsOut = (props) => {
    const arr = [] ;
    for (let i = 0; i < 5; i++) {
        arr.push(0)
    };
    const initialBoard = [];
    for (let i = 0; i < 5; i++) {
        initialBoard.push([...arr])
    };

    //---------- STATE ----------//
    const [currentBoard, setCurrentBoard] = useState(initialBoard);
    const [winner, setWinner] = useState(false);
    const [turnCount, setTurnCount] = useState(0);
    const [isPress, setIsPress] = useState(false);
    const [isPress2, setIsPress2] = useState(false);
    
    function init() {
        setCurrentBoard([...initialBoard]);
        setTurnCount(0);
        setWinner(false);
    }

    function reducer(arr) {
        let t = [...arr];
        return t.reduce((a, b) => a + b)
     }

    function isWinner(board) {
        for (let i = 0; i < 5; i++) {
          if (reducer(board[i]) !== 5) {
            return false;
          };
        };
        return true;
    }

    function isValid(r, c) {
        if (0 <= r && r <= 4 && 0 <= c && c <= 4) {
            return true;
        } else {
            return false;
        }
    }

    function findAdjacent(r, c) {
        let adj = [[r, c], [r, c + 1], [r, c - 1], [r + 1, c], [r - 1, c]];
        let validAdj = [];
        adj.forEach((coordinate) => {
            if (isValid(coordinate[0], coordinate[1])) {
                validAdj.push(coordinate);
            };
        });
        return validAdj;
    }

    function flip(b, coord) {
        let r = coord[0];
        let c = coord[1];
        
        if (b[r][c] === 0) {
            b[r][c] = 1;
        } else {
            b[r][c] = 0;
        }
    }

    function handleClick(r, c) {
        let temp = currentBoard;
        let adj = findAdjacent(r, c);
        adj.forEach((co) => {
            flip(temp, co)
        });
        if (isWinner(temp)) {
            setWinner(true);
        };
        setCurrentBoard(temp)
        setTurnCount(turnCount + 1);
    }



    return winner ? 
        (
        <View style={styles.container}>
            <WinnerModal
                turnCount={turnCount}
                init={init}
                style={styles.modal}
            />
        </View>
        )
    :
        (
        <View style={styles.container}>
            <Text style={styles.title}>LIGHTS OUT</Text>
            <View style={styles.board}>
            {currentBoard.map((row, i) => {
                return(
                    row.map((value, j) => {
                        return (
                            <TouchableWithoutFeedback 
                                key = {[i, j]}
                                style={value ? styles.cellOn : styles.cellOff}
                                onPress={() => {
                                    handleClick(i, j)
                                }}
                            >
                            </TouchableWithoutFeedback>
                        );
                    })
                );
            })}
            </View>
            <View>
                <TouchableHighlight 
                    style={isPress ? styles.buttonPress : styles.button}
                    onHideUnderlay={() => setIsPress(false)}
                    onShowUnderlay={() => setIsPress(true)}
                    onPress={() => init()}
                    underlayColor='black'
                >
                    <Text style={isPress ? styles.buttonTextPress : styles.buttonText}>RESTART</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    style={isPress2 ? styles.buttonPress : styles.button} 
                    onPress={() => props.navigation.navigate('LandingPage')}
                    onHideUnderlay={() => setIsPress2(false)}
                    onShowUnderlay={() => setIsPress2(true)}
                >
                    <Text style={isPress2 ? styles.buttonTextPress : styles.buttonText}>HOME</Text>
                </TouchableHighlight>
            </View>
        </View>
        );

}

const styles = StyleSheet.create({
    h1: {
        fontSize: 60,
        fontFamily: 'Futura',
        margin: 0,
        lineHeight: 70,
        textAlign: 'center',
    },

    title: {
        fontSize: 32,
        fontFamily: 'Futura',
        fontWeight:'100',
        margin: 0,
        // lineHeight: 70,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'black',
        color: 'white',
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
        justifyContent: 'space-evenly',
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
    },

    logo: {
        marginTop: 10,
        marginBottom: 25,
    },

    button: {
        color: 'black',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 30,
        margin: 5,
    },
    
    buttonPress: {
        color: 'white',
        backgroundColor: '#000',
        borderColor: '#fff',
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 30,
        margin: 5,
    },


    buttonText: {
        fontFamily: 'Futura',
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
    },
    
    buttonTextPress: {
        fontFamily: 'Futura',
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },

    header: {
        top: 0,
        position: 'absolute',
        padding: 15,
        backgroundColor: 'black',
        width: '100%',
        alignItems: 'center',
    },
    
    headerText: {
        color: 'white',
    },

    cellOn: {
        width: 60,
        aspectRatio: 1,
        backgroundColor: '#000',
        margin: 3,
    },
    
    cellOff: {
        width: 60,
        aspectRatio: 1,
        backgroundColor: '#fafafa',
        margin: 3,
        borderTopColor: '#aaa',
        borderLeftColor: '#aaa',
        borderRightColor: '#ddd',
        borderBottomColor: '#ddd',
        borderWidth: 2,
    },

    board: {
        width: 330,
        aspectRatio: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    modal: {
        width: '80%',
        position: "absolute",
        zIndex: 2,
    },

})

const stylesNight = StyleSheet.create({
    h1: {
        fontSize: 60,
        fontFamily: 'Futura',
        margin: 0,
        lineHeight: 70,
        textAlign: 'center',
    },

    title: {
        fontSize: 32,
        fontFamily: 'Futura',
        fontWeight:'100',
        margin: 0,
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#999',
        color: '#252525',
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
        justifyContent: 'space-evenly',
        flex: 1,
        backgroundColor: '#151515',
        paddingVertical: 20,
    },

    logo: {
        marginTop: 10,
        marginBottom: 25,
    },

    button: {
        color: 'black',
        backgroundColor: '#666',
        borderColor: '#000',
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 30,
        margin: 5,
    },
    
    buttonPress: {
        color: 'white',
        backgroundColor: '#404040',
        paddingVertical: 4,
        paddingHorizontal: 30,
        margin: 5,
    },

    buttonText: {
        fontFamily: 'Futura',
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
        color: '#252525',
    },
    
    buttonTextPress: {
        fontFamily: 'Futura',
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },

    header: {
        top: 0,
        position: 'absolute',
        padding: 15,
        backgroundColor: 'black',
        width: '100%',
        alignItems: 'center',
    },
    
    headerText: {
        color: 'white',
    },

    cellOn: {
        width: 60,
        aspectRatio: 1,
        backgroundColor: '#000',
        margin: 3,
    },
    
    cellOff: {
        width: 60,
        aspectRatio: 1,
        backgroundColor: '#888',
        margin: 3,
    },

    board: {
        width: 330,
        aspectRatio: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    modal: {
        width: '80%',
        position: "absolute",
        zIndex: 2,
    },

})


export default LightsOut;

