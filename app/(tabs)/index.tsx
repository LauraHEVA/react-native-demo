import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {

  const [data, setData] = useState<Array<{ title: string, id: string, completed: boolean }> | undefined>(undefined);

  const getAPIData = async () => {
    const APIUrl = 'https://jsonplaceholder.typicode.com/todos';
    const response = await fetch(APIUrl);
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text style={styles.separator}>Data from the API https://jsonplaceholder.typicode.com/</Text>
      {
        data ?
        data.map((item: { title: string, id: string, completed: boolean }) => {
          return (
            <View key={item.id} style={styles.container}>
              <Text style={{fontSize: 24, backgroundColor:"orange"}}>{item.id}</Text>
              <Text style={styles.separator}>{item.title}</Text>
              <Text>Completed: {item.completed ? "✓" : "X"}</Text>
            </View>
          );
        }).slice(0, 4)
          : null
      }
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
