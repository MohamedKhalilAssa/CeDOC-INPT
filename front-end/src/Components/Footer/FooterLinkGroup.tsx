import { FC, ReactNode } from "react";

interface FooterLinkGroupProps {
  title: string;
  children: ReactNode;
}

const FooterLinkGroup: FC<FooterLinkGroupProps> = ({ title, children }) => (
  <div>
    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
      {title}
    </h4>
    <ul className="space-y-2">{children}</ul>
  </div>
);

export default FooterLinkGroup;
