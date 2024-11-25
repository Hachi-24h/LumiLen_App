import React, { useState } from 'react';
import { View, Button } from 'react-native';
import LoadingModal from './Other/Loading';

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Loading" onPress={() => setLoading(true)} />
      <Button title="Hide Loading" onPress={() => setLoading(false)} />
      <LoadingModal loading={loading} text="Xin vui lòng chờ " />
    </View>
  );
};

export default App;
