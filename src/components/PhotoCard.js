import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';


export class PhotoCard extends Component {

    state = {};


    render() {
        return (
            <Card>
                <CardImage className="img-fluid" src={this.props.photoName} />
                <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <Button href="#">Button</Button>
                </CardBody>
            </Card>
        );
    }

}