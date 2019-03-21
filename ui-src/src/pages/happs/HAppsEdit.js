import React from 'react';
import {
    Datagrid,
    DateField,
    Edit,
    EditButton,
    FormTab,
    NumberInput,
    Pagination,
    ReferenceInput,
    ReferenceManyField,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import RichTextInput from 'ra-input-rich-text';

import CustomerReferenceField from '../users/UsersReferenceField';
import StarRatingField from '../reviews/StarRatingField';
import Poster from './HAppImg';
import { styles as createStyles } from './HAppsCreate';

const HAppsTitle = ({ record }) => <span>Poster #{record.reference}</span>;

const styles = {
    ...createStyles,
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

const HAppsEdit = ({ classes, ...props }) => (
    <Edit {...props} title={<HAppsTitle />}>
        <TabbedForm>
            <FormTab label="resources.happs.tabs.image">
                <Poster />
                <TextInput source="image" options={{ fullWidth: true }} />
                <TextInput source="thumbnail" options={{ fullWidth: true }} />
            </FormTab>
            <FormTab label="resources.happs.tabs.details" path="details">
                <TextInput source="reference" />
                <NumberInput source="price" className={classes.price} />
                <NumberInput
                    source="width"
                    className={classes.width}
                    formClassName={classes.widthFormGroup}
                />
                <NumberInput
                    source="height"
                    className={classes.height}
                    formClassName={classes.heightFormGroup}
                />
                <ReferenceInput source="category_id" reference="categories">
                    <SelectInput source="name" />
                </ReferenceInput>
                <NumberInput source="stock" className={classes.stock} />
            </FormTab>
            <FormTab
                label="resources.happs.tabs.description"
                path="description"
            >
                <RichTextInput source="description" addLabel={false} />
            </FormTab>
            <FormTab label="resources.happs.tabs.reviews" path="reviews">
                <ReferenceManyField
                    reference="reviews"
                    target="product_id"
                    addLabel={false}
                    pagination={<Pagination />}
                >
                    <Datagrid>
                        <DateField source="date" />
                        <CustomerReferenceField />
                        <StarRatingField />
                        <TextField
                            source="comment"
                            cellClassName={classes.comment}
                        />
                        <TextField source="status" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default withStyles(styles)(HAppsEdit);
