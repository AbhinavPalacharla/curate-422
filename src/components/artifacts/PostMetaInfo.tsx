/*
PostMetaInfo.tsx
AUTHORS: NA, FC, VD, RK, AP
LAST EDITED: 6-3-2024
DESCRIPTION: PostMetaInfo.tsx: This is used to display and format strings
*/

import { Roboto_Mono } from "next/font/google";
import { Dropdown } from "@/components/shared/Dropdown";
import { getIconByName } from "@/utils";

// Imports the Roboto Mono font
const robotoMono = Roboto_Mono({
  weight: "variable",
  subsets: ["latin"],
});

// Defines the React Function Component PostMetaInfo 
const PostMetaInfo: React.FC<{
  date: Date;
}> = ({ date }) => {
  return (
    <div className="flex flex-row items-center justify-between pt-4 lg:pt-8 pb-2 lg:pb-0">
      <h1
        className={`${robotoMono.className} font-light text-sm text-[#969696] tracking-wide pl-1 lg:pl-0`}
      >
        {new Date(date).toLocaleDateString().replaceAll("/", ".")}
      </h1>
      {/* <Dropdown
        items={[
          {
            name: "Move to ...",
            icon: getIconByName({ name: "ArrowRightCircle" }),
          },
          { name: "Copy to ...", icon: getIconByName({ name: "Copy" }) },
          { name: "Delete", icon: getIconByName({ name: "Trash" }) },
        ]}
      >
        <button
          className={`text-[#969696] hover:text-white tracking-wide border-[1px] border-[#282828] w-7 h-7 rounded-md`}
        >
          ···
        </button>
      </Dropdown> */}
    </div>
  );
};

export { PostMetaInfo };
