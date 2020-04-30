import {Button, Link, Theme, withStyles} from "@material-ui/core";

export const ColorButton = withStyles((theme: Theme) => ({
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


export const CustomLink = withStyles((theme: Theme) => ({
    root: {
        color: "#2F80ED",
    },
}))(Link);