// REACT-ADMIN APP.JS EXAMPLE
import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

// your app components
import Dashboard from './Dashboard';
import authProvider from '../../utils/authProvider';
import { PostList, PostCreate, PostEdit, PostShow } from './posts';
import { UserList } from './users';

const ReactAdminApp = () => {
  console.log('INSIDE THE ReactAdminApp');
  return (
    <Admin
      authProvider={authProvider}
      history={history}
      dashboard={Dashboard}
      title="My Admin"
    >
      <Resource
        name="posts"
        icon={PostIcon}
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        show={PostShow}
      />
      <Resource name="users" icon={UserIcon} list={UserList} />
      <Resource name="comments" list={ListGuesser} />
    </Admin>
  );
};

export default ReactAdminApp;
