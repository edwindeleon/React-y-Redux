import React, { Component } from 'react';
import { Link } from 'react-router';

import Post from '../../posts/containers/Post.jsx';

import api from '../../api.js';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      page: 1,
      posts: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const posts = await api.posts.getList(this.state.page);

    this.setState({
      posts,
      page: this.state.page + 1,
      loading: false,
    })
  }
  
  render() {
  console.log(this.props);
    return (
      <section name="Home">
        <h1>Home</h1>
        <section>
          {this.state.loading && (
            <h2>loading posts...</h2>
          )}
          {this.state.posts
            .map(post => <Post key={post.id} {...post} />)}
        </section>
        <Link to="/about">
          Go to about
        </Link>
      </section>
    );
  }
}

export default Home;
