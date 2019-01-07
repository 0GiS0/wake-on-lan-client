import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class Navbar extends Component {

    render() {
        return (
            <div>
                <Menu fixed="top" inverted>
                    <Menu.Item as="a" header href="/">
                        WoL PoC
                    </Menu.Item>                    
                    <Menu.Item id="devices" as="a" href="/devices">Devices</Menu.Item>
                    <Menu.Item id="devices" as="a" href="/wol">Wake on LAN</Menu.Item>
                </Menu>
            </div>
        )
    }
}