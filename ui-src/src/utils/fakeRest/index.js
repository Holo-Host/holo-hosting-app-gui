
export default (type) => {
  console.log(" TYPE : ", type);
  
    switch (type) {
        case 'rest':
            return import('./rest').then(factory => factory.default());

        default:
            throw new Error(`Unknow dataProvider type ${type}`);
    }
};
