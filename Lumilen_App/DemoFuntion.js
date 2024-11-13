import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

export default function SearchImageScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [noResults, setNoResults] = useState(false);

  // Hàm gọi API tìm kiếm ảnh
  const handleSearch = async () => {
    try {
      const response = await axios.post('http://192.168.0.100:5001/api/search_image', {
        keyword: searchTerm,
      });

      const fetchedImages = response.data.best_image_urls;
      if (fetchedImages.length > 0) {
        setImages(fetchedImages);
        setNoResults(false);
      } else {
        setImages([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setImages([]);
      setNoResults(true);
    }
  };

  const renderImageItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm ảnh</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập từ khóa tìm kiếm..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Tìm kiếm" onPress={handleSearch} />

      {noResults ? (
        <Text style={styles.noResultsText}>Không có ảnh nào.</Text>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderImageItem}
          numColumns={2}
          contentContainerStyle={styles.imageList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  noResultsText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  imageList: {
    marginTop: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});
