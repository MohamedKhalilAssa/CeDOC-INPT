// components/Dropdown.tsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type DropdownItem = {
  type: "link" | "button";
  label: string;
  to?: string;
  onClick?: () => void;
};

export const Dropdown = ({
  triggerLabel,
  items,
}: {
  triggerLabel: string;
  items: DropdownItem[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 font-medium text-sm cursor-pointer"
      >
        {triggerLabel}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg py-1 z-50">
          {items.map((item, index) =>
            item.type === "link" ? (
              <Link
                key={index}
                to={item.to || "#"}
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 "
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={index}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 "
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};
