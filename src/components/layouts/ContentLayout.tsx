import { type FC } from "react";

interface Props {
  children: React.ReactNode;
}

const ContentLayout: FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto mb-32 mt-12 flex w-3/4 flex-col">{children}</div>
  );
};

export default ContentLayout;
