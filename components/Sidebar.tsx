import {
	AiOutlineHome,
	AiOutlineBell,
	AiOutlineMail,
	AiOutlineUser,
  } from "react-icons/ai";
  import {
	HiOutlineBookmark,
	HiOutlineDotsCircleHorizontal,
	HiOutlineHashtag,
  } from "react-icons/hi";
  import { RiQuillPenLine } from "react-icons/ri";
  import { IoListCircleOutline } from "react-icons/io5";
  import SidebarIcons from "./SidebarIcons";
  import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image"
  
  function Sidebar() {
	const { data: session } = useSession();
	return (
	  <div className="sticky h-screen top-0 left-0 col-span-2 flex flex-col items-left lg:items-start justify-between lg:overflow-auto">
		<div className="px-4 py-4 lg:w-full">
			<Link href="/">
			<a>
			<img
			src="twitter.svg"
			alt="twitter logo"
			className=" h-14 w-14"
		  />
			</a>
			</Link>
		  <SidebarIcons Icon={AiOutlineHome} title="ホーム" />
		  <SidebarIcons Icon={AiOutlineBell} title="通知" />
		  <SidebarIcons Icon={AiOutlineMail} title="メッセージ" />
		  <SidebarIcons Icon={IoListCircleOutline} title="リスト" />
		  <SidebarIcons
			Icon={AiOutlineUser}
			title={session ? "サインアウト" : "サインイン"}
			onClick={session ? signOut : signIn}
		  />
		  <SidebarIcons Icon={HiOutlineDotsCircleHorizontal} title="もっと見る" />
		  {session && (
			<button className="max-fit group mt-4 lg:w-full rounded-full bg-[#03A9F4] p-3 text-sm font-bold text-white lg:text-base relative">
			  <RiQuillPenLine className="h-6 w-6 lg:hidden" />
			  <span className="lg:hidden invisible w-[64px] rounded text-[12px] font-bold text-white py-1 bg-slate-400 top-11 -left-3 group-hover:visible opacity-100 absolute text-center">
				ツイートする
			  </span>
			  <span className="hidden lg:inline">ツイートする</span>
			</button>
		  )}
		</div>
		<div className="mt-20 px-2 pb-8">
			{/* <div className="mt-2 h-14 w-14 rounded-full object-cover">
			<Image
			layout="fill"
			src={session?.user?.image ?? "/no_image.svg"}	
		  />
			</div> */}
		  <span className="inline font-bold rounded-full px-2 py-4 text-ellipsis overflow-hidden whitespace-nowrap">
			{session?.user?.name ?? ""}
		  </span>
		</div>
	  </div>
	);
  }
  
  export default Sidebar;