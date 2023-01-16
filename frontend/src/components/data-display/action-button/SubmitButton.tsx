import { Button } from "@mui/material";
import React from "react";
import LoadingBox from "../../LoadingBox";

export interface SubmitButtonProps {
    disabled: boolean;
    text: string;
}

const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({ disabled, text }: SubmitButtonProps) => {
    return (
        <Button
            type={"submit"}
            color={"secondary"}
            variant="contained"
            sx={{ py: 1, px: 4, fontWeight: 600, alignSelf: "baseline" }}
            disabled={disabled}
        >
            {disabled ? <LoadingBox /> : text}
        </Button>
    );
};

export default SubmitButton;
