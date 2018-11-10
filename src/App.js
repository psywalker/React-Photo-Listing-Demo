import React, { Component } from 'react';
import {FormInline, Fa, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import { Pagination, PageItem, PageLink } from 'mdbreact';
import avenue from './images/avenue.jpg';
import cosmea from './images/cosmea.jpg';
import fire from './images/fire.jpg';
import gerbera from './images/gerbera.jpg';
import hybrid from './images/hybrid.jpg';
import lane from './images/lane.jpg';
import leaf from './images/leaf.jpg';
import rose from './images/rose.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-8">
            <div class="flex-container">
              <FormInline className="md-form ml-3">
                <Fa icon="search" />
                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search"/>
              </FormInline>
            </div>
          </div>
          <div className="col-4">

          </div>
        </div>

        <div className="row">
          <div className="col-8">      
            <Dropdown className="ml-3">
              <DropdownToggle caret color="primary ml-0">
              Material dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="#">Action</DropdownItem>
                <DropdownItem href="#">Another Action</DropdownItem>
                <DropdownItem href="#">Something else here</DropdownItem>
                <DropdownItem href="#">Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="col-4">

          </div>
        </div>

        <div className="row">
          <div className="col-12">      
            <ul class="photo-list">
              <li class="photo-list__item pl-3">
                <Card>
                  <CardImage className="img-fluid" src={avenue} />
                  <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      <Button href="#">Button</Button>
                  </CardBody>
                </Card>
              </li>
              <li class="photo-list__item pl-3">
                <Card>
                  <CardImage className="img-fluid" src={cosmea} />
                  <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      <Button href="#">Button</Button>
                  </CardBody>
                </Card>
              </li>
              <li class="photo-list__item pl-3">
                <Card>
                  <CardImage className="img-fluid" src={fire} />
                  <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      <Button href="#">Button</Button>
                  </CardBody>
                </Card>
              </li>
              <li class="photo-list__item pl-3">
                <Card>
                  <CardImage className="img-fluid" src={gerbera} />
                  <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      <Button href="#">Button</Button>
                  </CardBody>
                </Card>
              </li>
              <li class="photo-list__item pl-3">
                <Card>
                  <CardImage className="img-fluid" src={hybrid} />
                  <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      <Button href="#">Button</Button>
                  </CardBody>
                </Card>
              </li>
              <li class="photo-list__item pl-3">
                <Card>
                  <CardImage className="img-fluid" src={lane} />
                  <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      <Button href="#">Button</Button>
                  </CardBody>
                </Card>
              </li>
              <li class="photo-list__item pl-3">
                <Card>
                  <CardImage className="img-fluid" src={leaf} />
                  <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      <Button href="#">Button</Button>
                  </CardBody>
                </Card>
              </li>
              <li class="photo-list__item pl-3">
                <Card>
                  <CardImage className="img-fluid" src={rose} />
                  <CardBody>
                      <CardTitle>Card title</CardTitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      <Button href="#">Button</Button>
                  </CardBody>
                </Card>
              </li>
            </ul>
          </div>
          <div className="col-4">

          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Pagination className="pagination-lg">
              <PageItem>
                <PageLink className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </PageLink>
              </PageItem>
              <PageItem>
                <PageLink className="page-link">
                  1 <span className="sr-only">(current)</span>
                </PageLink>
              </PageItem>
              <PageItem>
                <PageLink className="page-link">
                  2
                </PageLink>
              </PageItem>
              <PageItem>
                <PageLink className="page-link">
                  3
                </PageLink>
              </PageItem>
              <PageItem>
                <PageLink className="page-link">
                  &raquo;
                </PageLink>
              </PageItem>
            </Pagination>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
