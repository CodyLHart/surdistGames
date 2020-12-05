import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, Animated, Button, TouchableOpacity } from 'react-native';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import WinnerModal from '../components/WinnerModal';

const MarbleSolitaire = (props) => {

    

    const cornerRow = [null, null, 1, 1, 1, null, null];
    const fullRow = [1, 1, 1, 1, 1, 1, 1];
    const centerRow = [1, 1, 1, -1, 1, 1, 1];
    // const cornerRow = [null, null, 1, -1, -1, null, null];
    // const fullRow = [-1, -1, 1, -1, -1, -1, -1];
    // const centerRow = [-1, -1, -1, 1, -1, -1, -1];
    const initialBoard = [[...cornerRow], [...cornerRow], [...fullRow], [...centerRow], [...fullRow], [...cornerRow], [...cornerRow]]

    //---------- STATE ----------//
    const [currentBoard, setCurrentBoard] = useState(initialBoard);
    const [winner, setWinner] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [turnCount, setTurnCount] = useState(0);
    const [selected, setSelected] = useState([]);
    const [available, setAvailable] = useState([]);
    const [numMovable, setNumMovable] = useState(4);
    const [remaining, setRemaining] = useState([]);
    const [numRemaining, setNumRemaining] = useState(32);
    const [isPress, setIsPress] = useState(false);
    const [isPress2, setIsPress2] = useState(false);

    useEffect(() => {
        if (numMovable === 0) {
            setGameOver(true);
        };
    }, [numMovable]);

    useEffect(() => {
        if (numRemaining === 1) {
            setWinner(true);
        } else if (gameOver) {
            alert('YOU FUCKING LOSER');
        };
    }, [gameOver])

    useEffect(() => {
        if (winner) {
            alert('YOU FUCKING WIN')
        };
    }, [winner])


    //---------- FUNCTIONS ----------//
    function init() {
        setCurrentBoard(initialBoard);
        setWinner(false);
        setGameOver(false);
        setClickCount(0);
        setTurnCount(0);
        setSelected([]);
        setAvailable([]);
        setNumMovable(4);
        setRemaining([]);
        setNumRemaining(32);
    }


    //---------- SETTING STATE ----------//
    function findRemaining() {
        let rem = [];
        for (let r = 0; r < currentBoard.length; r++) {
            for (let c = 0; c < currentBoard[r].length; c++) {
                if (currentBoard[r][c] === 1) {
                    rem.push([r, c])
                };
            };
        };
        return rem;
    }

    function countMovable() {
        let movable = numMovable;
        if (remaining.length) {
            movable = 0;
            remaining.forEach((coord) => {
                if (isMovable(coord[0], coord[1])) {
                    movable++;
                };
            });
        }
        return movable;
    }

    function findAdjacent(r, c) {
        let validAdjacent = [];
        let possibleAdjacent = [[r - 1, c], [r, c + 1], [r + 1, c], [r, c - 1]];
        possibleAdjacent.forEach((coord) => {
            if (isOnBoard(coord[0], coord[1])) {
                let val = currentBoard[coord[0]][coord[1]];
                if (val === 1) {
                    validAdjacent.push(coord)
                };
            };
        });
        return validAdjacent;
    }

    function findOpen(selected, potential) {
        const difference = [(potential[0] - selected[0]), (potential[1] - selected[1])];
        const opposite = [(selected[0] + (2 * difference[0])), (selected[1] + (2 * difference[1]))];
        if (isOnBoard(opposite[0], opposite[1]) && isEmpty(opposite[0], opposite[1])) {
            return opposite;
        } else {
            return;
        }
    }    

    //----- CELL VALIDATION -----//

    function isOnBoard(r, c) {
        return currentBoard[r] && currentBoard[r][c] ? true : false;
    }
    
    function hasMarble(r, c) {
        return (isOnBoard(r, c) && currentBoard[r][c] === 1) ? true : false;
    }
    
    function isEmpty(r, c) {
        return (isOnBoard(r, c) && currentBoard[r][c] === -1) ? true : false;
    }

    function isValidMove(r, c) {
        for (let i = 0; i < available.length; i++) {
            if (available[i][0] === r && available[i][1] === c) {
                return true;
            };
        };
        return false;
    }

    function isMovable(r, c) {
        if (currentBoard[r][c] === -1) return;
        if (( currentBoard[r + 1] && currentBoard[r + 1][c] === 1 && currentBoard[r + 2] && currentBoard[r + 2][c] === -1) || ( currentBoard[r - 1] && currentBoard[r - 1][c] === 1 && currentBoard[r - 2] && currentBoard[r - 2][c] === -1) || (currentBoard[r][c + 1] === 1 && currentBoard[r][c + 2] === -1) || (currentBoard[r][c - 1] === 1 && currentBoard[r][c - 2] === -1)) {
            return true;
        } else {
            return false;
        }
    }




    
    //----- EVENT HANDLERS -----//
    function toggleCell(r, c) {
        let board = [...currentBoard];
        board[r][c] *= -1;
        setCurrentBoard(board);
    }
    
    function handleMove(initial, final) {
        toggleCell(initial[0], initial[1]);
        toggleCell(final[0], final[1]);
        const victimR = (initial[0] + final[0]) / 2;
        const victimC = (initial[1] + final[1]) / 2;
        toggleCell(victimR, victimC);
        setNumRemaining(numRemaining - 1);
        setRemaining(findRemaining());
        setNumMovable(countMovable());
    }

    function handleClick(r, c){
        // if (isMovable(r, c)) {
        //     console.log('MOVABLE')
        // }
        if (selected && available && isValidMove(r, c)) {
            let initial = selected;
            let final = [r, c];
            handleMove(initial, final);
            setSelected([]);
            setAvailable([]);
            setTurnCount(turnCount + 1);
        } else if (r === selected[0] && c === selected[1]){
            setSelected([]);
            setAvailable([]);
        } else if (hasMarble(r, c)) {
            setSelected([r, c]);
            const adjacent = findAdjacent(r, c);
            let open = [];
            adjacent.forEach((coord) => {
                if (open) {
                    open.push(findOpen([r, c], coord));
                };
            });
            open = open.filter((el) => {return el !== undefined})
            setAvailable(open);
        };
        setClickCount(clickCount + 1);

        
    }

    //---------- WIN LOGIC ----------//

    // function checkForWinner() {
    //     if 
    // }


    //---------- COMPONENT ----------//
        return winner ? 
        (
        <View style={styles.container}>
            <WinnerModal
                clickCount={clickCount}
                init={init}
                style={styles.modal}
            />
        </View>
        )
    :
        (
        <View style={styles.container}>
            <Text style={styles.title}>MARBLE SOLITAIRE</Text>
            <View style={styles.board}>
            {currentBoard.map((row, i) => {
                return(
                    row.map((value, j) => {
                        // console.log(selected);
                        return (
                            <TouchableWithoutFeedback 
                                key = {[i, j]}
                                style={initialBoard[i][j] ? styles.cell : styles.null}
                                onPress={() => {
                                    handleClick(i, j);
                                }}
                            >
                                {i === selected[0] && j === selected[1] ? 
                                    <View style={styles.marbleSelected}></View>
                                    :
                                    <View style={currentBoard[i][j] === 1 ? styles.marble : null}></View>
                                }
                                {available[0] === i && available[1] === j ? <Text>X</Text> : null}
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


//---------- STYLESHEET ----------//
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

    modal: {
        width: '80%',
        position: "absolute",
        zIndex: 2,
    },

    cell: {
        backgroundColor: 'tomato',
        width: 45,
        aspectRatio: 1,
        margin: 1,
        backgroundColor: '#fafafa',
        borderTopColor: '#aaa',
        borderLeftColor: '#aaa',
        borderRightColor: '#ddd',
        borderBottomColor: '#ddd',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    null: {
        width: 45,
        aspectRatio: 1,
        margin: 1,
    },
    
    board: {
        width: 343,
        aspectRatio: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    marble: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#888',
    },
    
    marbleSelected: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#000',
    },

    empty: {
        backgroundColor: 'tomato',
    }
})


export default MarbleSolitaire;