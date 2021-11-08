import React, { Component } from 'react';
// import { auth, createUserDocument } from '../firebase';

import Posts from './Posts';
// import {collectIdsAndDocs}  from '../utilities'

import Authentication from '../components/Authentication.jsx'

import { Switch, Link, Route } from 'react-router-dom';

import UserProfile from './UserProfile';
import PostPage from './PostPage';

class Application extends Component {
  // state = {
  //   posts: [
  //     {
  //       id: '1',
  //       title: 'A Very Hot Take',
  //       content:
  //         'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!',
  //       user: {
  //         uid: '123',
  //         displayName: 'Bill Murray',
  //         email: 'billmurray@mailinator.com',
  //         photoURL: 'https://www.fillmurray.com/300/300',
  //       },
  //       stars: 1,
  //       comments: 47,
  //     },
  //     {
  //       id: '2',
  //       title: 'The Sauciest of Opinions',
  //       content:
  //         'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!',
  //       user: {
  //         uid: '456',
  //         displayName: 'Mill Burray',
  //         email: 'notbillmurray@mailinator.com',
  //         photoURL: 'https://www.fillmurray.com/400/400',
  //       },
  //       stars: 3,
  //       comments: 0,
  //     },
  //   ],
  // };

  // state = {
  //   // posts: [],
  //   user: null,
  // };

  // unsubscribeFromFirestore = null;
  // unsubscribeFromAuth = null;

  // componentDidMount = async () => {
  //   // const snapshot = await firestore.collection('posts').get();
  //   // this.unsubscribeFromFirestore = firestore.collection('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
  //   //   const posts = snapshot.docs.map(collectIdsAndDocs);
  //   //   this.setState({ posts });
  //   // })
    
  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
  //     const user = await createUserDocument(userAuth);
  //     // console.log('🐤',userAuth);
  //     this.setState({ user });
  //   });
  // };

  // componentWillUnmount = () => {
  //   // this.unsubscribeFromFirestore();
  //   this.unsubscribeFromAuth();
  // };

  // handleCreate = async post => {
  
  //   // const docRef = await firestore.collection('posts').add(post);
  //   // const doc = await docRef.get();

  //   // const newPost = collectIdsAndDocs(doc);

  //   // const { posts } = this.state;
  //   // this.setState({ posts: [newPost, ...posts] });

  //   firestore.collection('posts').add(post);
  // };

  // handleRemove = async id => {
  //   // const allPosts = this.state.posts;

  //   // const posts = allPosts.filter(post => post.id !== id);

  //   // await firestore.doc(`posts/${id}`).delete();

  //   // this.setState({ posts });

  //   firestore.doc(`posts/${id}`).delete()
  // }

  render() {
    // const { posts, user } = this.state;
    // const { user } = this.state;

    return (
      <main className="Application">
        <Link to="/"><h1>Think Piece</h1></Link>
        {/* <Authentication user={user} /> */}
        {/* <Posts posts={posts} /> */}
        <Authentication />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/posts/:id" component={PostPage} />
        </Switch>
        {/* <Posts /> */}
      </main>
    );
  };
};

export default Application;
