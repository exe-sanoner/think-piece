import React, { Component, createContext } from 'react';
import { auth, createUserDocument } from '../firebase';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = { user: null };

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({ user: { uid: snapshot.id, ...snapshot.data()}})
        })
      }
      this.setState({ user: userAuth });
    });
    
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
    //     const user = await createUserDocument(userAuth);
    //     // console.log('🐤',userAuth);
    //     this.setState({ user });
    //   });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  };

  render() {
    const { children } = this.props;
    const { user } = this.state;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default UserProvider;