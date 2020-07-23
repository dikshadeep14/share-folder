import React from "react";
import moment from "moment";
import { Grid, Typography, Icon, makeStyles } from "@material-ui/core";
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import {font} from "./Misc";

const useStyle=makeStyles({
  root: {
    padding: '10px'
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `35px`,
    border: `1px solid grey`,
    backgroundColor: `grey`,
    height: `35px`,
    borderRadius: `24px`,
  },
  iconColor: {
    color: '#FFF'
  },
  deleteColor: {
    color: 'grey'
  },
  name: {
    padding: '0px 20px',
    fontSize: font.md
  },
  timeS: {
    padding: '0px 20px',
    fontSize: font.sm,
    color: 'grey'
  }
})

export default function ListCard (props) {
  const classes = useStyle();
  return(
    <Grid item xs={12} className={classes.root} container direction="row" justify="space-between">
      <Grid item xs={6} sm={8} md={10} container direction="row">

        <Icon className={classes.iconBox}>
          <FolderIcon className={classes.iconColor} />
        </Icon>
        <Grid>
          <Typography className={classes.name} align="left">
            {props.name}
          </Typography>
          <Typography align="left" className={classes.timeS}>{moment(props.time).format('DD MMM YYYY HH:MM')}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={6} sm={4} md={2} container justify="flex-end">
        <DeleteIcon className={classes.deleteColor} />
      </Grid>
    </Grid>
  )
}
