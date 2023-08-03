import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  list: {
    flex: 1,
    padding: 10,
    width: '100%',
    flexDirection: 'column',
  },
  input: {
    marginTop: 10,
    width: '66%',
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  close: {
    fontSize: 14,
    padding: 4,
    margin: 10,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'red',
  },
  open: {
    fontSize: 14,
    padding: 4,
    margin: 10,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'green',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'column',
    paddingVertical: 5,
    backgroundColor: '#ECECEC',
    borderRadius: 5,
    marginBottom: 5,
  },
  subCard: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  subCardMessage: {
    flexDirection: 'column',
    paddingVertical: 2,
  },
  leftText: {
    flex: 1,
    paddingHorizontal: 5,
    textAlign: 'left',
  },
  rightText: {
    flex: 1,
    paddingHorizontal: 10,
    textAlign: 'right',
  },
  textInput: {
    height: 200,
    paddingHorizontal: 100,
    paddingVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  logoutButton: {
    marginRight: 16,
  },
  plusButton: {
    marginRight: 5,
  },
  messageText: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  deleteButtonContainer: {
    flexDirection: 'column',
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: 'red',
    width: 50,
    alignItems: 'center',
    paddingVertical: 5,
  },
  addUserButtonContainer: {
    flexDirection: 'column',
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: 'green',
    width: 50,
    alignItems: 'center',
    paddingVertical: 5,
  },
  headerRightButtons: {
    flexDirection: 'row',
  },
});
