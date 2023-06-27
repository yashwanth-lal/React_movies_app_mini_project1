import {Component} from 'react'
import {AiOutlineSend} from 'react-icons/ai'
import emailjs from '@emailjs/browser'
import {Popup} from 'reactjs-popup'
import './index.css'

class MailPage extends Component {
  state = {
    emptyEmail: true,
    emptyName: true,
    emptyMessage: true,
    successEmail: false,
    targetElement: null,
  }

  sendEmail = () => {
    const {emptyEmail, emptyName, emptyMessage, targetElement} = this.state

    if (emptyEmail === false && emptyName === false && emptyMessage === false) {
      this.setState({successEmail: true})
      emailjs.sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        targetElement,
        process.env.REACT_APP_PUBLIC_KEY,
      ) //  (service_id,template_id,e.target,public_key)
    } else {
      this.setState({successEmail: false})
    }
  }

  submitEmail = e => {
    this.setState({successEmail: false})

    e.preventDefault()
    this.setState({targetElement: e.target})

    if (e.target.elements[0].value === '') {
      this.setState({
        emptyEmail: true,
      })
    } else {
      this.setState({emptyEmail: false})
    }
    if (e.target.elements[1].value === '') {
      this.setState({
        emptyName: true,
      })
    } else {
      this.setState({emptyName: false})
    }
    if (e.target.elements[2].value === '') {
      this.setState({
        emptyMessage: true,
      })
    } else {
      this.setState({emptyMessage: false}, this.sendEmail)
    }

    // alert('The mail has been sent successfully to yashwanth lal')
  }

  render() {
    const {emptyEmail, emptyName, emptyMessage, successEmail} = this.state
    const hideForm = successEmail ? 'hiddenForm' : 'contact__form'
    const overlayStyles = {
      background: '#4837b16b',
      zindex: 5,
      width: '100%',
      height: '100%',
    }
    return (
      <div className="popup-container">
        <Popup
          modal
          trigger={
            <button type="button" className="trigger-button">
              Mail Us
            </button>
          }
          overlayStyle={overlayStyles}
        >
          {close => (
            <>
              <div className="closeBtnDiv">
                <button
                  type="button"
                  className="close-button"
                  onClick={() => close()}
                >
                  Close
                </button>
              </div>
              <div className="App">
                <form onSubmit={this.submitEmail} className={hideForm}>
                  <label htmlFor="email_From">Email:</label>

                  <input
                    type="email"
                    name="emailFrom"
                    id="email_From"
                    className="email_from"
                    placeholder="Enter Your Email"
                  />
                  {emptyEmail && <p className="requiredErrMsg">*Required</p>}
                  <label htmlFor="name_From">Name:</label>
                  <input
                    type="text"
                    name="nameFrom"
                    id="name_From"
                    className="email_from"
                    placeholder="Your Name"
                  />
                  {emptyName && <p className="requiredErrMsg">*Required</p>}

                  <label htmlFor="message">Message:</label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Enter Your Message"
                    className="message_box"
                    cols="50"
                    rows="10"
                  >
                    {}
                  </textarea>
                  {emptyMessage && <p className="requiredErrMsg">*Required</p>}

                  <button
                    // onSubmit={this.submitEmail}
                    type="submit"
                    className="sendEmailButton"
                  >
                    <AiOutlineSend className="sendIcon" />
                    <span className="sendPara">Send</span>
                  </button>
                </form>
                {successEmail && (
                  <p className="successMsg">
                    The mail has been sent successfully to yashwanth lal
                  </p>
                )}
              </div>
            </>
          )}
        </Popup>
      </div>
    )
  }
}
export default MailPage
