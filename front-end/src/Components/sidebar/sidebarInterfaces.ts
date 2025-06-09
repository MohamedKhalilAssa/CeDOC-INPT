/**
 * Interface definitions for sidebar components
 */

export interface NavItemConfig {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

export interface NavItemProps {
  item: NavItemConfig;
}

export interface NavigationSection {
  title?: string;
  items: NavItemConfig[];
}

export interface BrandingConfig {
  logo: string;
  logoAlt: string;
  title: string;
  homeLink: string;
}

export interface FooterStatus {
  color: string;
  text: string;
}

export interface FooterConfig {
  text: string;
  status?: FooterStatus;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  branding: BrandingConfig;
  navigationSections?: NavigationSection[];
  footer?: FooterConfig;
}
