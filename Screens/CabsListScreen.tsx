import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { firestore } from '../firebaseConfig';

interface Cab {
  id: string;
  companyName: string;
  carModel: string;
}

const CabsListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [cabs, setCabs] = useState<Cab[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'cabs'), (snapshot) => {
      const fetchedCabs: Cab[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Cab, 'id'>,
      }));
      setCabs(fetchedCabs);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Cab Detail', { cabId: item.id })}
          >
            <View style={styles.cardContent}>
              <Text style={styles.companyName}>{item.companyName}</Text>
              <Text style={styles.carModel}>{item.carModel}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#f10e23',
    elevation: 2,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ec8f13',
  },
  carModel: {
    fontSize: 16,
    color: '#1370EC',
  },
});

export default CabsListScreen;

