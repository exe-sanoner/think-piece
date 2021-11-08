import React, { Component } from 'react';

import { withRouter, Link } from 'react-router-dom';
import Post from './Post';
import Comments from './Comments';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';

import withUser from './withUser';


class PostPage extends Component {
  state = { post: null, comments: [], loaded: false };

  get postId() {
    return this.props.match.params.id;
  }

  get postRef() {
    return firestore.doc(`/posts/${this.postId}`);
  }

  get commentsRef() {
    return this.postRef.collection('comments');
  }

  unsubscribeFromPost = []; // or null
  unsubscribeFromComments = []; // or null

  componentDidMount = async () => {
    this.unsubscribeFromPost = this.postRef.onSnapshot(snapshot => {
      const post = collectIdsAndDocs(snapshot);
      this.setState({ post, loaded: true });
    });

    this.unsubscribeFromComments = this.commentsRef.onSnapshot(snapshot => {
      const comments = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ comments });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromPost();
    this.unsubscribeFromComments();
  };

  // createComment = (comment, user) => {
  //   // console.log('🐤',comment, user);
  //   this.commentsRef.add({
  //     ...comment,
  //     user,
  //   });
  // };

  createComment = (comment) => {
    const { user } = this.props;
    // console.log('🐤',comment, user);
    this.commentsRef.add({ 
      ...comment,
      user,
    });
  };

  render() {
    // console.log('🐤',this.props);
    const { post, comments, loaded } = this.state;

    if (!loaded) return <p>Loading…</p>;

    return (
      <section>
        {post && <Post {...post} />}
        <Comments
          comments={comments}
          postId={post.id}
          onCreate={this.createComment}
        />
        <footer>
          <Link to="/">&larr; Back</Link>
        </footer>
      </section>
    );
  }
}

export default withRouter(withUser((PostPage)));