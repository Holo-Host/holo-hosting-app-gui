import * as React from 'react';
// mui custom styling :
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
// local imports :
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import QrGenerator from '../qr-generator/QrGenerator';
import styles from '../../styles/page-styles/DefaultPageMuiStyles'

export interface OwnProps { classes: any, agentHash: string }
export type Props = OwnProps & StateProps & DispatchProps;
export interface State { show: boolean }

class QRbutton extends React.Component<Props, State> {
  state = {
    show: false,
  };

  handleClick = () => {
    this.setState(state => ({ show: !state.show }));
  };

  public render() {
    const { classes } = this.props;
    const { show } = this.state;
    return (
      <div>
        <Button
          color="primary"
          aria-label="Add"
          className={classes.outlineBtn}
          style={{marginBottom:'25px'}}
          onClick={this.handleClick}>
          {show ? 'Minimize QR Code' : 'See QR Code'}
        </Button>
          {show ? (
            <Slide direction="up" in={show} mountOnEnter unmountOnExit>
              <div className={classes.jumbotronImg}>
                <h4 className={classes.h4}> Scan QR Code</h4>
                <QrGenerator agentHash={this.props.agentHash}/>
              </div>
            </Slide>
            )
          :
            null
          }
      </div>
    );
  }
}


export default withStyles(styles)(QRbutton);
