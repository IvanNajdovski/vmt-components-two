import { RouteInterface } from "./Routes.interface";

export interface SideDrawerInterface {
  expanded?: boolean;
  breadcrumbs: boolean;
  children: any;
  routes: RouteInterface[];
  userPermissions?: string[];
  userManualLinks?: any;
}
