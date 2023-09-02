import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { AlertColor } from '@mui/material/Alert/Alert';
type AlertProps= {
    type?: AlertColor;
    title: string;
    desc?: string;
}

const AlertDialog:React.FC<AlertProps> = ({
    type = "info",
    title="",
    desc ="",
})=> {
    return (
        <Alert  variant="outlined" severity={type}>
            {title}
        </Alert>
    );
}

export default AlertDialog;