/* eslint-disable @typescript-eslint/no-explicit-any */
export type IMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse = {
  data: any;
  meta?: IMeta;
};

export interface JwtPayload {
  user: string; // No undefined allowed
  email: string;
  role: string;
  profilePhotoUrl?: string;
  phoneNumber: string;
  name?: string;
}

// types/sidebar.type.ts
export interface SidebarRoute {
  href: string;
  label: string;
  icon?: React.ComponentType; // Optional icon component
}

export type SidebarRoutes = SidebarRoute[];
