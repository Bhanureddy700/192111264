import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

const App = () => {
  const [numberId, setNumberId] = useState('');
  const [prevState, setPrevState] = useState([]);
  const [currState, setCurrState] = useState([]);
  const [newNumbers, setNewNumbers] = useState([]);
  const [average, setAverage] = useState(0);
  const [error, setError] = useState('');

  const fetchNumbers = async () => {
    try {
      const response = await axios.get(`http://<192.168.255.141>:9876/numbers/${numberId}`);
      setPrevState(response.data.windowPrevState);
      setCurrState(response.data.windowCurrState);
      setNewNumbers(response.data.numbers);
      setAverage(response.data.avg);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching numbers:', error.response || error.message || error);
      setError(`Error fetching numbers: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Average Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number ID (p, f, e, r)"
        value={numberId}
        onChangeText={setNumberId}
      />
      <Button title="Fetch Numbers" onPress={fetchNumbers} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text style={styles.subtitle}>Previous State:</Text>
      <FlatList
        data={prevState}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.subtitle}>Current State:</Text>
      <FlatList
        data={currState}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.subtitle}>New Numbers:</Text>
      <FlatList
        data={newNumbers}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.subtitle}>Average:</Text>
      <Text style={styles.average}>{average.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  item: {
    fontSize: 16,
    paddingVertical: 5,
  },
  average: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    color: 'blue',
  },
  error: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default App;
