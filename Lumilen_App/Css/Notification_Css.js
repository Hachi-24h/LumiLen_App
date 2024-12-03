import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0, // padding 5% chiều rộng màn hình
    paddingVertical: height * 0.05, // padding 2% chiều cao màn hình
  },
  header: {
    fontSize: width * 0.075, // font-size là 7.5% chiều rộng màn hình
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.03, // margin-bottom là 3% chiều cao màn hình
    textAlign: 'center',
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: width * 0.04, // padding 4% chiều rộng màn hình
    marginBottom: height * 0.01, // margin-bottom là 1.5% chiều cao màn hình
    borderRadius: width * 0.03, // borderRadius là 3% chiều rộng màn hình
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3, // For Android shadow
  },
  readNotification: {
    backgroundColor: '#e0f7e0', // Soft green for read notifications
  },
  notificationText: {
    fontSize: width * 0.04, // font-size là 4% chiều rộng màn hình
    color: '#444',
    lineHeight: height * 0.025, // line-height là 2.5% chiều cao màn hình
  },
  timestamp: {
    fontSize: width * 0.03, // font-size là 3% chiều rộng màn hình
    color: '#888',
    marginTop: height * 0.005, // margin-top là 0.5% chiều cao màn hình
    fontStyle: 'italic',
  },
  markAsRead: {
    color: '#0066cc',
    marginTop: height * 0.015, // margin-top là 1.5% chiều cao màn hình
    fontSize: width * 0.04, // font-size là 4% chiều rộng màn hình
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  markAsReadPressed: {
    color: '#0055a5', // Darker blue when pressed
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default styles;
