import React from "react";

export interface RouterConfigItem {
  title?: string;
  path: string;
  ignoreLogin?: boolean;
  component:
    | React.LazyExoticComponent<any>
    | React.ComponentType;
}

const routerConfig: RouterConfigItem[] = [];
let importAllRouter = (file: any) => {
  file.keys().forEach((key: any) => routerConfig.push(...file(key).default));
};
importAllRouter(require.context("./", false, /\.router\.ts$/));

export default routerConfig;
