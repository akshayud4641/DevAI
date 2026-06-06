import * as vscode from 'vscode';
const fetch = require('node-fetch');

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('devai.askAI', async () => {

        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage("No editor open");
            return;
        }

        const selectedText = editor.document.getText(editor.selection);

        if (!selectedText) {
            vscode.window.showWarningMessage("Select code first!");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/ask_ai?requirement=${encodeURIComponent(selectedText)}`, {
                method: 'GET'
            });
            const data = await response.json();

            vscode.window.showInformationMessage(data.response || "No response");

        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage("Error calling DevAI API");
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}