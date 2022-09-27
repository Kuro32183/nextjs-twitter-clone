import { gql } from "@apollo/client";

export const GET_ALL_TWEETS = gql`
  query MyQuery {
    getTweetList {
      created_at
      id
      image
      text
      username
      commentList {
        id
      }
    }
  }
`;

export const GET_TWEET_BY_ID = gql`
  query MyQuery($id: ID!) {
    getTweet(id: $id) {
      created_at
      id
      image
      text
      username
      commentList {
        created_at
        text
        id
        image
        tweet_id
        username
      }
    }
  }
`;

export const GET_VOTE_USING_TWEET_ID = gql`
  query MyQuery($id: ID!) {
    getVoteUsingTweet_id(id: $id) {
      tweet_id
      upvote
      username
      id
    }
  }
`;