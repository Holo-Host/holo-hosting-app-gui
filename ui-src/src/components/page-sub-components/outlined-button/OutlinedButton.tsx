import * as React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
// custom mui styles :
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// local imports :
import styles from '../../styles/page-styles/DefaultPageMuiStyles';
// import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';

export interface OwnProps {
  classes: any,
  style?: any,
  link: string,
  text: string,
  color: "default" | "inherit" | "primary" | "secondary" | undefined,
  fnName: string,
  showTransferBar: (toggleTxBarParam:string) => void
}
// export type Props = OwnProps & StateProps & DispatchProps;

function OutlinedButton(props:OwnProps) {
  const { classes, link, text, color, fnName } = props;
  const btnLink = link ? link : "#";
  return (
    <Link to={btnLink} className={classes.link}>
      {link ?
          <Button variant="outlined" color={color}
          onClick={() => props.showTransferBar(fnName)}
          className={classnames(classes.button, classes.overlayTop)}>
            {text}
          </Button>
      :
        <Button variant="outlined" color={color}
        onClick={() => props.showTransferBar(fnName)}
        className={classnames(classes.button, classes.overlayTop)}>
          <span className={classes.innerBtnText}>
            {text}
          </span>
        </Button>
      }
    </Link>
  );
}

export default withStyles(styles)(OutlinedButton);
