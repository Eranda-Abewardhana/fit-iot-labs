import React, { useState, useEffect } from 'react';
import contactStyles from '../styles/contactForm.module.css';

const ContactForm = () => {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyt8RacL9HlYXKbpj89SluMpjWqa11illSAnKZ9Bc5-dEnAHSTrmZW3yWrpVmhDw_6Y9g/exec'; // Replace with your Google Script URL
  const [formStatus, setFormStatus] = useState(null); // To track form submission status
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormStatus(null);
      setIsButtonDisabled(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [formStatus]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsButtonDisabled(true);
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: new FormData(e.target),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Error during form submission:', error.message);
      setFormStatus('error');
    }
  };

  return (
    <form
      id="contact-form"
      className={` ${contactStyles.align}`}
      style={{ display: 'block', margin: '0 10vw ' }}
      name="submit-to-google-sheet"
      onSubmit={handleSubmit}
    >
          <div className="row">
        <div className="col-md-6">
          <div className="md-form mb-0">
            <label htmlFor="name">
              <b>Your name</b>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              style={{ borderRadius: '20px', border: '1px solid darkgrey' }}
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="md-form mb-0">
            <label htmlFor="email">
              <b>Your email</b>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              style={{ borderRadius: '20px', border: '1px solid darkgrey' }}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="md-form mb-0">
            <label htmlFor="subject">
              <b>Subject</b>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="form-control"
              style={{ borderRadius: '20px', border: '1px solid darkgrey' }}
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="md-form">
            <label htmlFor="message">
              <b>Message</b>
            </label>
            <textarea
              type="text"
              id="message"
              name="message"
              rows="2"
              className="form-control md-textarea"
              style={{ borderRadius: '20px', border: '1px solid darkgrey' }}
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="text-center text-md-left" style={{ padding: '5px', margin: '30px' }}>
        <button className="btn btn-primary" style={{ borderRadius: '10px' }} type="submit" disabled={isButtonDisabled}>
          Submit
        </button>
      </div>

      {formStatus === 'success' && (
        <div className="alert alert-success mt-3" style={{ borderRadius: '10px' }}>
          Message sent successfully!
        </div>
      )}
      {formStatus === 'error' && (
        <div className="alert alert-danger mt-3" style={{ borderRadius: '10px' }}>
          Error sending message. Please try again.
        </div>
      )}
    </form>
  );
};

export default ContactForm;
