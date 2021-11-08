import React, { Component } from 'react';
import { firestore, auth, storage } from '../firebase';

class UserProfile extends Component {
  state = { displayName: '', file: null  };
  imageInput = null;

  get uid() {
    return auth.currentUser.uid;
  }

  get userRef() {
    return firestore.collection('users').doc(this.uid);
  }

  get file() {
    return this.imageInput && this.imageInput.files[0];
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangeImage = event => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const { displayName } = this.state;

    if (displayName) {
      this.userRef.update(this.state);
    }
    
    if (this.file) {
      storage
        .ref()
        .child('user-profiles')
        .child(this.uid)
        .child(this.file.name)
        .put(this.file)
        // return a promise
        .then(response => response.ref.getDownloadURL())
        .then(photoURL => this.userRef.update({ photoURL }));
    }
    this.setState({ displayName: '', file: null });
  };

  render () {
    const { displayName } = this.state;

    return (
      // <div>This is totally a user profile page, dog!</div>
      <section className="UserProfile">
        <form onSubmit={this.handleSubmit} className="UpdateUser">
          <input
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Display Name"
            onChange={this.handleChange}
          />
          <input 
            type="file" 
            ref={ref => (this.imageInput = ref)} 
            onChange={this.handleChangeImage}
          />
          <img alt="" src={this.state.file}/>
          <input className="update" type="submit" />
        </form>
      </section>
    )
  }
}

export default UserProfile;