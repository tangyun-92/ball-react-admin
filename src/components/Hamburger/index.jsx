import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Icon } from "antd";
import { toggleSiderBar } from "@/store/app/actionCreators"

import "./index.less";
const Hamburger = () => {

  const { sidebarCollapsed } = useSelector(
    (state) => ({
      sidebarCollapsed: state.settings.get('sidebarCollapsed')
    }),
    shallowEqual
  )

  // const { sidebarCollapsed, toggleSiderBar } = props;
  return (
    <div className="hamburger-container">
      <Icon
        type={sidebarCollapsed ? "menu-unfold" : "menu-fold"}
        onClick={toggleSiderBar}
      />
    </div>
  );
};

export default Hamburger
