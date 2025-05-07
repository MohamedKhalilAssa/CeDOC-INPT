import { FC } from "react";
import { Link } from "react-router-dom";

interface FooterLinkProps {
  path: string;
  label: string;
}

const FooterLink: FC<FooterLinkProps> = ({ path, label }) => (
  <li>
    <Link
      to={path}
      className="hover:text-white transition duration-300 text-sm"
    >
      {label}
    </Link>
  </li>
);

export default FooterLink;
