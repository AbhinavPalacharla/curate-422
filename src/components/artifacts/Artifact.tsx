import Image from "next/image";
import Link from "next/link";
import type { ArtifactMedia } from "@prisma/client";
import { PostMetaInfo } from "./PostMetaInfo";
import { Dropdown } from "../shared/Dropdown";
import { getIconByName } from "@/utils";

const Artifact: React.FC<{
  media: Array<ArtifactMedia>;
  description: string;
  createdAt: Date;
}> = ({ media, description, createdAt }) => {
  media = Array(3).fill(media[0]);
  return (
    <div className="border-[#292929] border-[1px] rounded-lg lg:rounded-md p-2 lg:p-4 lg:pb-6 mb-4">
      <Dropdown
        items={[
          {
            name: "Move to ...",
            icon: getIconByName({ name: "ArrowRightCircle" }),
          },
          { name: "Copy to ...", icon: getIconByName({ name: "Copy" }) },
          // { name: "Delete", icon: getIconByName({ name: "Trash" }) },
        ]}
        action={{ name: "Delete", onClick: () => {} }}
      >
        <button
          className={`text-[#969696] hover:text-white tracking-wide border-[1px] border-[#282828] w-7 h-7 rounded-md ring-0 outline-none select-none`}
        >
          ···
        </button>
      </Dropdown>
      {media && (
        <div className="pt-4">
          {media.length === 1 ? (
            <div className="flex flex-row items-center justify-center">
              <Image
                key={media[0].imageURL}
                alt={"Image"}
                src={media[0].imageURL}
                width={4096}
                height={4096}
                className="rounded-sm max-w-[100%] lg:min-h-[24rem] max-h-[36rem] w-auto"
              />
            </div>
          ) : (
            <div className="flex flex-row overflow-x-scroll scroll-smooth gap-x-4 scrollbar-hide">
              {media.map((m) => (
                <Image
                  key={m.imageURL}
                  alt={"Image"}
                  src={m.imageURL}
                  width={4096}
                  height={4096}
                  className="h-96 max-w-none w-auto rounded-sm"
                />
              ))}
            </div>
          )}
        </div>
      )}
      <h1 className="text-white pt-4">{description}</h1>
      <PostMetaInfo date={createdAt} />
    </div>
  );
};

export { Artifact };
