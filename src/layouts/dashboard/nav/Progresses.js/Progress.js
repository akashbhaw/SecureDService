import { Typography } from "@mui/material";

export default function Progress(){
    return (
        <div className="progress_bar">
        <progress size="tiny" value="1000" max="5000" style={{height:'10px'}} />
        <Typography>1 GB  of 5 GB used</Typography>
        
    </div>
    );
}

