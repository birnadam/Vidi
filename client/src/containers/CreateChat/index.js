import React, { Component } from 'react'
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { createChannel } from "../../actions/dbActions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputField from "../../components/InputField";
import "./style.css";

class CreateChat extends Component {

  state = {
    modal: true
  }

  onSubmit = formProps => {
    let userId = this.props.state.db.Users._id
    console.log(userId)
    let formData = { ...formProps, userId }
    console.log(formData)
    this.props.socket.emit("createChannel", formData, function (channelData) {
      console.log(channelData)
    })
    this.setState({ modal: false })
  }

  componentDidMount = () => {
    this.props.socket.on("channelResponse", (data) => {
      console.log("channelresponse frontend hit")
      console.log(data)
      this.props.createChannel(data, () => {
        console.log("back to create channel")
        console.log(data.Channels._id)
        this.props.selectchat(data.Channels._id)
      })
    })
  }


  // @Birna check this link for the types of effects you can add, i.e. onBlur, onFocus, onDrop...
  // https://redux-form.com/7.4.0/docs/api/field.md/

  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        <Modal isOpen={this.props.modal} onClick={this.toggle} className="modal-block2">
          <ModalHeader>Create New Channel</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(this.onSubmit)} className="form-horizontal">
              <div>
                <fieldset>
                  <label>Topic</label>
                  <Field
                    name="topic"
                    component={InputField}
                    className="form-control"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset>
                  <label>Description</label>
                  <Field
                    name="description"
                    component={InputField}
                    className="form-control"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset>
                  <label>Add Friends</label>
                  <Field
                    name="friends"
                    component={InputField}
                    className="form-control"
                  />
                </fieldset>
              </div>
              {/* <div>
                <fieldset>
                  <label>Media</label>
                  <Field
                    name="media"
                    label="media"
                    component={InputField}
                    className="form-control"
                  />
                </fieldset>
              </div>
              <div>
                <fieldset>
                  <label>Public</label>
                  <Field
                    name="public"
                    label="public"
                    component={InputField}
                    className="form-control"
                  />
                </fieldset>
              </div> */}
              <div>
                <br></br>
                <Button color="primary" type="submit" className="btn btn-block btn-radius btn-primary" onClick={this.toggle}>Create</Button>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { state };
}

export default compose(
  connect(mapStateToProps, { createChannel, InputField }),
  reduxForm({
    form: "newChannel"
  })
)(CreateChat);

// export default CreateChat;