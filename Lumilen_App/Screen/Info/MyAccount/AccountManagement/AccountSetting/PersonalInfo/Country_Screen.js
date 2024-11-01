// CountrySelection.js
import React from 'react';
import { View, Text, FlatList, SafeAreaView ,StatusBar,TouchableOpacity} from 'react-native';
import { styles } from '../../../Css/Country_Css'; // Import file styles riêng biệt
import { Ionicons } from "@expo/vector-icons";

const countryData = [
  { name: 'Afghanistan', localName: 'افغانستان' },
  { name: 'Ai Cập', localName: 'مصر' },
  { name: 'Albani', localName: 'Shqipëria' },
  { name: 'Algeri', localName: 'الجزائر' },
  { name: 'Andorra', localName: '' },
  { name: 'Angola', localName: '' },
  { name: 'Anguilla', localName: '' },
  { name: 'Antigua và Barbuda', localName: '' },
  { name: 'Argentina', localName: '' },
  { name: 'Armenia', localName: 'Հայաստան' },
  { name: 'Aruba', localName: '' },
  { name: 'Azerbaijan', localName: 'Azərbaycаn' },
  { name: 'Áo', localName: 'Österreich' },
  { name: 'Ấn Độ', localName: 'भारत' },
  { name: 'Ả Rập Saudi', localName: 'المملكة العربية السعودية' },
  { name: 'Ba Lan', localName: 'Polska' },
  { name: 'Bahrain', localName: 'البحرين' },
  { name: 'Bangladesh', localName: 'বাংলাদেশ' },
  { name: 'Barbados', localName: '' },
  { name: 'Bỉ', localName: 'België' },
  { name: 'Belarus', localName: 'Беларусь' },
  { name: 'Belize', localName: '' },
  { name: 'Benin', localName: '' },
  { name: 'Bhutan', localName: 'འབྲུག' },
  { name: 'Bolivia', localName: '' },
  { name: 'Bosnia và Herzegovina', localName: 'Босна и Херцеговина' },
  { name: 'Botswana', localName: '' },
  { name: 'Brazil', localName: 'Brasil' },
  { name: 'Brunei', localName: 'بروني' },
  { name: 'Bulgaria', localName: 'България' },
  { name: 'Burkina Faso', localName: '' },
  { name: 'Burundi', localName: '' },
  { name: 'Cabo Verde', localName: '' },
  { name: 'Cameroon', localName: 'Cameroun' },
  { name: 'Canada', localName: '' },
  { name: 'Chile', localName: '' },
  { name: 'Trung Quốc', localName: '中国' },
  { name: 'Colombia', localName: '' },
  { name: 'Costa Rica', localName: '' },
  { name: 'Croatia', localName: 'Hrvatska' },
  { name: 'Cuba', localName: '' },
  { name: 'Síp', localName: 'Κύπρος' },
  { name: 'Cộng hòa Séc', localName: 'Česká republika' },
  { name: 'Đan Mạch', localName: 'Danmark' },
  { name: 'Djibouti', localName: '' },
  { name: 'Dominica', localName: '' },
  { name: 'Cộng hòa Dominican', localName: 'República Dominicana' },
  { name: 'Ecuador', localName: '' },
  { name: 'Ai-len', localName: 'Éire' },
];

const CountrySelection = ({navigation}) => {
  const renderCountryItem = ({ item }) => (
  <TouchableOpacity >
    <View style={styles.countryContainer}>
      <Text style={styles.countryName}>{item.name}</Text>
      {item.localName ? (
        <Text style={styles.localName}>({item.localName})</Text>
      ) : null}
    </View>
  </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quốc gia / Khu Vực</Text>
      </View>
      <Text style={styles.description}>
        Về phần ngôn ngữ, chúng tôi sử dụng cài đặt sẵn có trên điện thoại của bạn.
      </Text>
      <FlatList
        data={countryData}
        keyExtractor={(item) => item.name}
        renderItem={renderCountryItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default CountrySelection;
