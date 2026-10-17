export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop Parts" },
  { href: "/models", label: "Motorcycle Models" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
