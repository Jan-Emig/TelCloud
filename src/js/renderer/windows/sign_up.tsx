import React, { FC } from "react";
import ReactDOM from "react-dom";


const SignUp: FC = () => {

    const render = () => {
        return (
            <>
                <h1>Hello world!</h1>
            </>
        );
    }

    return render();
}

ReactDOM.render(<SignUp />, document.getElementById('app'));