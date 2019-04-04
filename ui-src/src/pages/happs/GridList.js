import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { Link } from 'react-router-dom';
import { NumberField } from 'react-admin';
import { linkToRecord } from 'ra-core';

import ThumbnailField from '../../app-components/ThumbnailField';
import { fetchAllhAppBundles } from './happs_actions';

const styles = theme => ({
    root: {
        margin: '-2px',
    },
    gridList: {
        width: '100%',
        margin: 0,
    },
    tileBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
    },
    placeholder: {
        backgroundColor: theme.palette.grey[300],
        height: '100%',
    },
    price: {
        display: 'inline',
        fontSize: '1em',
    },
    link: {
        color: '#fff',
    },
});

const getColsForWidth = width => {
    if (width === 'xs') return 2;
    if (width === 'sm') return 3;
    if (width === 'md') return 4;
    if (width === 'lg') return 5;
    return 6;
};

const times = (nbChildren, fn) =>
    Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = (props) => {
  console.log("LoadingGridList PROPS", props);
  const { classes, ids, data, basePath, width } = props;
  const nbItems = 9

  return (
    <div className={classes.root}>
        <MuiGridList
            cellHeight={180}
            cols={getColsForWidth(width)}
            className={classes.gridList}
        >
            {' '}
            {times(nbItems, key => (
                <GridListTile key={key}>
                    <div className={classes.placeholder} />
                </GridListTile>
            ))}
        </MuiGridList>
    </div>
  );
}

class GridList extends React.Component {
  componentDidMount = async() => {
      // const all_bundles = await this.props.fetchhAppBundles();
      // const bundle_details = all_bundles.addresses
      // bundle_details.map(hash => {
      //   console.log("bundle_details hash", hash);
      //   this.props.gethAppBundleDetails(hash);
      // })

      this.props.fetchAllhAppBundles();
  }

  render () {
    console.log("GridList PROPS, Step 1", this.props);
    const { classes, ids, data, basePath, width, registered_hApp_bundles, all_hApp_bundles } = this.props;

    if(!registered_hApp_bundles || registered_hApp_bundles === undefined) {
      return  <LoadingGridList {...this.props} />
    }


    console.log("registered_hApp_bundles", registered_hApp_bundles);
    const { addresses } = registered_hApp_bundles;
    // const { details } = current_hApp_bundle_details;

    return (
      <div className={classes.root}>
          <MuiGridList
              cellHeight={180}
              cols={getColsForWidth(width)}
              className={classes.gridList}
          >
              {addresses.map((hash, id) => (
                  <GridListTile
                      component={Link}
                      key={id}
                      to={`${basePath}/${id}`}
                  >
                    <ThumbnailField hash={hash}/>
                    <GridListTileBar
                        className={classes.tileBar}
                        title={hash}
                        subtitle={
                          <span>
                              <NumberField
                                  className={classes.price}
                                  source="price"
                                  record={id}
                                  color="inherit"
                                  options={{
                                      style: 'currency',
                                      currency: 'USD',
                                  }}
                              />
                          </span>
                        }
                      />
                  </GridListTile>
              ))}
          </MuiGridList>
      </div>
    );
  }
}


const mapStateToProps = state => ({
    whoami: state.whoami,
    all_hApp_bundles: state.all_hApp_bundles,
    registered_hApp_bundles: state.registered_hApp_bundles,
    current_hApp_bundle_details: state.current_hApp_bundle_details,
    locale: state.i18n.locale,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      fetchAllhAppBundles,
    },
    dispatch
  )
}

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withWidth(),
    withStyles(styles)
);

export default enhance(GridList);
