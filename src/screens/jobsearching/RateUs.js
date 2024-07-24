import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const RateUs = () => {
  const [rating, setRating] = useState('');
  const [feedback, setFeedback] = useState('');

  const submitRating = async () => {
    if (rating) {
      try {
        await firestore().collection('ratings').add({
          rating: parseInt(rating),
          feedback: feedback,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
        alert('Thank you for your feedback!');
        setRating('');
        setFeedback('');
      } catch (error) {
        console.error('Error submitting rating: ', error);
        alert('Failed to submit rating. Please try again.');
      }
    } else {
      alert('Please provide a rating before submitting.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rate Us</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your rating (1-5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.textarea}
        placeholder="Enter your feedback (optional)"
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={4}
      />
      <Button title="Submit" onPress={submitRating} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  textarea: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    height: 100,
    borderRadius: 5,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
});

export default RateUs;
