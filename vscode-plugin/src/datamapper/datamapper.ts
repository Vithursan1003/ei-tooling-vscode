import { readdirSync } from "fs";
import { join } from "path";
import { Disposable, Webview, WebviewPanel, window, ViewColumn, Uri } from "vscode";
import * as vscode from 'vscode';

export default class dataMapper {
    public static currentPanel: dataMapper | undefined;
    private readonly _panel: WebviewPanel;
    private _disposables: Disposable[] = [];
    private readonly _extensionPath: string;

    private constructor(panel: WebviewPanel, extensionPath: string) {
        this._panel = panel;
        this._extensionPath = extensionPath;

        // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
        // the panel or when the panel is closed programmatically)
        this._panel.onDidDispose(this.dispose, null, this._disposables);

        // Set the HTML content for the webview panel
        this._panel.webview.html = this._getWebviewContent(this._panel.webview);

        // Set an event listener to listen for messages passed from the webview context
        this._setWebviewMessageListener();

        //refreshing the webview
        this._panel.webview.postMessage({ type: 'refresh' });
    }

    public static render(extensionPath: string) {
        if (dataMapper.currentPanel) {
            // If the webview panel already exists reveal it
            dataMapper.currentPanel._panel.reveal(ViewColumn.One);
        } else {
            // If a webview panel does not already exist create and show a new one
            const panel = window.createWebviewPanel(
                // Panel view type
                "OpenDataMapperView",
                // Panel title
                "Data Mapper View",
                // The editor column the panel should be displayed in
                ViewColumn.One,
                // Extra panel configurations
                {
                    // Enable JavaScript in the webview
                    enableScripts: true,
                }
            );

            dataMapper.currentPanel = new dataMapper(panel, extensionPath);
        }
    }

    public dispose() {
        dataMapper.currentPanel = undefined;

        // Dispose of the current webview panel
        this._panel.dispose();

        // Dispose of all disposables (i.e. commands) for the current webview panel
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }

    private _getWebviewContent(webview: any) {

        const buildPath = join(this._extensionPath, 'webviews', 'build', 'static');

        const cssFile = readdirSync(join(buildPath, 'css')).find(file => file.endsWith('.css'));
        const jsFile = readdirSync(join(buildPath, 'js')).filter(file => file.startsWith('main.') && file.endsWith('.js'))[0];

        if (!cssFile || !jsFile) {
            throw new Error('Could not find CSS or JS file in build directory');
        }

        const stylesUri = Uri.file(join(buildPath, 'css', cssFile)).with({ scheme: 'file' });
        const scriptUri = Uri.file(join(buildPath, 'js', jsFile)).with({ scheme: 'file' });

        const styles = webview.asWebviewUri(stylesUri);
        const script = webview.asWebviewUri(scriptUri);

        this._panel.webview.postMessage({ vscode })

        //<meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src vscode-resource: https: http:; script-src vscode-resource: https: http: 'unsafe-inline';">
        // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
        return /*html*/ `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
            <meta name="theme-color" content="#000000">
            <link rel="stylesheet" type="text/css" href="${styles}">
            <title>Data Mapper View</title>
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
          
            <script> window.vscode = acquireVsCodeApi();</script>
            <script src="${script}"></script>
          </body>
        </html>
      `;
    }

    private _setWebviewMessageListener() {
        this._panel.webview.onDidReceiveMessage(
            (message: any) => {
                const command = message.command;
                const text = message.text;

                if(command === "hello"){
                    window.showInformationMessage(text);
                }
                // switch (command) {
                //     case "hello":
                //         // Code that should run in response to the hello message command
                //         {
                //             window.showErrorMessage(text);
                //             break;
                //         }
                //         // case "reload": {
                //         //     webview.html = this._getWebviewContent(this._panel.webview);
                //         //     break;
                //         // }

                //         return;
                //     // Add more switch case statements here as more webview message commands
                //     // are created within the webview context (i.e. inside media/main.js)
                // }
            },
            undefined,
            this._disposables
        );
    }
}
