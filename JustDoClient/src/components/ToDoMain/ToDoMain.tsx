import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import {Button, Theme, withStyles} from "@material-ui/core";

const ColorButton = withStyles((theme: Theme) => ({
    root: {
        borderRadius: 26,
        fontSize: 16,
        textTransform: "none",
        fontFamily: "SFProDisplayMedium",
        background:
            "transparent linear-gradient(238deg, #2F80ED 0%, #56CCF2 100%) 0% 0% no-repeat padding-box",
        "&:hover": {
            backgroundColor: "#56CCF2",
        },
    },
}))(Button);

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