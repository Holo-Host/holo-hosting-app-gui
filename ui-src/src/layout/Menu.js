import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import SettingsIcon from '@material-ui/icons/Settings';
import RegisterIcon from '@material-ui/icons/Assignment';
// import LabelIcon from '@material-ui/icons/Label';
import { withRouter } from 'react-router-dom';
import {
    translate,
    DashboardMenuItem,
    MenuItemLink,
    Responsive,
} from 'react-admin';

// app page imports:
import reviews from '../pages/reviews';
import users from '../pages/users';
import happs from '../pages/happs';
import categories from '../pages/categories';
import posts from '../pages/posts';
// local component imports:
import SubMenu from './SubMenu';

class Menu extends Component {
    state = {
        menuProducts: false,
        menuSales: false,
        menuCustomers: false,
    };

    static propTypes = {
        onMenuClick: PropTypes.func,
        logout: PropTypes.object,
    };

    handleToggle = menu => {
        this.setState(state => ({ [menu]: !state[menu] }));
    };

    render() {
        const { onMenuClick, open, logout, translate } = this.props;
        return (
            <div>
                {' '}
                <DashboardMenuItem onClick={onMenuClick} />
                <MenuItemLink
                    to={`/happs`}
                    primaryText={translate(`resources.happs.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<happs.icon />}
                    onClick={onMenuClick}
                />

                {/* <SubMenu
                    handleToggle={() => this.handleToggle('menuProducts')}
                    isOpen={this.state.menuProducts}
                    sidebarIsOpen={open}
                    name="pos.menu.catalog"
                    icon={<happs.icon />}
                >
                    <MenuItemLink
                        to={`/happs`}
                        primaryText={translate(`resources.happs.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<happs.icon />}
                        onClick={onMenuClick}
                    />
                     <MenuItemLink
                        to={`/categories`}
                        primaryText={translate(`resources.categories.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<categories.icon />}
                        onClick={onMenuClick}
                    />
                </SubMenu> */}
                {/* <MenuItemLink
                    to={`/users`}
                    primaryText={translate(`resources.users.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<users.icon />}
                    onClick={onMenuClick}
                /> */}
                {/* <MenuItemLink
                    to={`/reviews`}
                    primaryText={translate(`resources.reviews.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<reviews.icon />}
                    onClick={onMenuClick}
                  /> */}
                  <MenuItemLink
                      to={`/register`}
                      primaryText={translate(`resources.register.name`, {
                          smart_count: 2,
                      })}
                      leftIcon={<RegisterIcon />}
                      onClick={onMenuClick}
                    />
                    {/* <MenuItemLink
                      to={`/posts`}
                      primaryText={translate(`resources.posts.name`, {
                          smart_count: 2,
                      })}
                      leftIcon={<posts.icon />}
                      onClick={onMenuClick}
                    /> */}

                <Responsive
                    xsmall={
                        <MenuItemLink
                            to="/configuration"
                            primaryText={translate('pos.configuration')}
                            leftIcon={<SettingsIcon />}
                            onClick={onMenuClick}
                        />
                    }
                    medium={null}
                />
                <Responsive
                    small={logout}
                    medium={null} // Pass null to render nothing on larger devices
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
    theme: state.theme,
    locale: state.i18n.locale,
});

const enhance = compose(
    withRouter,
    connect(
        mapStateToProps,
        {}
    ),
    translate
);

export default enhance(Menu);



   // <MenuItemLink
   //     to={`/segments`}
   //     primaryText={translate(`resources.segments.name`, {
   //         smart_count: 2,
   //     })}
   //     leftIcon={<LabelIcon />}
   //     onClick={onMenuClick}
   // />
