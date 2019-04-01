import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import {
    Create,
    FormTab,
    NumberInput,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextInput,
    required,
    translate,
    changeLocale
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

import { fetchhAppBundles, raFetchhAppBundles, makeCustomRAcall, registerAsProvider, isRegisteredAsProvider, registerhAppBundle } from './happs_actions';
import { fetchAgent } from '../categories/categories_actions';
import withStyles from '@material-ui/core/styles/withStyles';

export const styles = {
    stock: { width: '5em' },
    price: { width: '5em' },
    width: { width: '5em' },
    widthFormGroup: { display: 'inline-block' },
    height: { width: '5em' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

class HAppsCreate  extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
      prevProps: {}
    };
  };

  testingCalls(){
    // Testing Calls
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
   // this.props.registerAsHost({host_doc:{kyc_proof:""}});
   // this.props.isRegisteredAsHost();
   this.props.registerAsProvider({provider_doc:{kyc_proof:""}});
   this.props.isRegisteredAsProvider();

   this.testingCalls();
 }

 handleRACall= (event, resource, type) => {
   console.log("inside the handleClick", this.props);
   // console.log("Check for props.record >> ", this.props);
   const { raFetchhAppBundles, basePath, registered_hApp_bundles, makeCustomRAcall } = this.props; // record,

   let addresses = registered_hApp_bundles === null ? [] : registered_hApp_bundles.addresses;
   let ids = [];
   for (let appHash in addresses) {
     ids.push(appHash);
   }
   let data = [];
   for (let appHash of addresses) {
     data.push(appHash);
   }
   const params = {
     id: ids,
     data
   };

   console.log("params >> ", params);

   // raFetchhAppBundles(ids, data, type, basePath); // record.id, record,
   makeCustomRAcall(type, resource, params, basePath)
 }

  render() {
    const { classes, ...newProps } = this.props
    console.log("HAppsCreate >>>> Current PROPS", this.props);

    return (
      <Create {...this.props}>
          <TabbedForm>
              <FormTab label="resources.happs.tabs.image">
                  <TextInput
                      autoFocus
                      source="image"
                      options={{ fullWidth: true }}
                      validate={required()}
                  />
                  <TextInput
                      source="thumbnail"
                      options={{ fullWidth: true }}
                      validate={required()}
                  />

                  <button onClick={(event) => this.handleRACall(event, "happs", "RA_FETCH_HAPP_BUNDLES")}>Test RA CALL</button>

              </FormTab>

              <FormTab label="resources.happs.tabs.details" path="details">
                  <TextInput source="reference" validate={required()} />
                  <NumberInput
                      source="price"
                      validate={required()}
                      className={classes.price}
                  />
                  <NumberInput
                      source="width"
                      validate={required()}
                      className={classes.width}
                      formClassName={classes.widthFormGroup}
                  />
                  <NumberInput
                      source="height"
                      validate={required()}
                      className={classes.height}
                      formClassName={classes.heightFormGroup}
                  />
                  <ReferenceInput
                      source="category_id"
                      reference="categories"
                      allowEmpty
                  >
                      <SelectInput source="name" />
                  </ReferenceInput>
              </FormTab>

              <FormTab
                  label="resources.happs.tabs.description"
                  path="description"
              >
                  <RichTextInput source="description" addLabel={false} />
              </FormTab>
          </TabbedForm>
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
 // return bindActionCreators(ContainerApiActions, dispatch);
  return bindActionCreators({
      // hAppBundleActions,
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
