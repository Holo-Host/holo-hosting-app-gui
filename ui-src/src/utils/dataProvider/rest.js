/************************************************************************/
import dataProvider from './restAPImap';
const RA_dataProvider = dataProvider('http://localhost:8800');

// import jsonRestProvider from 'ra-data-fakerest';
// const dataProvider = jsonRestProvider(data, true);

const dataProviderFactory = (type, resource, params) => {
  console.log("inside of the dataProvider. .. > current type: >", type);
  console.log("inside of the dataProvider... > current resource: >", resource);
  console.log("inside of the dataProvider... > current params: >", params);

  // const req = new XMLHttpRequest();
  // req.open("GET", "/posts", false);
  // req.send(null);
  // console.log("--->",req.response);




  if(!type || !resource || !params) {
    console.log('leaving dataProviderFactory >> params undefined...');
    // must return an empty obj in order to avoid triggering the null or undefined setting for the loader (in apps.js)...
    return {};
  }
  else {
    new Promise(resolve =>
      setTimeout(() => resolve(RA_dataProvider(type, resource, params)), 500)
    );
  }
}
export default dataProviderFactory;
/************************************************************************/

// const dataProvider = (type, resource, params) => new Promise();


/************************************************************************/
/************************************************************************/
