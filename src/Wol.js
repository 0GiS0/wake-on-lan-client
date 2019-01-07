import React, { Component } from 'react';
import { Button, Form, Message, Icon } from "semantic-ui-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import delay from 'delay';


export default class Wol extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isWaiting: false,
            isChecking: false,
            mac: window.localStorage.getItem('last_mac')
        };

        this.handleChangeMac = this.handleChangeMac.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChangeMac(e) {
        window.localStorage.setItem('last_mac', e.target.value);
        this.setState({
            mac: e.target.value
        });
    }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            isWaiting: true
        });

        console.log('waking up: ' + this.state.mac);
        const response = await fetch('http://localhost:9090/wakeup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mac: this.state.mac })

        });

        const data = await response.json();

        if (data) {
            this.setState({
                isChecking: true
            });

            let awake = false;
            while (!awake) {
                await delay(3000);
                const response = await fetch('http://localhost:9090/check-if-it-is-awake', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ mac: this.state.mac })
                });

                awake = await response.json();
            }

            this.setState({
                isChecking: false
            });

            toast.success("Your device is awake 😎!", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else {
            toast.error("Something happend with your device", {
                position: toast.POSITION.TOP_CENTER
            });
        }

        this.setState({
            isWaiting: false
        });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Type a MAC address</label>
                        <input
                            placeholder="Enter PC MAC"
                            value={this.state.mac}
                            onChange={this.handleChangeMac}
                        />
                    </Form.Field>
                    <Button type="submit" loading={this.state.isWaiting}>
                        Wake up
                </Button>
                </Form>
                {this.state.isChecking && (<Message icon>
                    <Icon name='circle notched' loading />
                    <Message.Content>
                        <Message.Header>Just one second</Message.Header>
                        We are waiting for your device.
                    </Message.Content>
                </Message>)}
                <ToastContainer />
            </div>
        );
    }
};