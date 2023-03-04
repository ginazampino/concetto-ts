import { ipcRenderer } from 'electron';

type command = string;

window.addEventListener('DOMContentLoaded', () => {
    function invokeCommand(string: command) {
        document.getElementById(string)?.addEventListener('click', () => {
            ipcRenderer.invoke(string);
        });
    }
});
