const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'ui_hash',
    'dna_hash',
    'description',
    'thumbanil',
    'categories',
    'tags'
  ];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  // if (values.hash &&
  //   !<PUT HASH VALIDATION HERE>.test(values.hash)
  // ) {
  //   errors.hash = 'Invalid hash format';
  // }

  return errors;
}

export default validate;


// type AllApps = {
//     Entry:{
//      author: {Hash:Hash, Name:string},
//      thumbnail: string,
//      description: HTMLInputElement | string,
//      title: string,
//      uuid: string,
//    },
//    Hash: Hash}
