// CountrySelectionStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
    marginRight: 8,
  },
  localName: {
    fontSize: 16,
    color: '#495057',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#F7F7F7',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
});
