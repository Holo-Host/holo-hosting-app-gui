import React from 'react';
import { Notification, translate, userLogin } from 'react-admin';
import PropTypes from 'prop-types';
import { propTypes, reduxForm, Field } from 'redux-form'; // Field
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import FormLabel from '@material-ui/core/FormLabel';
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
import { lightTheme } from '../../layout/themes';

import TestButton from './TestButton';
import UserTypeRadioSelection from './UserTypeRadioSelection';

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
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
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

                 {/*<div className={classes.avatar}>
                      <TestButton/>
                      <div>{whoami ? `MyAgentHash: ${whoami.hash}` : null }</div>
                    </div>
                    <br/>*/ }

                    <div className={classes.avatar}>
                        <Avatar className={classes.icon}>
                            <LockIcon />
                        </Avatar>
                    </div>
                    <br/>

                    <form onSubmit={handleSubmit(this.login)}>
                    <div className={classes.form}>
                    {/* TODO: Eventually, just query the isRegisteredAsProvider && isRegisteredAsHost upon app mount (after successful sign-in) to determine which UI to show...*/}
                        <article className={classes.root}>
                          <FormLabel component="legend">Sign in as</FormLabel>
                          <UserTypeRadioSelection />
                        </article>

                          <div className={classes.input}>
                              <Field
                                  autoFocus
                                  name="username"
                                  component={renderInput}
                                  label={translate('ra.auth.username')}
                                  disabled={isLoading}
                              />
                          </div>
                          <div className={classes.input}>
                              <Field
                                  name="password"
                                  component={renderInput}
                                  label={translate('ra.auth.password')}
                                  type="password"
                                  disabled={isLoading}
                              />
                          </div>
                      </div>

                      <br/>
                      <br/>
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
    whoami: PropTypes.object,
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
