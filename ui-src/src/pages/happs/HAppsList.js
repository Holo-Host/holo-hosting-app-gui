import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import {
    translate,
    Filter,
    List,
    NumberInput,
    ReferenceInput,
    SearchInput,
    SelectInput,
    changeLocale
} from 'react-admin';
import Chip from '@material-ui/core/Chip';

// import * as hAppBundleActions from './happs_actions';
import { fetchhAppBundles } from './happs_actions';
import { fetchAgent } from '../categories/categories_actions';
import GridList from './GridList';

const quickFilterStyles = {
    root: {
        marginBottom: '0.7em',
    },
};

const QuickFilter = translate(
    withStyles(quickFilterStyles)(({ classes, label, translate }) => (
        <Chip className={classes.root} label={translate(label)} />
    ))
);
export const HAppsFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />

        <ReferenceInput
            source="happs_id"
            reference="happs"
            sort={{ field: 'id', order: 'ASC' }}
        >
            <SelectInput source="name" />
        </ReferenceInput>

        <NumberInput source="width_gte" />
        <NumberInput source="width_lte" />
        <NumberInput source="height_gte" />
        <NumberInput source="height_lte" />

        <QuickFilter
            label="resources.happs.fields.stock_lte"
            source="stock_lte"
            defaultValue={10}
        />
    </Filter>
);

class HAppsList extends React.Component {
  componentDidMount() {
      this.props.fetchAgent();
      this.props.fetchhAppBundles();
  }

  render() {
    console.log("HAppsList PROPS", this.props);
    return (
      <List
          {...this.props}
          filters={<HAppsFilter />}
          perPage={20}
          sort={{ field: 'id', order: 'ASC' }}
      >
          <GridList {...this.props}/>
      </List>
    );
  }
}

const mapStateToProps = state => ({
    whoami: state.whoami,
    registered_hApp_bundles: state.registered_hApp_bundles,
    current_hApp_bundle_details: state.current_hApp_bundle_details,
    all_hApp_bundles: state.all_hApp_bundles,
    locale: state.i18n.locale,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      fetchhAppBundles,
      changeLocale,
      fetchAgent,
    },
    dispatch
  )
}

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    translate,
    withStyles(quickFilterStyles)
);

export default enhance(HAppsList);
