import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, PanResponder, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Catsvg from './CatSvg';
import Football from './Ballsvg';
import InfoCard from './Infocard';
import { MaterialIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');
const playgroundHeight = height * 0.55;
const playgroundWidth = width * 0.95;
const cardWidth = playgroundWidth / 3 - 10;
const cardHeight = playgroundHeight / 3 - 20;

const Playground = ({ navigation }) => {
  const [catActions, setCatActions] = useState([]);
  const [footballActions, setFootballActions] = useState([]);
  const [activeComponent, setActiveComponent] = useState(null);
  const [cards, setCards] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [catPosition, setCatPosition] = useState({ x: playgroundWidth / 2, y: playgroundHeight / 2 });

  const [footballPosition, setFootballPosition] = useState({ x: playgroundWidth / 2, y: playgroundHeight / 2 });
  const catRotation = useRef(new Animated.Value(0)).current;
  const footballRotation = useRef(new Animated.Value(0)).current;
  const initialCatPosition = useRef({ x: playgroundWidth / 2, y: playgroundHeight / 2 });
  const initialFootballPosition = useRef({ x: playgroundWidth / 2, y: playgroundHeight / 2 });

  useEffect(() => {
    loadActions();
  }, []);

  const loadActions = async () => {
    try {
      const savedCatActions = await AsyncStorage.getItem('CatActions');
      const savedFootballActions = await AsyncStorage.getItem('FootballActions');
      if (savedCatActions) {
        setCatActions(JSON.parse(savedCatActions));
      }
      if (savedFootballActions) {
        setFootballActions(JSON.parse(savedFootballActions));
      }
    } catch (error) {
      console.error('Error loading actions from AsyncStorage:', error);
    }
  };

  const executeActions = async (actions, position, rotation) => {
    for (const action of actions) {
      switch (action) {
        case "Move X by 50":
          Animated.timing(position, {
            toValue: { x: position.x._value + 50, y: position.y._value },
            duration: 500,
            useNativeDriver: false,
          }).start();
          break;
        case "Move Y by 50":
          Animated.timing(position, {
            toValue: { x: position.x._value, y: position.y._value + 50 },
            duration: 500,
            useNativeDriver: false,
          }).start();
          break;
        case "Rotate 360":
          Animated.timing(rotation, {
            toValue: rotation._value + 360,
            duration: 1000,
            useNativeDriver: false,
          }).start();
          break;
        case "go to (0,0)":
          Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 500,
            useNativeDriver: false,
          }).start();
          break;
        case "Move X=50,Y=50":
          Animated.timing(position, {
            toValue: { x: 50, y: 50 },
            duration: 500,
            useNativeDriver: false,
          }).start();
          break;
        case "go to random position":
          Animated.timing(position, {
            toValue: { x: Math.random() * playgroundWidth, y: Math.random() * playgroundHeight },
            duration: 500,
            useNativeDriver: false,
          }).start();
          break;
        case "Say Hello":
          Animated.sequence([
            Animated.timing(rotation, {
              toValue: -45,
              duration: 500,
              useNativeDriver: false,
            }),
            Animated.timing(rotation, {
              toValue: 45,
              duration: 500,
              useNativeDriver: false,
            }),
            Animated.timing(rotation, {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }),
          ]).start();
          break;
        case "Say Hello For 1 sec":
          Animated.sequence([
            Animated.timing(rotation, {
              toValue: -45,
              duration: 500,
              useNativeDriver: false,
            }),
            Animated.timing(rotation, {
              toValue: 45,
              duration: 500,
              useNativeDriver: false,
            }),
            Animated.timing(rotation, {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }),
          ]).start();
          await new Promise(resolve => setTimeout(resolve, 1000));
          break;
        default:
          break;
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const playActions = () => {
    if (cards.some(card => card.type === 'cat')) {
      executeActions(catActions, catPosition, catRotation);
    }
    if (cards.some(card => card.type === 'football')) {
      executeActions(footballActions, footballPosition, footballRotation);
    }
  };

  const addCard = () => {
    if (cards.length === 0) {
      setCards([...cards, { id: 'cat', type: 'cat', description: 'Spirit: Cat', SvgComponent: Catsvg }]);
    } else if (cards.length === 1) {
      setCards([...cards, { id: 'football', type: 'football', description: 'Spirit: Football', SvgComponent: Football }]);
    }
  };

  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const resetPositions = () => {
    catPosition.setValue({ x: playgroundWidth / 2, y: playgroundHeight / 2 });
    footballPosition.setValue({ x: playgroundWidth / 2, y: playgroundHeight / 2 });
  };

 const catPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newX = catPosition.x + gestureState.dx;
        const newY = catPosition.y + gestureState.dy;
        setCatPosition({ x: newX, y: newY });
        setActiveComponent('cat');
      },
      onPanResponderRelease: (e, gestureState) => {
        const newX = catPosition.x + gestureState.dx;
        const newY = catPosition.y + gestureState.dy;
        if (newX >= 0 && newX <= playgroundWidth - 50 && newY >= 0 && newY <= playgroundHeight - 50) {
          setCatPosition({ x: newX, y: newY });
        } else {
          setCatPosition({ x: catPosition.x, y: catPosition.y });
        }
      },
    })
  ).current;

  const footballPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newX = footballPosition.x + gestureState.dx;
        const newY = footballPosition.y + gestureState.dy;
        setFootballPosition({ x: newX, y: newY });
        setActiveComponent('football');
      },
      onPanResponderRelease: (e, gestureState) => {
        const newX = footballPosition.x + gestureState.dx;
        const newY = footballPosition.y + gestureState.dy;
        if (newX >= 0 && newX <= playgroundWidth - 50 && newY >= 0 && newY <= playgroundHeight - 50) {
          setFootballPosition({ x: newX, y: newY });
        } else {
          setFootballPosition({ x: footballPosition.x, y: footballPosition.y });
        }
      },
    })
  ).current;




  

  

  return (
    <>
      <View style={styles.playground}>
        <Animated.View
          {...catPanResponder.panHandlers}
          style={{
            position: 'absolute',
            left: catPosition.x,
            top: catPosition.y,
            transform: [{ rotate: catRotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }],
          }}
          onTouchStart={() => setActiveComponent('cat')}
        >
          {cards.some(card => card.type === 'cat') && <Catsvg width={50} height={50} />}
        </Animated.View>
        <Animated.View
          {...footballPanResponder.panHandlers}
          style={{
            position: 'absolute',
            left: footballPosition.x,
            top: footballPosition.y,
            transform: [{ rotate: footballRotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }],
          }}
          onTouchStart={() => setActiveComponent('football')}
        >
          {cards.some(card => card.type === 'football') && <Football width={50} height={50} />}
        </Animated.View>
        <TouchableOpacity style={[styles.iconContainer, { top: 10, right: 10 }]} onPress={()=>{

          setCatPosition({x:playgroundWidth/2, y: playgroundHeight/2})
          setFootballPosition({x:playgroundWidth/2, y: playgroundHeight/2})
        }}>
          <MaterialIcons name="refresh" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconContainer, { bottom: 10, right: 10 }]} onPress={playActions}>
          <MaterialIcons name="play-arrow" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Spirit: {activeComponent === 'cat' ? 'Cat' : activeComponent === 'football' ? 'Football' : '-'}</Text>
        <Text style={styles.infoText}>Coordinates: {activeComponent === 'cat' ? `${catPosition.x.toFixed(2)}, ${catPosition.y.toFixed(2)}` : activeComponent === 'football' ? `${footballPosition.x.toFixed(2)}, ${footballPosition.y.toFixed(2)}` : '-'}</Text>
      </View>


      <View style={styles.playground2}>
        <View style={styles.cardContainer}>
          {cards.map(card => (
            <TouchableOpacity key={card.id} onPress={() => setActiveComponent(card.type)}>
              <InfoCard
                key={card.id}
                description={card.description}
                SvgComponent={card.SvgComponent}
                onDelete={() => deleteCard(card.id)}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                onSelect={() => setActiveComponent(card.type)}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addCard}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  playground: {
    height: playgroundHeight,
    width: playgroundWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    position: 'relative',
    alignSelf: 'center',
    marginVertical: 10,
  },
  playground2: {
    height: playgroundHeight / 3,
    width: playgroundWidth,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    position: 'relative',
    alignSelf: 'center',
    marginVertical: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoContainer: {
    width: playgroundWidth,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  iconContainer: {
    position: 'absolute',
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default Playground;
