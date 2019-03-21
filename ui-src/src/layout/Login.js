import React from 'react';
import { Notification, translate, userLogin } from 'react-admin';
import PropTypes from 'prop-types';
import { propTypes, reduxForm } from 'redux-form'; // Field
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import {
    MuiThemeProvider,
    createMuiTheme,
    withStyles,
} from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
// local component imports:
import { lightTheme } from './themes';

import TestButton from '../pages/categories/TestButton';

const backgroundImages = [
  'https://holo.host/wp-content/themes/holo/images/hero/jesse3.jpg',
  'https://holo.host/wp-content/themes/holo/images/hero/kehau2.jpg',
  'https://holo.host/wp-content/themes/holo/images/hero/bella2.jpg',
  'https://holo.host/wp-content/themes/holo/images/hero/alex3.jpg',
  'https://holo.host/wp-content/themes/holo/images/hero/fasih2.jpg',
  'https://holo.host/wp-content/themes/holo/images/hero/haley3.jpg'
]

// const random = Math.floor((Math.random()*backgroundImages.length) + 1);
// const backgroundUrl = backgroundImages[Math.floor((Math.random()*backgroundImages.length) + 1)];
// console.log("backgroundUrl : ", backgroundUrl);

const styles = theme => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: `url(${backgroundImages[Math.floor((Math.random()*backgroundImages.length))]})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
    },
    hint: {
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.grey[500],
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        padding: '0 1em 1em 1em',
    },
});

// see http://redux-form.com/6.4.3/examples/material-ui/
const renderInput = ({
    meta: { touched, error } = {},
    input: { ...inputProps },
    ...props
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);

class Login extends React.Component {
    login = auth =>
        this.props.userLogin(
            auth,
            this.props.location.state
                ? this.props.location.state.nextPathname
                : '/'
        );

    render() {
        const { classes, handleSubmit, isLoading, translate, whoami } = this.props;
        return (
            <div className={classes.main}>
                <Card className={classes.card}>

                    <div className={classes.avatar}>
                      <TestButton/>
                      <div>{whoami ? `Hello ${whoami.hash}` : null }</div>
                    </div>
                    <br/>

                    <div className={classes.avatar}>
                        <Avatar className={classes.icon}>
                            <LockIcon />
                        </Avatar>
                    </div>
                    <form onSubmit={handleSubmit(this.login)}>
                        <CardActions className={classes.actions}>
                            <Button
                                variant="raised"
                                type="submit"
                                color="primary"
                                disabled={isLoading}
                                className={classes.button}
                                fullWidth
                            >
                                {isLoading && (
                                    <CircularProgress size={25} thickness={2} />
                                )}
                                {translate('ra.auth.sign_in')}
                            </Button>
                        </CardActions>
                    </form>
                </Card>
                <Notification />
            </div>
        );
    }
}

Login.propTypes = {
    ...propTypes,
    authProvider: PropTypes.func,
    classes: PropTypes.object,
    previousRoute: PropTypes.string,
    translate: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
    whoami: PropTypes.string,
};

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0, whoami: state.whoami});

const enhance = compose(
    translate,
    reduxForm({
        form: 'signIn',
        validate: (values, props) => {
            const errors = {};
            const { translate } = props;
            if (!values.username) {
                errors.username = translate('ra.validation.required');
            }
            if (!values.password) {
                errors.password = translate('ra.validation.required');
            }
            return errors;
        },
    }),
    connect(
        mapStateToProps,
        { userLogin }
    ),
    withStyles(styles)
);

const EnhancedLogin = enhance(Login);

// We need to put the MuiThemeProvider decoration in another component
// Because otherwise the withStyles() HOC used in EnhancedLogin won't get
// the right theme
const LoginWithTheme = props => (
    <MuiThemeProvider theme={createMuiTheme(lightTheme)}>
        <EnhancedLogin {...props} />
    </MuiThemeProvider>
);

export default LoginWithTheme;

// <div className={classes.hint}>Hint:{this.props.hint}</div>
