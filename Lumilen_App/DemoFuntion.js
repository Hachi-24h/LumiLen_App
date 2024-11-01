import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';


const App = () => {
   

    return (
        <View>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#ddd', borderRadius: 5 }}>
                <Text>Make Request</Text>
            </TouchableOpacity>
        </View>
    );
};

export default App;
