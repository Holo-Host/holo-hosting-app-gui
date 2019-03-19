import * as React from 'react';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';
import IconLib from './IconLib';

export interface OwnProps { classes: any, className: string, icon: string }
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {}

class IconHandler extends React.Component<Props, State> {
  render() {
    return (
      <svg
        className={this.props.className || ""}
        viewBox={IconLib[this.props.icon].viewBox}
        dangerouslySetInnerHTML={{ __html: IconLib[this.props.icon].data }}
      />
    );
  }
}

export default withStyles(styles)(IconHandler);
