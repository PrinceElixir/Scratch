import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Card = ({ description, SvgComponent, onDelete, cardWidth, cardHeight }) => {
  const navigation = useNavigation();

  return (
    
    <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
      <TouchableOpacity style={styles.deleteIcon} onPress={onDelete}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
      {SvgComponent && <SvgComponent width={50} height={50} />}
      <Text style={styles.description}>{description}</Text>
      <Button 
        title='Add Action'
        onPress={() => navigation.navigate('Action')}
        style={styles.action} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  action: {
    backgroundColor: 'black',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Card;
