import * as _vscode from "vscode";

declare global {
  const tsvscode: {
    postMessage: ({ command: string, text: any }) => void;
    getState: () => any;
    setState: (state: any) => void;
  }
  const apiBaseUrl: string;
}