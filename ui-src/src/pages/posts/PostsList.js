import React, { Children, Fragment, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';

import { fetchhAppBundles } from '../happs/happs_actions';
import { fetchAgent } from '../categories/categories_actions';

import Chip from '@material-ui/core/Chip';
import BookIcon from '@material-ui/icons/Book';
import ResetViewsButton from '../../app-components/ResetViewsButton';
import {
    BooleanField,
    BulkDeleteButton,
    ChipField,
    Datagrid,
    DateField,
    EditButton,
    Filter,
    List,
    NumberField,
    ReferenceArrayField,
    Responsive,
    SearchInput,
    ShowButton,
    SimpleList,
    SingleFieldList,
    TextField,
    TextInput,
    translate,
    changeLocale
} from 'react-admin'; // eslint-disable-line import/no-unresolved
export const PostIcon = BookIcon;

/**********************************************************/
             /*    Component Styles        */
/**********************************************************/
const styles = theme => ({
  title: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  hiddenOnSmallScreens: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  publishedAt: { fontStyle: 'italic' },
});

/**********************************************************/
      /*      Component Filter        */
/**********************************************************/
const QuickFilter = translate(({ label, translate }) => (
    <Chip style={{ marginBottom: 8 }} label={translate(label)} />
));

const PostFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <TextInput
            source="title"
            defaultValue="Post Title"
        />
        <QuickFilter
            label="resources.posts.fields.commentable"
            source="commentable"
            defaultValue
        />
    </Filter>
);
/**********************************************************/
          /*      Helper Components        */
/**********************************************************/
const PostListBulkActions = props => (
    <Fragment>
        <ResetViewsButton {...props} />
        <BulkDeleteButton {...props} />
    </Fragment>
);

const PostListActionToolbar = withStyles({
    toolbar: {
        alignItems: 'center',
        display: 'flex',
    },
  })(({ classes, children, ...props }) => (
      <div className={classes.toolbar}>
          {Children.map(children, button => cloneElement(button, props))}
      </div>
));

const rowClick = (id, basePath, record) => {
    if (record.commentable) {
        return 'edit';
    }
    return 'show';
};

const PostPanel = ({ id, record, resource }) => (
    <div dangerouslySetInnerHTML={{ __html: record.body }} />
);

/**********************************************************/
             /*    MAIN Component        */
/**********************************************************/
class PostsList extends React.Component {
  componentDidMount() {
      this.props.fetchAgent();
      this.props.fetchhAppBundles();
  }

  render() {
    console.log("POST-LIST :: PROPS", this.props);
    const { classes } = this.props;

    return (
      <List
          {...this.props}
          bulkActionButtons={<PostListBulkActions />}
          filters={<PostFilter />}
          sort={{ field: 'published_at', order: 'DESC' }}
      >
          <Responsive
              small={
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.id} views`}
                    tertiaryText={record =>
                        new Date(record.published_at).toLocaleDateString()
                    }
                />
              }
              medium={
                <Datagrid rowClick={rowClick} expand={<PostPanel />}>
                    <TextField source="id" />
                    <TextField source="title" cellClassName={classes.title} />
                    <DateField
                        source="published_at"
                        cellClassName={classes.publishedAt}
                    />

                    <BooleanField
                        source="commentable"
                        label="resources.posts.fields.commentable_short"
                        sortable={false}
                    />
                    <NumberField source="views" />
                    <ReferenceArrayField
                        label="Tags"
                        reference="tags"
                        source="tags"
                        sortBy="tags.name"
                        cellClassName={classes.hiddenOnSmallScreens}
                        headerClassName={classes.hiddenOnSmallScreens}
                    >
                        <SingleFieldList>
                            <ChipField source="name" />
                        </SingleFieldList>
                    </ReferenceArrayField>
                    <PostListActionToolbar>
                        <EditButton />
                        <ShowButton />
                    </PostListActionToolbar>
                </Datagrid>
              }
          />
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
 // return bindActionCreators(ContainerApiActions, dispatch);
  return bindActionCreators({
      // hAppBundleActions,
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
    withStyles(styles)
);

export default enhance(PostsList);
