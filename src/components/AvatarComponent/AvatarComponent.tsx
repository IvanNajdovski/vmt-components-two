//@ts-nocheck
import React from "react";
import { Avatar } from "@progress/kendo-react-layout";

export const AvatarComponent = (props) => {
  const { size, shape, icon, theme, width, height } = props;

  return (
    <Avatar type="icon" themeColor={theme} size={size} shape={shape} style={{ width, height }}>
      <span className={icon} />
    </Avatar>
  );
};
