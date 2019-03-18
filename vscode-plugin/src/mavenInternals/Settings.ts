// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { Uri, workspace } from "vscode";

export namespace Settings {
    // export function excludedFolders(resource: Uri): string[] {
    //     return _getMavenSection("excludedFolders", resource);
    // }

    // export function viewType(): string {
    //     return _getMavenSection("view");
    // }

    // export function changeToFlatView(): void {
    //     workspace.getConfiguration().update("maven.view", "flat", false);
    // }

    // export function changeToHierarchicalView(): void {
    //     workspace.getConfiguration().update("maven.view", "hierarchical", false);
    // }

    export namespace External {
        export function javaHome(): string | undefined{
            return workspace.getConfiguration("java").get<string>("home");
        }

        export function defaultWindowsShell(): string | undefined{
            return workspace.getConfiguration("terminal").get<string>("integrated.shell.windows");
        }
    }

    export namespace Terminal {
        export function useJavaHome(): boolean | undefined {
            return _getMavenSection("terminal.useJavaHome");
        }

        export function customEnv(): {
            environmentVariable: string;
            value: string;
        }[] | undefined{
            return _getMavenSection("terminal.customEnv");
        }

        export function favorites(resource: Uri): {alias: string; command: string}[] | undefined {
            return _getMavenSection("terminal.favorites", resource);
        }
    }
    // export namespace Executable {
    //     export function path(resource: Uri | null ): string {
    //         return _getMavenSection("executable.path", resource);
    //     }
    //     export function options(resource: Uri): string {
    //         return _getMavenSection("executable.options", resource);
    //     }
    //     export function preferMavenWrapper(resource?: Uri): boolean {
    //         return _getMavenSection("executable.preferMavenWrapper", resource);
    //     }
    // }

    function _getMavenSection<T>(section: string, resource?: Uri): T | undefined{
        return workspace.getConfiguration("maven", resource).get<T>(section);
    }

    export function getEnvironment(): {} {
        const customEnv: any = _getJavaHomeEnvIfAvailable();
        type EnvironmentSetting = {
            environmentVariable: string;
            value: string;
        };
        const environmentSettings: EnvironmentSetting[] | undefined = Terminal.customEnv();

        if(typeof environmentSettings !== "undefined") {
            environmentSettings.forEach((s: EnvironmentSetting) => {
                customEnv[s.environmentVariable] = s.value;
            });
        }
        return customEnv;
    }

    function _getJavaHomeEnvIfAvailable(): {} {
        // Look for the java.home setting from the redhat.java extension.  We can reuse it
        // if it exists to avoid making the user configure it in two places.
        const javaHome: string | undefined= External.javaHome();
        const useJavaHome: boolean | undefined= Terminal.useJavaHome();
        if (useJavaHome && javaHome) {
            return { JAVA_HOME: javaHome };
        } else {
            return {};
        }
    }
}
