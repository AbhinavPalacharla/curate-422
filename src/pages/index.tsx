import type { NextPageWithLayout } from "@/components/layout";

const Page: NextPageWithLayout = (props: any) => {
  return (
    <div>
      <h1 className="text-red-400">Hello World</h1>
    </div>
  );
};

Page.navbar = true;
Page.footer = true;

export default Page;
