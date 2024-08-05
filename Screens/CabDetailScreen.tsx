import React, { useEffect, useState } from 'react';
import { Alert, Text, View, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { doc, getDoc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

interface CabDetail {
  companyName: string;
  carModel: string;
  passengerCapacity: number;
  rating: number;
  costPerHour: number;
  bookingStatus?: boolean; // Optional field to handle booking status
}

const CabDetailScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { cabId } = route.params; // Document ID from Firestore
  const [cab, setCab] = useState<CabDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCabDetails = async () => {
      try {
        const docRef = doc(firestore, 'cabs', cabId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCab(docSnap.data() as CabDetail);
        } else {
          Alert.alert('Error', 'Cab not found');
        }
      } catch (error) {
        console.error('Error fetching cab details: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCabDetails();
  }, [cabId]);

  const checkBookingLimit = async () => {
    try {
      const q = query(collection(firestore, 'cabs'), where('bookingStatus', '==', true));
      const querySnapshot = await getDocs(q);
      return querySnapshot.size < 2; // Check if there are fewer than 2 booked cabs
    } catch (error) {
      console.error('Error checking booking limit: ', error);
      return false;
    }
  };

  const handleBookCab = async () => {
    try {
      const canBook = await checkBookingLimit();

      if (canBook && cab && !cab.bookingStatus) {
        // Update the cab document to set bookingStatus to true
        const cabRef = doc(firestore, 'cabs', cabId);
        await updateDoc(cabRef, { bookingStatus: true });
        console.log('Cab booking status updated to true');

        Alert.alert('Success', 'Cab has been booked.');
        // navigation.navigate('My Cab'); // Navigate to My Cab screen to show updated list
      } else if (!canBook) {
        Alert.alert('Limit Reached', 'You are only able to book two cabs at a time.');
      } else {
        Alert.alert('Error', 'Cab is already booked or no cab details found.');
      }
    } catch (error) {
      console.error('Error booking cab: ', error);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <SafeAreaView style={styles.container}>
      {cab && (
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{cab.companyName}</Text>
          <Text style={styles.subtitle}>{cab.carModel}</Text>
          <Text style={styles.detail}>Passengers: {cab.passengerCapacity}</Text>
          <Text style={styles.detail}>Rating: {cab.rating}</Text>
          <Text style={styles.detail}>Cost/hour: ${cab.costPerHour}</Text>
          <TouchableOpacity style={styles.bookButton} onPress={handleBookCab}>
            <Text style={styles.bookButtonText}>Book Cab</Text>
          </TouchableOpacity>
        </View>
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
  detailsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555',
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CabDetailScreen;
