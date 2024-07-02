import React from 'react';
import { View, StyleSheet } from 'react-native';
import Playground from './Playground';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Playground />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: '#E6E6FA',
    padding: 10,
  },
});

export default HomeScreen;
