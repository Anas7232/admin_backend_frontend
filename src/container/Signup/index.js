import React from 'react'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { Container,Row, Col, Button,Form } from 'react-bootstrap'

const Signup = (props) => {
    return (
        <>
          <Layout>
          <Container>
                    <Row style={{ marginTop: '100px' }}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Input
                                        label="First Name"
                                        placeholder="First Name"
                                        type="text"
                                        value=""
                                        onChange={() => {}}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        type="text"
                                        value=""
                                        onChange={() => {}}
                                        />
                                    </Col>
                                </Row>
                                <Input
                                    label="Email"
                                    placeholder="Email"
                                    type="email"
                                    value=""
                                    onChange={() => { }}
                                />

                                <Input
                                    label="Password"
                                    placeholder="Password"
                                    type="password"
                                    value=""
                                    onChange={() => { }}
                                />

                                <Button variant="primary" type="submit">
                                    Submit
  </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
          </Layout>  
        </>
    )
}

export default Signup
