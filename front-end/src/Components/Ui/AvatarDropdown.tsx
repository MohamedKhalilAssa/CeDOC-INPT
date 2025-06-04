import Avatar from "@mui/material/Avatar";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type JSX } from "react";
import { Link } from "react-router-dom";

const colorMap = {
  red: "bg-red-600 hover:bg-red-800",
  green: "bg-green-600 hover:bg-green-800",
  blue: "bg-blue-600 hover:bg-blue-800",
  yellow: "bg-yellow-600 hover:bg-yellow-800",
} as const;

type ColorKey = keyof typeof colorMap;

type DropdownItem =
  | { type: "button"; label: string; color: ColorKey; onClick: () => void }
  | { type: "link"; label: string; to: string }
  | { type: "custom"; element: JSX.Element };

interface DropdownProps {
  items: DropdownItem[];
  triggerLabel?: string;
  align?: "left" | "right";
}
const AvatarDropdown = ({
  items,
  triggerLabel = "Menu",
  align = "right",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownPosition = align === "right" ? "right-0" : "left-0";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Avatar
        onClick={() => setIsOpen((prev) => !prev)}
        className="truncate max-w-52 px-5 py-3 cursor-pointer rounded-lg  bg-gradient-to-r from-blue-600 to-blue-800  hover:opacity-90 text-white font-semibold shadow hover:shadow-lg transition"
      >
        {triggerLabel.substring(0, 2).toUpperCase()}
      </Avatar>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${dropdownPosition} mt-2 w-56 origin-top rounded-xl bg-white shadow-xl ring-1 ring-black/5 z-50 `}
          >
            <div className="py-2 space-y-1 flex flex-col items-center">
              {items.map((item, idx) => {
                switch (item.type) {
                  case "link":
                    return (
                      <Link
                        key={idx}
                        to={item.to}
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-600 rounded-lg transition"
                      >
                        {item.label}
                      </Link>
                    );
                  case "button":
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          item.onClick();
                          setIsOpen(false);
                        }}
                        className={`w-[90%] cursor-pointer px-4 py-2 text-sm text-white ${
                          colorMap[item.color] ||
                          "bg-gray-600 hover:bg-gray-800"
                        } rounded-lg transition mx-auto`}
                      >
                        {item.label}
                      </button>
                    );

                  case "custom":
                    return (
                      <div key={idx} onClick={() => setIsOpen(false)}>
                        {item.element}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarDropdown;
