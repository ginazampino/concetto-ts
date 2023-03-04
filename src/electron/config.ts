import Store from 'electron-store';

const configStore = new Store();

export type WindowPosition = { x: number; y: number };
export type WindowSize = [number, number]; // [width, height]

export const windowConfig = {
    /*

        Get the window's x and y coordinates
        from Electron's generated config.json file
        in the %AppData% directory.

        If there are no stored coordinates, 
        do nothing (center).

    */

    getWindowPosition() {
        return configStore.get('windowPosition') ?? undefined;
    },

    /*

        Used within Electron's main.js file, 
        which watches the window for moved events,
        and provides an array of x and y coordinates,
        which are integers.

        When called, saves the new array to 
        the config.json file, overwriting the 
        previous array.

    */

    setWindowPosition(newPosition: WindowPosition) {
        configStore.set('windowPosition', newPosition);
    },

    /*

        Get the window's height and width from
        Electron's generated config.json file
        in the %AppData% directory.

        If there's no stored size, set the size
        to the default value (1024 x 768).

    */

    getWindowSize(): WindowSize {
        const defaultSize: WindowSize = [1024, 768];
        const storedSize = configStore.get('windowSize') ?? defaultSize;

        configStore.set('windowSize', storedSize);

        return storedSize as WindowSize;
    },

    /*

        Used within Electron's main.js file, 
        which watches the window for resize events,
        and provides a new value (window size).

        When called, saves the new size to the 
        config.json file, overwriting the previous size.

    */

    setWindowSize(newSize: WindowSize): void {
        configStore.set('windowSize', newSize);
    },

    /*

        Get the (un)maximized state from
        Electron's generated config.json file
        in the %AppData% directory.

        If no stored value, set the value to the 
        default value of false (unmaximized).

    */

    getMaximizedState(): boolean {
        const defaultState = false;
        const storedState = configStore.get('maximizedState');

        if (typeof storedState === 'boolean') return storedState;

        configStore.set('maximizedState', defaultState);

        return defaultState;
    },

    /*

        Used within Electron's main.js file, 
        which watches the window for maximize
        and unmaximize events, and provides
        a new value (boolean).

        When called, saves the new state to the 
        config.json file, overwriting the previous state.

    */

    setMaximizedState(newState: boolean): void {
        configStore.set('maximizedState', newState);
    },
};
