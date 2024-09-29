import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  leftColumn: {
    flex: 1,
    marginRight: 5, // Khoảng cách giữa các cột
  },
  rightColumn: {
    flex: 1,
    marginLeft: 5, // Khoảng cách giữa các cột
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  imageLarge: {
    width: '100%',
    height: 300, // Điều chỉnh chiều cao của ảnh lớn
    borderRadius: 10,
  },
  imageSmall: {
    width: '100%',
    height: 200, // Điều chỉnh chiều cao của ảnh nhỏ
    borderRadius: 10,
  },
  likeContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    color: 'white',
    marginRight: 5,
    fontWeight: 'bold',
  },
  moreOptions: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  likes: {
    color: 'red',
    marginLeft: 2,
    fontWeight: 'bold',
  },
});

export default styles;
