import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import '~/utils/flex'
import './common/base.less';

const root = createRoot(document.getElementById("root"));
root.render(<App />);
