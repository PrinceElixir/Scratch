import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import  AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import DraggableFlatList from 'react-native-draggable-flatlist';

const { width } = Dimensions.get('window');

const initialCodeList = [
  "Move X by 50", "Move Y by 50", "Rotate 360", "go to (0,0)",
  "Move X=50,Y=50", "go to random position", "Say Hello",
  "Say Hello For 1 sec", "Increase Size", "Dec Size"
];

const initialActions = {
  Action1: [],
  Action2: [],
};

const ActionScreen = () => {
  const [codeList, setCodeList] = useState(initialCodeList);
  const [actions, setActions] = useState(initialActions);
  const [activeAction, setActiveAction] = useState('Action1');

  useEffect(() => {

    loadActions();
  }, []);

  useEffect(() => {
  
    saveActions();
  }, [actions]);

  const saveActions = async () => {
    try {
      await AsyncStorage.setItem('CatActions', JSON.stringify(actions.Action1));
      await AsyncStorage.setItem('FootballActions', JSON.stringify(actions.Action2));
    } catch (error) {
      console.error('Error saving actions to AsyncStorage:', error);
    }
  };
  
  const loadActions = async () => {
    try {
      const savedCatActions = await AsyncStorage.getItem('CatActions');
      const savedFootballActions = await AsyncStorage.getItem('FootballActions');
      if (savedCatActions) {
        setActions(prevActions => ({ ...prevActions, Action1: JSON.parse(savedCatActions) }));
      }
      if (savedFootballActions) {
        setActions(prevActions => ({ ...prevActions, Action2: JSON.parse(savedFootballActions) }));
      }
    } catch (error) {
      console.error('Error loading actions from AsyncStorage:', error);
    }
  };
  

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.codeButton}
      onPress={() => handleCodeTileClick(item)}
    >
      <Text style={styles.codeButtonText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderActionItem = ({ item, index, drag }) => (
    <View style={styles.actionItem} onLongPress={drag}>
      <Text style={styles.actionItemText}>{item}</Text>
      <TouchableOpacity onPress={() => deleteActionItem(item)}>
        <Icon name="trash" size={20} color="#ff0000" />
      </TouchableOpacity>
    </View>
  );

  const deleteActionItem = (itemToDelete) => {
    const updatedActions = { ...actions };
    updatedActions[activeAction] = updatedActions[activeAction].filter(item => item !== itemToDelete);
    setActions(updatedActions);
  };

  const handleDrop = (item) => {
    const newActions = { ...actions };
    newActions[activeAction] = [...newActions[activeAction], item];
    setActions(newActions);
  };

  const handleCodeTileClick = (item) => {
    const newActions = { ...actions };
    newActions[activeAction] = [...newActions[activeAction], item];
    setActions(newActions);
  };

  return (
    <View style={styles.container}>
      <View style={styles.codeColumn}>
        <Text style={styles.header}>CODE</Text>
        <DraggableFlatList
          data={codeList}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          onDragEnd={({ data }) => setCodeList(data)}
        />
      </View>
      <View style={styles.actionColumn}>
        <Text style={styles.header}>ACTION</Text>
        <View style={styles.actionTabs}>
          {Object.keys(actions).map(action => (
            <TouchableOpacity
              key={action}
              style={[styles.actionTab, activeAction === action && styles.activeActionTab]}
              onPress={() => setActiveAction(action)}
            >
              <Text style={[styles.actionTabText, activeAction === action && styles.actionTabTextActive]}>{action}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <DraggableFlatList
          data={actions[activeAction]}
          renderItem={renderActionItem}
          keyExtractor={(item, index) => `action-item-${index}`}
          onDragEnd={({ data }) => {
            const newActions = { ...actions };
            newActions[activeAction] = data;
            setActions(newActions);
          }}
          onDrop={({ dragged: draggedItem }) => handleDrop(draggedItem)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  codeColumn: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    borderRightWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  actionColumn: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 15,
    color: '#333',
  },
  codeButton: {
    backgroundColor: '#4da6ff',
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  codeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  actionTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  actionTab: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: '#ccc',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e6f2ff',
    borderRadius: 5,
  },
  actionTabText: {
    fontSize: 16,
    color: '#333',
  },
  activeActionTab: {
    backgroundColor: '#00cc00',
  },
  actionTabTextActive: {
    color: '#fff',
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4da6ff',
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  actionItemText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ActionScreen;
