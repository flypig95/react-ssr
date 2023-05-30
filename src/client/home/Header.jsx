import React from "react";
import useStyles from "isomorphic-style-loader/useStyles";
import s from "./Header.less";

export default function Header() {
  useStyles(s);
  return <div className={s.containerHeader}>123</div>;
}