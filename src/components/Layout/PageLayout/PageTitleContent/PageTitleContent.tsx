import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const PageTitleContent = (props) => {
  const [pageTitleContent, setPageTitleContent] = useState(document && document.getElementById("page-title-content"));
  useEffect(() => {
    if (!pageTitleContent) {
      setPageTitleContent(document && document.getElementById("page-title-content"));
    }
  }, []);

  return pageTitleContent ? ReactDOM.createPortal(props.children, pageTitleContent) : null;
};
