import React from "react";
import moment from "moment";
import { Grid, Typography, Icon, makeStyles } from "@material-ui/core";
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { font, fontColor } from "./Misc";

const useStyle = makeStyles({
  root: {
    padding: '10px'
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `35px`,
    border: `1px solid ${fontColor.grey}`,
    backgroundColor: fontColor.grey,
    height: `35px`,
    borderRadius: `24px`,
  },
  iconColor: {
    color: fontColor.white
  },
  deleteColor: {
    color: 'grey',
    cursor: 'pointer'
  },
  downloadColor: {
    color: '#ffb200f5',
    cursor: 'pointer'
  },
  name: {
    padding: '0px 20px',
    fontSize: font.md,
    cursor: 'pointer'
  },
  timeS: {
    padding: '0px 20px',
    fontSize: font.sm,
    color: fontColor.grey
  }
})

export default function ListCard(props) {
  const { handleDelete, data, handleDownload, handleClick } = props;
  const classes = useStyle();
  return (
    <Grid item xs={12} className={classes.root} container direction="row" justify="space-between">
      <Grid item xs={6} sm={8} md={10} container direction="row">

        <Icon className={classes.iconBox}>
          {data.type === 'Dir' ? <FolderIcon className={classes.iconColor} /> : <PermDeviceInformationIcon className={classes.iconColor} />}
        </Icon>
        <Grid>
          <Typography className={classes.name} align="left" onClick={() => {
            handleClick(data);
          }}>
            {props.name}
          </Typography>
          <Typography align="left" className={classes.timeS}>{moment(props.time).format('DD MMM YYYY HH:MM')}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={6} sm={4} md={2} container justify="flex-end" direction="row">
        {data.type === 'File' && <span onClick={() => {
          handleDownload(data)
        }}>
          <CloudDownloadIcon className={classes.downloadColor} />
        </span>}
        <span onClick={() => {
          handleDelete(data)
        }}>
          <DeleteIcon className={classes.deleteColor} />
        </span>
      </Grid>
    </Grid>
  )
}
