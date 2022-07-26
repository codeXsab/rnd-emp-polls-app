import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { LoadingBar } from 'react-redux-loading-bar';
import companyLogo from '../assets/18940.jpg';
import { handleLoginAction } from '../actions/authedUser';

const Login = ({ users, dispatch }) => {
	const [userSelected, setUserSelected] = useState('none');

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(handleLoginAction(userSelected));
	};

	return (
    <Fragment>
      <Container fluid>
        <LoadingBar />
        <Row className="justify-contents-center align-items-center m-auto pt-5">
          <Col xs={12} md={6} className="m-auto">
            <Card className="bg-light text-center mt-5 border-info">
              <Card.Header className="p-5 bg-info">
                <h1 className="text-center fw-bold">
                  Employee Polls Application
                </h1>
                <h3 className="text-center p-2">Please sign in to continue.</h3>
              </Card.Header>
              <Image
                src={companyLogo}
                alt="company logo"
                className="w-80 p-5"
                fluid
              />

              <Card.Body>
                <Form className="Form" data-testid="login-form">
                  <Form.Group>
                    <Form.Control
                      as="select"
                      size="lg"
                      aria-label="Select a User"
                      className="p-2"
                      onChange={(e) => setUserSelected(e.target.value)}
                      value={userSelected}
                      data-testid="login-select"
                    >
                      <option value="none" disabled className="user-dropdown">
                        Select a User...
                      </option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </Form.Control>
                    {userSelected === "none" ? (
                      <Button
                        disabled
                        className="w-100 mt-3 btn-lg btn-info"
                        data-testid="submit"
                      >
                        <span className="fw-bold">Sign In</span>
                      </Button>
                    ) : (
                      <Button
                        onClick={handleLogin}
                        className="w-100 mt-3 btn-lg btn-info"
                        data-testid="submit"
                      >
                        Sign In
                      </Button>
                    )}
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = ({ users }) => {
	return {
		users: Object.keys(users).map(function (key) {
			return users[key];
		}),
	};
};
export default connect(mapStateToProps)(Login);
