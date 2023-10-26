import path from "path";
import pkg from "../package.json";

const deployEnv = process.env.DEPLOY_ENV; // test、prd

export const getOutputDir = () => {
  const outputPath = {
    test: `t-dist/${pkg.name}/`,
    prd: `dist/${pkg.name}/`,
  };
  return path.resolve(process.cwd(), outputPath[deployEnv]);
};
