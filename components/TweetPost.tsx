import {
	HiOutlineCalendar,
	HiOutlineEmojiHappy,
	HiOutlineLocationMarker,
	HiOutlinePhotograph,
	HiOutlineSearchCircle,
  } from "react-icons/hi";
  import { useSession } from "next-auth/react";
  import React, { useState } from "react";
  import { ADD_TWEET } from "../graphql/mutations";
  import { GET_ALL_TWEETS } from "../graphql/queries";
  import { useMutation } from "@apollo/client";
  import toast from "react-hot-toast";
  
  function TweetPost() {
	const [input, setInput] = useState<string>("");
	const [addPost] = useMutation(ADD_TWEET, {
	  refetchQueries: [GET_ALL_TWEETS, "getTweetList"],
	});
  
	const { data: session } = useSession();
  
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	  e.preventDefault();
	  const notification = toast.loading("ツイートを投稿しています...");
	  try {
		const {
		  data: { insertTweet: newTweet },
		} = await addPost({
		  variables: {
			text: input,
			username: session?.user?.name,
			image: session?.user?.image,
		  },
		});
  
		toast.success("ツイートが投稿されました！", {
		  id: notification,
		});
		setInput("");
	  } catch (error) {
		toast.error("投稿に失敗しました。", {
		  id: notification,
		});
	  }
	};
	const calcTextAreaHeight = (value: string) => {
	  let rowNum = value.split("\n").length;
	  if (rowNum < 3) rowNum = 3;
	  return rowNum;
	};
  
	return (
	  <div className="flex space-x-2 p-5">
		<img
		  src={session?.user?.image ?? "/no_image.svg"}
		  alt=""
		  className="mt-4 h-14 w-14 rounded-full"
		></img>
		<div className="flex flex-1 items-center pl-2">
		  <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
			<textarea
			  value={input}
			  disabled={!session}
			  onChange={(e) => setInput(e.target.value)}
			  rows={calcTextAreaHeight(input)}
			  className="h-full w-full text-xl outline-none placeholder:text-xl"
			  placeholder={session ? "いまどうしてる？" : "サインしてください。"}
			/>
			<div className="flex">
			  <div className="flex flex-1 space-x-2 text-twitter">
				{/*
				<HiOutlinePhotograph className="h-8 w-8" />
  
				 <HiOutlineSearchCircle className="h-5 w-5" />
				<HiOutlineEmojiHappy className="h-5 w-5" />
				<HiOutlineCalendar className="h-5 w-5" />
				<HiOutlineLocationMarker className="h-5 w-5" /> */}
			  </div>
  
			  <button
				disabled={!input || !session}
				type="submit"
				className="rounded-full bg-sky-400 px-5 py-2 font-bold text-white disabled:opacity-40 hover:bg-sky-600"
			  >
				ツイートする
			  </button>
			</div>
		  </form>
		</div>
	  </div>
	);
  }
  
  export default TweetPost;