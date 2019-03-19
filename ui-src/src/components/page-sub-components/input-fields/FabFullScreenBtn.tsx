import * as React from 'react';
// mui custom styling :
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import { StyleRulesCallback } from '@material-ui/core/';
import Fab from '@material-ui/core/Fab';
import EnlargeViewIcon from '@material-ui/icons/OpenInNew'
// local imports
// import styles from '../../styles/page-styles/DefaultPageMuiStyles'

const styles : StyleRulesCallback  = (theme: Theme) => ({
  enargeViewFab: {
    margin: theme.spacing.unit,
    color: "#799ab6",
    width: 30,
    height: 30,
    minHeight:30,
    background: "#0e3658",
    "&:hover": {
      color: '#003087',
    }
  },
  enlargeViewIconSize: {
    fontSize: 17,
  }
});

function FabFullScreenBtn(props: any) {
  const { classes, handleClick } = props;
  return (
    <div>
      <Fab
        color="primary"
        aria-label="Add"
        className={classes.enargeViewFab}
        onClick={handleClick}
      >
        <EnlargeViewIcon className={classes.enlargeViewIconSize}/>
      </Fab>
    </div>
  );
}

export default withStyles(styles)(FabFullScreenBtn);
        // {/* className={classnames(classes.button, classes.overlayTop, classes.smallButton)} */}
