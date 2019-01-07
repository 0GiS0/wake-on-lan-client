import React, { Component } from 'react';
import { Header, Message, Table } from "semantic-ui-react";

export default class Devices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: null,
            isLoading: false
        };
    }

    componentWillMount() {
        this.findDevices();
    }

    async findDevices() {
        this.setState({ isLoading: true });

        //Find all local network devices
        const response = await fetch(process.env.REACT_APP_WOL_API_URL + '/devices', {
            method: 'GET'
        });
        const data = await response.json();

        this.setState({
            devices: data,
            isLoading: false
        });
    }

    render() {
        return (
            <div>
                <Header as="h1">Network Devices</Header>
                {this.state.isLoading && <Message info header="Finding devices..." />}
                {this.state.devices && (
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>IP</th>
                                    <th>MAC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.devices.map(device => (
                                    <tr id={device.ip} key={device.ip}>
                                        <td>{device.name}</td>
                                        <td>{device.ip}</td>
                                        <td>{device.mac}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        );
    }
}
