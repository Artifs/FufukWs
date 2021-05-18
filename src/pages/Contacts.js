import React, { Component } from 'react'
import Catalog from './Catalog'

export default class Contacts extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                Контакты <Catalog   />
            </div>
        )
    }
}
