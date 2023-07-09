import React from "react";
import { useSelector } from "react-redux";
import useStyles from "isomorphic-style-loader/useStyles";
import s from "./Header.less";

export default function Header() {
  useStyles(s);
  const state = useSelector((state) => state.demo) || {};
  return <div className={s.containerHeader}>hello {state.name}</div>;
}