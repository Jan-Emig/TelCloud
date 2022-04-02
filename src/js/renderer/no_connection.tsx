import React, { FC } from 'react';

/**
 * 
 * Main overlay at the startup of the app if
 * no internet connection could be detected.
 * 
 **/
const NoConnection: FC = () => {

    const render = () => {
        return (
            <>No connection!</>
        );
    }

    return render();
}