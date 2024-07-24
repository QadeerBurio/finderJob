import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const NewMsg = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const querySnapshot = firestore()
      .collection('chats')
      .doc(route.params.data.id)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unsubscribe = querySnapshot.onSnapshot(snapshot => {
      const allMessages = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
        };
      });
      setMessages(allMessages);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [route.params.data.id]);

  const onSend = messageArray => {
    const msg = messageArray[0];
    const myMsg = {
      _id: msg._id,
      text: msg.text,
      createdAt: new Date(),
      user: msg.user,
      senderId: route.params.myId,
      receiverId: route.params.data.userId,
    };

    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    console.log(myMsg)
    firestore()
      .collection('chats')
      .doc(route.params.data.id)
      .collection('messages')
      .add({
        ...myMsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.myId,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: 'orange',
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default NewMsg;
