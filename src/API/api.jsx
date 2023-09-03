const host = 'http://localhost:8080/api/'
const apiList = {
  /*
    Send: account's id store in the website session
    Return: the full account object that have the id
    */
  getAccountWithId: `${host}Account/getAccountWithId/${sessionStorage.getItem('AccountID')}`,
  /*
    Send: email, password and username infor
    Return: the full account object that have just created
    */
  createAnAccount: `${host}Account/createAnAccount`,
  /* 
    Send: account's email and password
    Return: the full account object that have the infor references
    */
  getAccountWithEmailAndPassword: `${host}Account/getAccount`,
  /* 
    Send: account's id
    Return: all account's information except the account that match the id
    */
  getAllAccountsExceptId: `${host}Account/getAllAccount`,
  /*
    Send: account's id
    Return: all groups that related to the account which have the matching id
    */
  getAllGroupsRelatedToAccount: `${host}Group/getAllGroup`,
  /*
    Send: account's from_id and account's to_id
    Return: all messages of those two accounts
    */
  getDMMessagesChat: `${host}DMChat/getChat`,
  /*
    Send: account's to_id
    Return: all messages of from the group
    */
  getGroupMessagesChat: `${host}GroupChat/getChat`,
  /*
    Send: Account's Id, group's name and all accounts gotta be added into this group
    Return: The group object that have been created
    */
  createGroup: `${host}Group/createGroup`,
  /*
    Send: Account's Id and group's Id
    Return: The group object that the account have joined
    */
  joinGroup: `${host}Group/joinGroup`,
  /*
    Send: Account's Id and group's Id
    Return: The group that the account have leave
    */
  leaveGroup: `${host}Group/leaveGroup`,
  /*
    Send: Image to backend
    Return: return the file name that have been stored in the backend
    */
  loadDMImage: `${host}DMChat/loadImage`,
  /*
    Send: Image to backend
    Return: return the file name that have been stored in the backend
    */
  loadGroupImage: `${host}GroupChat/loadImage`,
  /*
    Send: Image file name
    Return: render the file from backend
    */
  getImage: `${host}image`,
  /*
    Send: Send an Image to check and create new password, sending through email
    Return: Null if successful, false if unsuccessful
    */
  forgotPassword: `${host}Account/forgotPassword`,
  /*
    Send: Send account id and new password
    Return: Null if successful, false if unsuccessful
    */
  updateNewPassword: `${host}Account/updateNewPassword`,
}

export default apiList
