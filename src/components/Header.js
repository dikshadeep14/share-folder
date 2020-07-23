import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import HomeIcon from '@material-ui/icons/Home';
import { Divider } from '@material-ui/core';

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
}));
export default function Header(props) {
    const classes = useStyles();
    const refresh = () => {
        props.setRefresh(true)
    }
    const home = () => {
        props.setHome(true)
    }
    return (
        <Grid container className={classes.root} direction="row" justify="space-between" alignItems="center">
            <Grid item xs={8} style={{ textAlign: 'left', padding: 10 }}>
                <Typography variant="h6" color="inherit">
                    Photos
    </Typography>
            </Grid>

            <Grid item xs={4} style={{ textAlign: 'right' }}>
                <Typography component="div" className={classes.legend}>
                    <Typography component="span" className={classes.chartSubTile}>6GB</Typography>{` / `}
                    <Typography component="span" className={classes.chartSubTile}>12GB</Typography>
                </Typography>
                {/* <Divider flexItem orientation="vertical" /> */}
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <span onClick={() => {
                        refresh()
                    }}>
                        <RefreshIcon />
                    </span>
                </IconButton>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <span onClick={() => {
                        home()
                    }}>
                        <HomeIcon />
                    </span>
                </IconButton>

            </Grid>
        </Grid >
    )
} 