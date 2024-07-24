import { View, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Chat1 = () => {
    const [messages, setMessages] = useState([]);

    const route = useRoute();

    useEffect(() => {
        const chatDocId = `${route.params.id}${route.params.data.userId}`;
        const subscriber = firestore()
            .collection('chats')
            .doc(chatDocId)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const allMessages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data();

                    const data = {
                        _id: doc.id,
                        text: firebaseData.text,
                        createdAt: firebaseData.createdAt.toDate(),
                        user: {
                            _id: firebaseData.user._id,
                            name: firebaseData.user.name,
                        },
                    };

                    return data;
                });
                setMessages(allMessages);
            });

        return () => subscriber();
    }, []);

    const onSend = useCallback((messages = []) => {
        const msg = messages[0];
        const myMsg = {
            ...msg,
            sendBy: route.params.id,
            sendTo: route.params.data.userId,
            createdAt: new Date(),
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));

        const chatDocId = `${route.params.id}${route.params.data.userId}`;
        const reverseChatDocId = `${route.params.data.userId}${route.params.id}`;

        firestore().collection('chats').doc(chatDocId).collection('messages').add(myMsg);
        firestore().collection('chats').doc(reverseChatDocId).collection('messages').add(myMsg);
    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: route.params.id,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'wheat',
    },
});

export default Chat1;
