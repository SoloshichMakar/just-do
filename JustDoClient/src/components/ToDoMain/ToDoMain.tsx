import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import {ColorButton} from "../style/CustomElements";

const ToDomain = ({}) => {

    const history = useHistory();

    if (localStorage.token === "" || localStorage.token === undefined) {
        return <Redirect to="/login" />;
    }

    function logout() {
        localStorage.setItem("token", "");
        history.push("/login");
    }

    return(<div>
        <ColorButton id="color_button" variant="contained" color="primary" onClick={()=>logout()}>
            log out
        </ColorButton>
    </div>);
};

export default ToDomain;