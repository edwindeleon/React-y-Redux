import React, { Component, PropTypes } from 'react';

import PostBody from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import Comment from '../../comments/components/Comment';
import styles from './Page.css';


import api from '../../api';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {},
      post: {},
      comments: [],
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const [
      post,
      comments,
    ] = await Promise.all([
      api.posts.getSingle(this.props.params.id),
      api.posts.getComments(this.props.params.id),
    ]);

    const user = await api.users.getSingle(post.userId);

    this.setState({
      loading: false,
      post,
      user,
      comments,
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <section name="Post" className={styles.section}>
        <PostBody
          {...this.state.post}
          user={this.state.user}
          comments={this.state.comments}
        />

        <section className={styles.list}>
          {this.state.comments
            .map(comment => (
              <Comment key={comment.id} {...comment} />
            ))
          }
        </section>

      </section>
    );
  }
}

Post.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default Post;
