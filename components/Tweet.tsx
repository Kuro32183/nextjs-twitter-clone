import {
	AiOutlineMessage,
	AiOutlineRetweet,
	AiOutlineHeart,
	AiOutlineUpload,
  } from "react-icons/ai";
  import TimeAgo from "react-timeago";
  import japanStrings from "react-timeago/lib/language-strings/ja";
  import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
  import React from "react";
  import Link from "next/link";
  import { useMutation, useQuery } from "@apollo/client";
  import { GET_VOTE_USING_TWEET_ID } from "../graphql/queries";
  import { ADD_VOTE, DELETE_VOTE } from "../graphql/mutations";
  import { useEffect, useState } from "react";
  import { useSession } from "next-auth/react";
  import toast from "react-hot-toast";
  import { Ring } from "@uiball/loaders";
  
  interface Props {
	tweet: Tweet;
  }
  
  function Tweet({ tweet }: Props) {
	const [userVote, setUserVote] = useState<boolean | undefined>(false);
	const [mutationLoading, setMutationLoading] = useState<boolean>(false);
	const formatter = buildFormatter(japanStrings);
  
	const { data, loading } = useQuery(GET_VOTE_USING_TWEET_ID, {
	  variables: {
		id: tweet.id,
	  },
	});
	const votes: Vote[] = data?.getVoteUsingTweet_id;
	const [addVote] = useMutation(ADD_VOTE, {
	  refetchQueries: [GET_VOTE_USING_TWEET_ID, "getVoteUsingTweet_id"],
	});
	const [deleteVote] = useMutation(DELETE_VOTE, {
	  refetchQueries: [GET_VOTE_USING_TWEET_ID, "getVoteUsingTweet_id"],
	});
	const { data: session } = useSession();
	useEffect(() => {
	  const vote = votes?.find(
		(vote) => vote.username === session?.user?.name
	  )?.upvote;
	  setUserVote(vote);
	}, [votes]);
  
	const upVote = async () => {
	  if (!session) {
		toast("ログインしてください！");
		return;
	  }
	  if (!userVote) {
		setMutationLoading(true);
		const {
		  data: { insertVote: newVote },
		} = await addVote({
		  variables: {
			tweet_id: tweet.id,
			username: session?.user?.name,
			upvote: true,
		  },
		});
		setMutationLoading(false);
	  } else {
		const vote_id = votes?.find(
		  (vote) => vote.username === session?.user?.name
		)?.id;
		setMutationLoading(true);
		const {
		  data: { deleteVote: deleteVoteA },
		} = await deleteVote({
		  variables: {
			id: vote_id,
		  },
		});
		setMutationLoading(false);
		setUserVote(undefined);
	  }
	};
	if (!tweet || loading || mutationLoading)
	  return (
		<div
		  className="flex w-full items-center justify-center p-10 text-xl"
		  aria-live="polite"
		  aria-busy={!tweet}
		>
		  <Ring size={50} color="#3899e8" />
		</div>
	  );
  
	return (
	  <div className="flex flex-col px-8 lg:px-10 space-x-8 border-y border-gray-100 p-5 cursor-pointer hover:bg-slate-100">
		<Link href={`tweet/${tweet.id}`}>
		  <div className="flex space-x-3">
			<img
			  className="h-12 w-12 rounded-full object-cover"
			  src={tweet.image ?? "/no_image.svg"}
			  alt=""
			></img>
			<div>
			  <div className="flex items-center space-x-3">
				<p className="font-bold">{tweet.username}</p>
				<TimeAgo
				  className="text-sm text-gray-500"
				  date={tweet.created_at}
				  formatter={formatter}
				/>
			  </div>
			  <p className="pt-1">{tweet.text}</p>
			</div>
		  </div>
		</Link>
		{/* コメント　いいねアイコン */}
		<div className="mt-5 flex justify-between">
		  <div className="flex cursor-pointer items-center space-x-2 text-gray-400">
			<div className="p-3 hover:bg-slate-200 hover:rounded-full">
			  <AiOutlineMessage className="h-5 w-5" />
			</div>
			<p>{tweet.commentList.length}</p>
		  </div>
		  <div className="flex cursor-pointer items-center space-x-2 text-gray-400">
			<div className="p-3 hover:bg-slate-200 hover:rounded-full">
			  <AiOutlineRetweet className="h-5 w-5" />
			</div>
		  </div>
		  <div className="flex cursor-pointer items-center space-x-2 text-gray-400">
			<div className="p-3 hover:bg-slate-200 hover:rounded-full">
			  <AiOutlineHeart
				onClick={() => upVote()}
				color={`${userVote ? "red" : ""}`}
				className="h-5 w-5"
			  />
			</div>
			<p>{votes?.length ?? 0}</p>
		  </div>
		  <div className="flex cursor-pointer items-center space-x-2 text-gray-400">
			<div className="p-3 hover:bg-slate-200 hover:rounded-full">
			  <AiOutlineUpload className="h-5 w-5" />
			</div>
		  </div>
		</div>
	  </div>
	);
  }
  
  export default Tweet;