import React from "react";
import { View, StyleSheet , Text} from 'react-native';

export default function ProgressBar({ completed, total }){
    const progress = total > 0 ? completed / total : 0;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
  
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        <Text style={styles.percentageText}>{percentage.toFixed(0)}%</Text>
      </View>
    );
};
  
  const styles = StyleSheet.create({
    progressBarContainer: {
      height: 20,
      width: '100%',
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#6200EE',
      borderRadius: 10,
    },
    percentageText: {
        position: 'absolute',
        right: 10,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#6200EE',
      },
  });