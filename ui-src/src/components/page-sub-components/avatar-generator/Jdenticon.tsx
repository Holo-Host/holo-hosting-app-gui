import * as React from 'react';
// MUI CUSTOM style imports
import { withStyles } from '@material-ui/core/styles';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  hash: string,
  size: string
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State { /* The components optional internal state */ };

class Jdenticon extends React.Component<Props, State> {
  private el = null
  public componentDidUpdate() {
    (window as any).jdenticon.update(this.el)
  }

  public componentDidMount() {
    (window as any).jdenticon.update(this.el)
  }

  public render () {
    const { hash, size } = this.props
    return <svg
      {...this.props}
      style={{ verticalAlign: 'middle' }}
      ref={el => this.handleRef(el)}
      width={size}
      height={size}
      data-jdenticon-value={hash}
      />
  }

  private handleRef (el: any) {
    this.el = el
  }
}

export default withStyles(styles)(Jdenticon);

// When wish to merge style with parent inline style &/ have
//   parent dynamically inform child of size, use sytle and size in props as shown below. :
// public render () {
//   const {hash, size, style} = this.props
//   return <svg
//     {...this.props}
//     style={{verticalAlign: 'middle', ...style}}
//     ref={el => this.handleRef(el)}
//     width={size}
//     height={size}
//     data-jdenticon-value={hash}
//     />
// }
