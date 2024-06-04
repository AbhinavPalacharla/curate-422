/*
IconPicker.tsx
AUTHORS: NA, FC, VD, RK, AP
LAST EDITED: 6-3-2024
DESCRIPTION: IconPicker.tsx: Describes the "IconPicker" component which allows a user to choose an icon
*/

import { Roboto_Mono } from "next/font/google";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { getIconByName, IconName, iconNames } from "@/utils";

// Imports the Roboto Mono font
const robotoMono = Roboto_Mono({
  weight: "variable",
  subsets: ["latin"],
});

// Describes a React Functional Component called IconPicker
const IconPicker: React.FC<{
  children: React.ReactNode;
  setIcon: (iconName: IconName) => void;
}> = ({ children, setIcon }) => {
  return (
    <div className="flex flex-row items-center gap-x-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="ring-0 outline-none">
          {children}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={10}
            align="start"
            className="border-[1px] border-[#282828] bg-black/[0.5] shadow-md shadow-black/80 backdrop-blur-md flex flex-wrap h-52 w-[15.2rem] overflow-y-scroll p-3 rounded-md scrollbar-hide"
          >
            {iconNames.map((iconName) => {
              console.log(iconName);
              return (
                <DropdownMenu.Item
                  key={iconName}
                  className="hover:ring-0 hover:outline-none ring-0 outline-none"
                  onClick={() => {
                    setIcon(iconName);
                  }}
                >
                  {getIconByName({
                    name: iconName as IconName,
                    css: "lg:hover:text-white active:text-white p-2 lg:hover:bg-[#282828] active:bg-[#282828] border-[0.1px] border-[#141414] rounded-md",
                    size: 36,
                  })}
                </DropdownMenu.Item>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export { IconPicker };
