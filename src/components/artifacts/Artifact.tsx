import Image from "next/image";
import Link from "next/link";
import type { ArtifactMedia } from "@prisma/client";
import { PostMetaInfo } from "./PostMetaInfo";

const Artifact: React.FC<{
  media: Array<ArtifactMedia>;
  description: string;
  createdAt: Date;
}> = ({ media, description, createdAt }) => {
  return (
    <div className="border-[#292929] border-[1px] rounded-lg lg:rounded-md p-2 lg:p-4 lg:pb-6 mb-4">
      {media && (
        <>
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
              {media.map((media) => (
                <Image
                  key={media.imageURL}
                  alt={"Image"}
                  src={media.imageURL}
                  width={4096}
                  height={4096}
                  className="h-96 max-w-none w-auto rounded-sm"
                />
              ))}
            </div>
          )}
        </>
      )}
      <h1 className="text-white pt-4">{description}</h1>
      <PostMetaInfo date={createdAt} />
    </div>
  );
};

export { Artifact };
