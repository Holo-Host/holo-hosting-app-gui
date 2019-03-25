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
  return errors;
}

export default validate;
