import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider(`my-debugger-type`, {
		resolveDebugConfiguration: async (workspaceFolder: vscode.WorkspaceFolder | undefined, debugConfiguration: vscode.DebugConfiguration): Promise<vscode.DebugConfiguration> => {
			// This matches exactly the launch configuration declared in the launch.json of test-project.
			const newDebugConfiguration = {
				"type": "node",
				"request": "launch",
				"name": "WORKING - Launch Program",
				"program": "${workspaceFolder}/app.js",
				"skipFiles": [
					"<node_internals>/**"
				]
			};

			// Not working: debug never starts.
			return newDebugConfiguration;

			// Working mitigation fix: start the debug session manually.
			await vscode.debug.startDebugging(workspaceFolder, newDebugConfiguration);
			return null;
		}
	}));
}

export function deactivate() {}
