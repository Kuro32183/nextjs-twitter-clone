import { ReactElement, SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGElement>) => ReactElement;
  title: string;
  onClick?: () => {};
}

function SidebarIcons({ Icon, title, onClick }: Props) {
	return (
	  <div
		onClick={() => onClick?.()}
		className="group flex max-w-fit cursor-pointer items-center space-x-2 rounded-full px-4 py-4 transition-all duration-200 hover:bg-gray-50 relative"
	  >
		<Icon className="h-6 w-6" />
		<span
		  className="lg:hidden invisible w-[74px] rounded text-[12px] 
			font-bold text-white py-1 bg-slate-400 top-11 -left-3
			 group-hover:visible opacity-100 absolute text-center"
		>
		  {title}
		</span>
		<p className="hidden text-base font-light group-hover:text-twitter lg:inline-flex lg:text-xl">
		  {title}
		</p>
	  </div>
	);
  }

export default SidebarIcons;