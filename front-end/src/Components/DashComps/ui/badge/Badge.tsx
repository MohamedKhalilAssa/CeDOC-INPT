type BadgeVariant = "light" | "solid";
type BadgeSize = "sm" | "md";
type BadgeColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface BadgeProps {
  variant?: BadgeVariant; // Light or solid variant
  size?: BadgeSize; // Badge size
  color?: BadgeColor; // Badge color
  startIcon?: React.ReactNode; // Icon at the start
  endIcon?: React.ReactNode; // Icon at the end
  children: React.ReactNode; // Badge content
}

const Badge: React.FC<BadgeProps> = ({
  variant = "light",
  color = "primary",
  size = "md",
  startIcon,
  endIcon,
  children,
}) => {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium";

  // Define size styles
  const sizeStyles = {
    sm: "text-theme-xs", // Smaller padding and font size
    md: "text-sm", // Default padding and font size
  };
  // Define color styles for variants using actual Tailwind CSS classes
  const variants = {
    light: {
      primary:
        "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      success:
        "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      error: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
      warning:
        "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
      info: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400",
      light: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      dark: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    },
    solid: {
      primary: "bg-blue-600 text-white dark:bg-blue-500",
      success: "bg-green-600 text-white dark:bg-green-500",
      error: "bg-red-600 text-white dark:bg-red-500",
      warning: "bg-yellow-500 text-white dark:bg-yellow-400 dark:text-gray-900",
      info: "bg-cyan-600 text-white dark:bg-cyan-500",
      light: "bg-gray-400 text-white dark:bg-gray-600",
      dark: "bg-gray-800 text-white dark:bg-gray-700",
    },
  };

  // Get styles based on size and color variant
  const sizeClass = sizeStyles[size];
  const colorStyles = variants[variant][color];

  return (
    <span className={`${baseStyles} ${sizeClass} ${colorStyles}`}>
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </span>
  );
};

export default Badge;
