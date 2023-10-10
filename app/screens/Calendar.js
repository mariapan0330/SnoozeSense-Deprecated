import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
  } from 'react-native';
  import { Calendar } from 'react-native-calendars';
  import React, { useState } from 'react';
  
  const tasks = [
    { task: 'Reading', timeframe: '5:00 PM - 5:15 PM' },
    { task: 'Start Skincare', timeframe: '6:15 PM - 6:45 PM' },
    { task: 'Go on phone', timeframe: '6:15 PM - 6:45 PM' },
  ];
  
  function MyCalendar() {
    const [selected, setSelected] = useState('');
    const [checked, setChecked] = useState([false, false, false]);
  
    const handlePress = (index) => {
      const newChecked = [...checked];
      newChecked[index] = !newChecked[index];
      setChecked(newChecked);
    };
  
    return (
      <ScrollView>
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: 'orange',
            },
          }}
        />
        <View style={styles.goalContainer}>
          {/* <Image source={require('./moonicon.png')} style={styles.icon} /> */}
          <Text styles={styles.goalText}> Sleep Goal: 8 Hours</Text>
        </View>
        <View>
          <Text> Today's Task </Text>
        </View>
  
        <View style={styles.container}>
          {tasks.map((task, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.textContainer}>
                <Text style={styles.taskText}>{task.task}</Text>
                <Text style={styles.timeframeText}>{task.timeframe}</Text>
              </View>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => handlePress(index)}>
                {checked[index] && <Text style={styles.checkMark}>✔</Text>}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    goalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 0,
      marginTop: 40,
    },
    goalText: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 50,
    },
    container: {
      flex: 1,
      padding: 20,
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      padding: 20,
      marginBottom: 10,
      borderRadius: 10,
    },
    textContainer: {
      flex: 1,
    },
    taskText: {
      fontSize: 16,
      marginBottom: 5,
    },
    timeframeText: {
      fontSize: 14,
      color: '#666',
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#ffffff',
    },
    checkMark: {
      fontSize: 20,
      color: 'green',
    },
  });
  
  export default MyCalendar;
  