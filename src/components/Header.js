import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        boxShadow: '2px 2px 4px 2px #00000033',
        height: '50px',
        backgroundColor: '#eaeaea'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    legend: {
        display: "inline-block",
        padding: "0px 20px 0px 0px"
    },
    chartSubTile: {
        fontSize: "1rem",
        fontWeight: 400
    },
    divider: {
        borderLeft: '1px solid #cacaca',
        height: '30px',
        position: 'absolute',
        top: '10px',
        right: '8%'
    },
    backButton: {
        padding: `0px 10px`,
        alignItems: 'center',
        cursor: 'pointer'
    }
}));
export default function Header(props) {
    // console.log(props);
    const classes = useStyles();
    const refresh = () => {
        props.setRefresh(true)
    }
    const home = () => {
        props.setHome(true)
    }
    return (
        <Grid container className={classes.root} direction="row" justify="space-between" alignItems="center">
            <Grid item xs={1} style={{ textAlign: 'center', }}>
                {props.history?.path ?
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => {
                        props.handleBack();
                    }}>
                        <ArrowBackIcon />
                    </IconButton>
                    :
                    null
                }
            </Grid>
            <Grid item xs={7} style={{ textAlign: 'left', padding: 10 }}>

                <Typography color="inherit">
                    {props?.history?.path || props.breadcrumb()}
                </Typography>
            </Grid>

            <Grid item xs={4} style={{ textAlign: 'right' }}>
                {/* <Typography component="div" className={classes.legend}>
                    <Typography component="span" className={classes.chartSubTile}>6GB</Typography>{` / `}
                    <Typography component="span" className={classes.chartSubTile}>12GB</Typography>
                </Typography> */}
                {/* <Divider flexItem orientation="vertical" /> */}
                <span className={classes.divider}>

                </span>
                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => {
                    refresh()
                }}>
                    <RefreshIcon />
                </IconButton> */}
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => {
                    home()
                }}>
                    <HomeIcon />
                </IconButton>

            </Grid>
        </Grid >
    )
} 