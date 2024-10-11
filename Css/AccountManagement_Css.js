import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#F7F7F7', // Màu nền sáng hơn cho header
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#000', // Màu đen rõ ràng cho tiêu đề
  },
  introText: {
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#6D6D6D', // Màu xám nhạt cho phần giới thiệu
    marginBottom: 10,
  },
  section: {
    paddingHorizontal: 15,
    marginTop: 15, // Tạo khoảng cách giữa các phần
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  settingDetailContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  settingDetail: {
    fontSize: 14,
    color: '#6D6D6D', // Màu xám nhạt cho chi tiết cài đặt
  },
  settingDescription: {
    fontSize: 12,
    color: '#6D6D6D', // Màu xám nhạt cho mô tả
    marginTop: 5, // Tạo khoảng cách trên cho mô tả
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // Giảm kích thước của Switch để gọn hơn
  },
});

export default styles;
