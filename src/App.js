import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import ListGroup from "react-bootstrap/ListGroup"

// the class component App extends the component from react and contains the logic and ui for the app

class App extends Component {

  constructor(props) { //initializing the component with properties.
    super(props) // this is called to inherit the properties from the parent class

    //Setting up the state

    this.state = {  // initializing the components state
      userInput: "", // holds current text input from user
      list: [], // stores list of to do items
    }
  }

  //Set up a user input value

  updateInput(value) { 
    this.setState({
      userInput: value
    })
  } // updates the userinput in the state with the given value. used to track what the user is typing in the input field

  //Adding an input if an item is not empty

  addItem() {

    if (this.state.userInput !== "") {
      const userInput = {

        //Adding a random ID for deletion

        id: Math.random(),

        //Adding a users value to the list

        value: this.state.userInput //uses ther current userinput as the value for the new item

      }

      //updating the list

      const list = [...this.state.list] // creates a copy of the list
      list.push(userInput) //adds new item to copied list

      //reset the state

      this.setState({
        list,
        userInput: "",
      }) // updates the list in the state with the modified list and clearss the userinput

    }

  }

  //function to delete item from list using id

  deleteItem(key) {

    const list = [...this.state.list]; // creates a copy of the list

    const updateList = list.filter((item) => item.id !== key); //creates a new list thet excludes the item with the specified id

    this.setState({
      list: updateList,
    }); //Update list in state with the filtered list

  }

  editItem = (index) => { //allows users to edit a list item based on its index

    const todos = [...this.state.list];
    const editedTodo = prompt('Edit the todo:'); // prompts the user for a new value

    if (editedTodo !== null && editedTodo.trim() !== "") { //checks if the new value is not empty

      let updatedTodos = [...todos]
      updatedTodos[index].value = editedTodo //updates  the value of item at the specified index
      
      this.setState({
        list: updatedTodos,
      }); // updates the list in the state

    }
  }

  render() { //renders component ui
    return ( //create a bootstrap container with a row for the title.
      <Container> 
        <Row style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bolder",
          color: "red"
        }}> TO DO LIST </Row>

        <hr />

        <Row>

          <Col md={{
            span: 5, offset: 4
          }}>

            <InputGroup className='mb-3'>

              <FormControl placeholder='add item...'
                size='lg'
                value={this.state.userInput} //binds the input to the user input in the state
                onChange={(item) => this.updateInput(item.target.value)} //updates the userinput with the users input
                aria-label='add something'
                aria-describedby='basic-addon2'
              />

              <InputGroup>

                <Button variant='dark' className='mt-2' onClick={() => this.addItem()}> Add </Button>

              </InputGroup>
            </InputGroup>
          </Col>
        </Row>

        <Row>

          <Col md={{ span: 5, offset: 4 }}>

            <ListGroup>

              {/*map over and print items*/}
              {this.state.list.map((item, index) => { //maps over the list and create a listgroup.item for each item

                return (

                  <div key={index} >

                    <ListGroup.Item variant='dark' action style={{ display: "flex", justifyContent: "space-between" }}>

                      {item.value} <span>

                        <Button style={{ marginRight: "10px" }} variant='light' onClick={() => this.deleteItem(item.id)}> Delete </Button>
                        <Button variant='light' onClick={() => this.editItem(index)}> Edit </Button>

                      </span>

                    </ListGroup.Item>

                  </div>
                )

              })}


            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }



}

export default App 