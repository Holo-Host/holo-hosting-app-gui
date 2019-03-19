import * as React from 'react';
// local imports :
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import SimpleTable from '../../page-sub-components/simple-table/SimpleTable';
// import { processedData, pendingData} from '../../../utils/seed-data/mock-data';
// custom stylesheet
import '../../styles/page-styles/scaffold-styles.css';


// TODO: use the following when change to Class:
export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  // The components optional internal state
}

const TransactionSummary = (props: any) => {
  return(
    <div className='transfer-activity profile'>
      <h3>Transfer Activity</h3>
      <h4>Pending Transfers</h4>
      <SimpleTable  { ...props }/>

      <h4>Processed Transfers</h4>
      <SimpleTable  { ...props }/>
    </div>
  );
};

export default TransactionSummary;
