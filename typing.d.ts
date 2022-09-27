type Tweet = {
	created_at: string;
	id: number;
	image: string;
	text: string;
	username: string;
	voteList: Vote[];
	commentList: Comment[];
  };
  
  type Vote = {
	created_at: string;
	id: number;
	tweet_id: number;
	username: string;
	upvote: boolean;
  };
  
  type Comment = {
	created_at: string;
	id: number;
	text: string;
	tweet_id: number;
	username: string;
  };

  declare module "react-timeago/lib/language-strings/ja";
declare module "react-timeago/lib/formatters/buildFormatter";