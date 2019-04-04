import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Jdenticon from "./Jdenticon";

const styles = {
    root: {
      display: 'flex',
      margin: '0 auto',
      width: '100%',
      maxWidth: 150,
      maxHeight: 150
    },
};

const ThumbnailField = withStyles(styles)(({ classes, record, hash }) => {
  console.log("record props inside of ThumbnailField", record);
  console.log("record props inside of ThumbnailField", hash);

  return (
    <Jdenticon hash={hash} width={150} height={150} className={classes.root} />
  )
});

export default ThumbnailField;
{ /* <img src={record.thumbnail} className={classes.root} alt="" /> */}
