import React, { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { login } from '../../action';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const Signin = (props) => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const auth = useSelector(state => state.auth);

    const userLogin = (e) => {
        e.preventDefault();

        const user = {
            email,
            password
        }

        dispatch(login(user))

    }

    if(auth.authenticate){
        return <Redirect to={`/`} />
    }

    return (
        <>
            <Layout>
                <Container>
                    <Row style={{ marginTop: '100px' }}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={userLogin}>
                                <Input
                                    label="Email"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <Input
                                    label="Password"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

export default Signin
