import React, { Component, Fragment } from 'react'
import HomeNavbar from '../../app/github-integration';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import "./style.css";

export default class Home extends Component {
  render() {
    return (
      <Fragment>
          <HomeNavbar />

          <Container>
            <Row className="justify-content-md-center search-row">
              <Col>
                <InputGroup size="lg">
                  <FormControl
                    placeholder="User or Org/Repository Name"
                    aria-label="User or Org/Repository Name"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Append>
                    <Button variant="outline-secondary">Go!</Button>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Row>
          </Container>
      </Fragment>
    );
  }
}
