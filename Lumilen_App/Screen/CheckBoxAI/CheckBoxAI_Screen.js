import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const CheckBoxAI_Screen = () => {
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);

    // Thêm hàm gửi câu hỏi vào đây
    const sendQuestion = async () => {
        if (!question.trim()) return;
    
        setMessages([...messages, { sender: 'user', text: question }]);
    
        try {
            const response = await axios.post('http://192.168.114.1:5000/api/ask', { question });
            const answer = response.data.answer;
    
            setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: answer }]);
        } catch (error) {
            console.error('Error sending question:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'ai', text: 'Xin lỗi, đã xảy ra lỗi.' },
            ]);
        }
    
        setQuestion('');
    };
    
    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text
                        style={[
                            styles.message,
                            item.sender === 'user' ? styles.userMessage : styles.aiMessage,
                        ]}
                    >
                        {item.text}
                    </Text>
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="Nhập câu hỏi của bạn..."
                value={question}
                onChangeText={setQuestion}
            />
            <Button title="Gửi" onPress={sendQuestion} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    message: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    userMessage: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
    },
    aiMessage: {
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-start',
    },
});

export default CheckBoxAI_Screen;
