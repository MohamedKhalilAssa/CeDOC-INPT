import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type JSX } from "react";
import { Link } from "react-router-dom";

type DropdownItem =
  | { type: "button"; label: string; color: string; onClick: () => void }
  | { type: "link"; label: string; to: string }
  // | { type: "button-link"; label: string; to: string }
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
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="truncate max-w-44 px-4 py-2 cursor-pointer rounded-lg  bg-gradient-to-r from-blue-600 to-blue-800  hover:opacity-90 text-white font-semibold shadow hover:shadow-lg transition"
      >
        {triggerLabel}
      </button>

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
                        className={`w-[90%] cursor-pointer px-4 py-2 text-sm text-white bg-${item.color}-600 hover:bg-${item.color}-700 rounded-lg transition mx-auto`}
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
