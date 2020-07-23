import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Grid } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import HomeIcon from '@material-ui/icons/Home';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        boxShadow: '2px 2px 4px 2px',
        height: '50px',
        backgroundColor: '#eaeaea'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
export default function Header() {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} direction="row" alignItems="center" alignContent="space-between" justify="space-between">
            <Grid item xs={6} style={{ textAlign: 'left', paddingLeft: 20 }}>
                <Typography variant="h6" color="inherit">
                    Photos
    </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
                <Divider flexItem orientation="vertical" />
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <RefreshIcon />
                </IconButton>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <HomeIcon />
                </IconButton>

            </Grid>
        </Grid>
    )
} 