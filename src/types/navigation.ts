export interface NavigationItem { label: string; href: string }
export interface NavigationGroup extends NavigationItem { children: readonly NavigationItem[] }
export type HeaderNavigationItem = NavigationItem | NavigationGroup;
