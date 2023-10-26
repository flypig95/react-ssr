import React from "react";
import { useSelector } from "react-redux";
import "./Header.less";

export default function Header() {
  const state = useSelector((state) => state.demo) || {};
  return <div className="container-header">hello {state.name}</div>;
}
