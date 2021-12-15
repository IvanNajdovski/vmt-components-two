export interface RouteInterface {
  text?: string;
  icon?: string;
  id?: number;
  parentId?: number;
  "data-expanded"?: boolean;
  route?: string;
  separator?: boolean;
  permissions?: string[];
}

export interface SeparatorInterface {
  separator: boolean;
}
