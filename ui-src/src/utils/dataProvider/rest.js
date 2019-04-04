/************************************************************************/
// import dataProvider from './restAPImap';
// const RA_dataProvider = dataProvider('http://localhost:8800');

// import restServer from '../fakeRest/rest';
// console.log("REST SERVER 1-ONLY >", restServer());
// const data = restServer.collections;
// import jsonRestProvider from '../fakeRest';
// const RA_dataProvider = jsonRestProvider(data, true);

import jsonRestProvider from 'ra-data-fakerest';
const RA_dataProvider = jsonRestProvider({
    posts: [{}],
    happs: [{}],
    users: [{}],
    reviews: [{}],
    categories: [{}],
    tags: [{}]
}, true)


const dataProviderFactory = (type, resource, params) => {
  console.log("inside of the dataProvider REST.JS. .. > current type: >", type);
  console.log("inside of the dataProvider REST.JS... > current resource: >", resource);
  console.log("inside of the dataProvider REST.JS... > current params: >", params);

  if(!type || !resource ) {
    console.log('leaving dataProviderFactory >> params undefined...');
    // NOTE: must return an empty obj in order to avoid triggering the null or undefined setting for the loader (in apps.js)...
    return {};
  }
  else {
    new Promise(resolve =>
      resolve(RA_dataProvider(type, resource, params))
    );
  }
}
export default dataProviderFactory;
// /************************************************************************/
//
// // const dataProvider = (type, resource, params) => new Promise();
//
//
// /************************************************************************/
// /************************************************************************/
