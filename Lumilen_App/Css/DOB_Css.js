import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20, // Thêm khoảng đệm cho toàn bộ màn hình
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Thêm khoảng cách giữa header và nội dung
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#888',
   
    marginBottom: 30, // Khoảng cách dưới dòng mô tả
    paddingHorizontal: 10, // Giúp chữ không sát vào hai bên
  },
  dateText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#D32F2F',
    paddingBottom: 5,
    marginBottom: 30, // Khoảng cách dưới ngày sinh
  },
  subText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginBottom: 50, // Khoảng cách dưới đoạn mô tả phụ
  },
  updateButton: {
    backgroundColor: '#D32F2F',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
