import React from 'react';
import { Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, CardActions, ShowButton, required, minLength, maxLength } from 'react-admin';
import Button from '@material-ui/core/Button';
import RichTextInput from 'ra-input-rich-text';

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

const validateRequired = () => {
  // TODO: add the custom validation code HERE...
  console.log("validateRequired fn needed...");
}
const validateFirstName = [required(), minLength(2), maxLength(15)];

const customAction = (event, resource, type, props) => {
  console.log("inside the cusomtAction", props);
}
const PostEditActions = ({ basePath, data, resource }) => (
    <CardActions>
        <ShowButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        <Button color="primary" onClick={(e) => customAction(e, "happs", "RA_FETCH_HAPP_BUNDLES", this.props)}>Custom Action</Button>
    </CardActions>
);
export const PostsEdit = (props) => (
    <Edit title={<PostTitle />} actions={<PostEditActions />} {...props}>
        <SimpleForm>
            <DisabledInput label="Id" source="id" />
            <TextInput source="title" validate={required()} />
            <TextInput label="First Name" source="firstName" validate={validateFirstName} />
            <LongTextInput source="teaser" validate={required()} />
            <RichTextInput source="body" />
            <DateInput label="Publication date" source="published_at" />

            <ReferenceManyField label="Comments" reference="comments" target="post_id">
                <Datagrid>
                    <TextField source="body" />
                    <DateField source="created_at" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>
);
