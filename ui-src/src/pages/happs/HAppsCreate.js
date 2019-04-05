import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import RichTextInput from 'ra-input-rich-text';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import {
    Create,
    List,
    NumberInput,
    ReferenceInput,
    SelectInput,
    TextInput,
    required,
    translate,
    changeLocale,
    ArrayInput,
    AutocompleteInput,
    BooleanInput,
    DateInput,
    FormDataConsumer,
    LongTextInput,
    SaveButton,
    SimpleForm,
    SimpleFormIterator,
    Toolbar,
    Filter,
    SearchInput,
    crudCreate
} from 'react-admin';

import SaveButtonComponent from "../../app-components/SaveButton";


import { fetchhAppBundles, raFetchhAppBundles, makeCustomRAcall, registerAsProvider, isRegisteredAsProvider, registerhAppBundle } from './happs_actions';
import { fetchAgent } from '../categories/categories_actions';
import withStyles from '@material-ui/core/styles/withStyles';

//////////////////
import GridList from './GridList';
import Chip from '@material-ui/core/Chip';

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
)
/////////////////////
//
// import { fetchhAppBundles, raFetchhAppBundles, makeCustomRAcall, registerAsProvider, isRegisteredAsProvider, registerhAppBundle } from './happs_actions';
// import { fetchAgent } from '../categories/categories_actions';
// import withStyles from '@material-ui/core/styles/withStyles';

export const styles = {
    stock: { width: '5em' },
    price: { width: '5em' },
    width: { width: '5em' },
    widthFormGroup: { display: 'inline-block' },
    height: { width: '5em' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const getDefaultDate = () => new Date();

// const HappsCreateToolbar = props => (
//     <Toolbar {...props}>
//         <SaveButtonComponent
//             label={translate("posts.action.save_and_edit")}
//             redirect="show"
//             submitOnEnter={true}
//         />
//     </Toolbar>
// );

class HappsCreateToolbar extends React.Component {
  triggerList = () => {
    console.log("LIST PROPS INSIDE OF CREATE", this.props)
    return (
      <List
          {...this.props}
          filters={<HAppsFilter />}
          perPage={20}
          sort={{ field: 'id', order: 'ASC' }}
      >
      <h2>Hello LIst</h2>
      </List>
    );
  }
  render() {
    return (
        <Toolbar {...this.props}>
            <SaveButton
                label={translate("posts.action.save_and_edit")}
                redirect="show"
                submitOnEnter={true}
                onClick={this.triggerList}
            />
        </Toolbar>
    );
  }
}

// const HappsCreateToolbar = props => (
//   <Toolbar {...props}>
//       <Tooltip title="Submit Values" aria-label="Submit Values">
//       <SaveButtonComponent
//           label={<SendIcon/>}
//           redirect="show"
//           submitOnEnter={false}
//           onClick={this.clearValues}
//       />
//       </Tooltip>
//   </Toolbar>
// );


class HAppsCreate  extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
      prevProps: {}
    };
  };

  createDummyAppCalls(){
    const app_bundle_1 = {
      ui_hash:"Quiououo",
      dna_list:["Qoauxjnva","Qkiauihsnvkk"]
    }
    const app_bundle_2 = {
      ui_hash:"Qmuiasdfouo",
      dna_list:["Qmoauasdfxva","Qmkiauiasdfnvkk"]
    }
    const app_details = {
      name: "app name",
      details: "description of app"
    };

    const domain_name = {
      dns_name: "findmewhereiam.com"
    }
    this.props.registerhAppBundle({app_bundle: app_bundle_1, app_details, domain_name});
    this.props.registerhAppBundle({app_bundle: app_bundle_2, app_details, domain_name});
    this.props.fetchhAppBundles();
  }

 componentDidMount () {
   this.props.registerAsProvider({provider_doc:{kyc_proof:""}});
   this.props.isRegisteredAsProvider();

   this.createDummyAppCalls();
 }

  render() {
    const { classes, permissions, ...newProps } = this.props
    console.log("HAppsCreate >>>> Current PROPS", this.props);

    return (
      <Create {...this.props}>
        <SimpleForm
            toolbar={<HappsCreateToolbar />}
            defaultValue={{ average_note: 0 }}
            validate={values => {
                const errors = {};
                ['title', 'teaser'].forEach(field => {
                    if (!values[field]) {
                        errors[field] = ['Required field'];
                    }
                });

                if (values.average_note < 0 || values.average_note > 5) {
                    errors.average_note = ['Should be between 0 and 5'];
                }

                return errors;
            }}
        >
            <TextInput autoFocus source="title" />
            <LongTextInput source="description" />
            <TextInput autoFocus source="Domain Name" />
            {/*<BooleanInput source="commentable" defaultValue /> */}

            <TextInput autoFocus source="Ui Hash" />
            <ArrayInput
                source="dna Hash"
                defaultValue={[
                    {
                        hash: ''
                    },
                ]}
            >
                <SimpleFormIterator>
                    <TextInput source="hash" />
                </SimpleFormIterator>
            </ArrayInput>
            {permissions === 'admin' && (
                <ArrayInput source="authors">
                    <SimpleFormIterator>
                        <ReferenceInput
                            label="User"
                            source="user_id"
                            reference="users"
                        >
                            <AutocompleteInput />
                        </ReferenceInput>
                        <FormDataConsumer>
                            {({
                                formData,
                                scopedFormData,
                                getSource,
                                ...rest
                            }) =>
                                scopedFormData.user_id ? (
                                    <SelectInput
                                        label="Role"
                                        source={getSource('role')}
                                        choices={[
                                            {
                                                id: 'headwriter',
                                                name: 'Head Writer',
                                            },
                                            {
                                                id: 'proofreader',
                                                name: 'Proof reader',
                                            },
                                            {
                                                id: 'cowriter',
                                                name: 'Co-Writer',
                                            },
                                        ]}
                                        {...rest}
                                    />
                                ) : null
                            }
                        </FormDataConsumer>
                    </SimpleFormIterator>
                </ArrayInput>
            )}
        </SimpleForm>
      </Create>
    )
  }
}

const mapStateToProps = state => ({
    whoami: state.whoami,
    registered_as_host: state.registered_hApp_bundles,
    registered_as_provider: state.registered_hApp_bundles,
    locale: state.i18n.locale,
    registered_hApp_bundles: state.registered_hApp_bundles,
    current_hApp_bundle_details: state.current_hApp_bundle_details,
    all_hApp_bundles: state.all_hApp_bundles,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      registerAsProvider,
      isRegisteredAsProvider,
      registerhAppBundle,
      fetchhAppBundles,
      raFetchhAppBundles,
      changeLocale,
      fetchAgent,
      makeCustomRAcall
    },
    dispatch
  )
}

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    translate,
    withStyles(styles)
);

export default enhance(HAppsCreate);



// handleRACall= (event, resource, type) => {
//   console.log("inside the handleClick", this.props);
//   const { raFetchhAppBundles, basePath, registered_hApp_bundles, makeCustomRAcall } = this.props; // record,
//
//   let addresses = registered_hApp_bundles === null ? [] : registered_hApp_bundles.addresses;
//   let ids = [];
//   for (let appHash in addresses) {
//     ids.push(appHash);
//   }
//   let data = [];
//   for (let appHash of addresses) {
//     data.push(appHash);
//   }
//   const params = {
//     id: ids,
//     data
//   };
//   console.log("params >> ", params);
//   makeCustomRAcall(type, resource, params, basePath)
// }
