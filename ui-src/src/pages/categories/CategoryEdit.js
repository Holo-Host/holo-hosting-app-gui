import React from 'react';
import {
    translate,
    Datagrid,
    Edit,
    EditButton,
    NumberField,
    ReferenceManyField,
    SimpleForm,
    TextInput,
} from 'react-admin';
// local component imports:
import ThumbnailField from '../../app-components/ThumbnailField';
import HAppsRefField from '../happs/HAppsRefField';

const CategoryTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.categories.name', { smart_count: 1 })} &quot;
        {record.name}&quot;
    </span>
));

const CategoryEdit = props => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceManyField
                reference="products"
                target="category_id"
                label="resources.categories.fields.products"
                perPage={5}
            >
                <Datagrid>
                    <ThumbnailField />
                    <HAppsRefField source="reference" />
                    <NumberField
                        source="price"
                        options={{ style: 'currency', currency: 'USD' }}
                    />
                    <NumberField
                        source="width"
                        options={{ minimumFractionDigits: 2 }}
                    />
                    <NumberField
                        source="height"
                        options={{ minimumFractionDigits: 2 }}
                    />
                    <NumberField source="stock" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;
