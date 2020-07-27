import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 500,
        color: '#ffffff',
    },
}))


const Loader = (props) => {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={props.loading ? props.loading : false}>
            <CircularProgress color="secondary" />
        </Backdrop>
    )
}

export default Loader