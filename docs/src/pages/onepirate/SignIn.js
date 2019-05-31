import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, FormSpy } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import compose from 'docs/src/modules/utils/compose';
import axios from 'axios';
import cookie from 'react-cookies';

const styles = theme => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
});

class SignIn extends React.Component {
  state = {
    sent: false,
    userId:'',
    userPw:'',
  };

  validate = values => {
    const errors = required(['email', 'password'], values, this.props);

    if (!errors.email) {
      const emailError = email(values.email, values, this.props);
      if (emailError) {
        errors.email = email(values.email, values, this.props);
      }
    }

    return errors;
  };
  

  handleSubmit = (e) => {        

    let form = new FormData();
    form.append('userId', e.email);
    form.append('userPw',e.password);

    axios.post('http://localhost:8080/backend/login', {
      headers: { // 요청 헤더
        'Content-type': 'application/x-www-form-urlencoded'
      }
      ,userId: e.email
      ,userPw: e.password
      // timeout: 1000 // 1초 이내에 응답이 오지 않으면 에러로 간주
    })
    .then(function (response) {
      // cookie.save('user',response.data.token, { path: '/'});
      console.log(response);
      console.log(response.data.success);
      if(response.data.success){
        console.log(response.data.token);
      }else{
        console.log(response.data.message);
        alert(response.data.message);
      }
      // console.log(response.data.token);
      // console.log(response.data.data[0].mb_no);
    })
    .catch(function (error) {
      console.log(error);
    });

    

  //   axios.get('http://localhost:8080/backend/list', {
  //     headers: { // 요청 헤더
  //       'Content-type': 'application/x-www-form-urlencoded'
  //     }
  //     ,userId: e.email
  //     ,userPw: e.password
  //     // timeout: 1000 // 1초 이내에 응답이 오지 않으면 에러로 간주
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //     // console.log(response.data.rows[0].mb_no);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  };

  render() {
    const { classes } = this.props;
    const { sent } = this.state;

    return (
      <React.Fragment>
        <AppAppBar />
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Login
            </Typography>
            <Typography variant="body2" align="center">
              {'아직 회원이 아니세요? '}
              <Link href="/onepirate/sign-up/" align="center" underline="always">
                회원가입(Sign Up)
              </Link>
            </Typography>
          </React.Fragment>
          <Form
            onSubmit={this.handleSubmit}
            subscription={{ submitting: true }}
            validate={this.validate}
          >
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Field
                  autoComplete="email"
                  autoFocus
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                  size="large"
                  value={this.state.userId}
                />
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                  value={this.state.userPw}
                />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent}
                  size="large"
                  color="secondary"
                  fullWidth
                >
                  {submitting || sent ? 'In progress…' : '로그인'}
                </FormButton>
              </form>
            )}
          </Form>
          <Typography align="center">
            <Link underline="always" href="/onepirate/forgot-password/">
              비밀번호를 잊으셨나요?
            </Link>
          </Typography>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRoot,
  withStyles(styles),
)(SignIn);
