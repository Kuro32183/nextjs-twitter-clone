import { gql } from "@apollo/client";

export const ADD_TWEET = gql`
  mutation MyMutation($image: String!, $text: String!, $username: String!) {
    insertTweet(text: $text, username: $username, image: $image) {
      created_at
      id
      image
      text
      username
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation MyMutation(
    $text: String!
    $tweet_id: ID!
    $username: String!
    $image: String!
  ) {
    insertComment(
      text: $text
      tweet_id: $tweet_id
      username: $username
      image: $image
    ) {
      created_at
      id
      image
      text
      tweet_id
      username
    }
  }
`;

export const ADD_VOTE = gql`
  mutation MyMutation($tweet_id: ID!, $upvote: Boolean!, $username: String!) {
    insertVote(tweet_id: $tweet_id, upvote: $upvote, username: $username) {
      tweet_id
      upvote
      username
    }
  }
`;

export const DELETE_VOTE = gql`
  mutation MyMutation($id: ID!) {
    deleteVote(id: $id) {
      tweet_id
      id
      upvote
      username
    }
  }
`;