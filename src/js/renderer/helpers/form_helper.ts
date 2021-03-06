import { KeyboardEvent } from 'react';

export default class FormHelper {
    public static handleFormKeySubmit(
        e: KeyboardEvent<HTMLInputElement>,
        callback: {(e: KeyboardEvent<HTMLInputElement>): void }
    ) {
        if (e.key == 'Enter') callback(e);
    }
}