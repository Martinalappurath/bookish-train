import React, { useEffect, useState } from 'react';
import { Alert, Text, View, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { collection, onSnapshot, doc, updateDoc, QuerySnapshot } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

interface CabDetail {
  id: string; // Document ID
  companyName: string;
  carModel: string;
  passengerCapacity: number;
  rating: number;
  costPerHour: number;
  bookingStatus?: boolean;
}

const MyCabScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [bookedCabs, setBookedCabs] = useState<CabDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cabCollection = collection(firestore, 'cabs');
    const unsubscribe = onSnapshot(cabCollection, (querySnapshot: QuerySnapshot) => {
      console.log('Firestore snapshot received'); // Debugging line

      const cabs = querySnapshot.docs
        .filter(doc => doc.data().bookingStatus === true)
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        } as CabDetail));

      console.log('Updated booked cabs:', cabs); // Debugging line
      setBookedCabs(cabs);
      setLoading(false);
    }, (error) => {
      console.error('Error listening to Firestore updates:', error); // Debugging line
    });

    return () => {
      console.log('Unsubscribing from Firestore'); // Debugging line
      unsubscribe(); // Cleanup listener on unmount
    };
  }, []);

  const handleCancelCab = async (id: string) => {
    try {
      const cabRef = doc(firestore, 'cabs', id);
      await updateDoc(cabRef, { bookingStatus: false });
      console.log('Cab booking status updated to false');
    } catch (error) {
      console.error('Error canceling cab booking: ', error);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <SafeAreaView style={styles.container}>
      {bookedCabs.length === 0 ? (
        <Text style={styles.emptyText}>No bookings found</Text>
      ) : (
        bookedCabs.map(cab => (
          <View key={cab.id} style={styles.cabContainer}>
            <Text style={styles.title}>{cab.companyName}</Text>
            <Text style={styles.subtitle}>{cab.carModel}</Text>
            <Text style={styles.detail}>Cost/hour: ${cab.costPerHour}</Text>
            <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelCab(cab.id)}>
              <Text style={styles.cancelButtonText}>Cancel Booking</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  cabContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EC8F13',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1370EC',
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    color: '#8F13EC',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyCabScreen;
