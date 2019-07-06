import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import Text from 'components/common/Text';
import { Col, Row } from 'reactstrap';
import FAQs from 'data/faqs';
import DuvLiveModal from 'components/custom/Modal';

const Help = () => {
  return (
    <div className="help-section">
      <LandingSection />
      <HelpSection />
      <FAQsSection />
      <HelpForm />
      <Footer />
    </div>
  );
};

const LandingSection = () => (
  <section className="landing">
    <div className="card card__menu bg-dark text-white">
      <Header />
      <div className="card-img-overlay">
        <div className="card-img-overlay__content">
          <h2 className="card-title">HELP</h2>
          <p className="card-subtitle">DUV LIVE &nbsp;/ &nbsp;Help</p>
        </div>
      </div>
    </div>
  </section>
);

const HelpSection = () => (
  <section className="help">
    <Col className="help__content--1 help__box" sm="4">
      <Text.VerticalAlign>
        <h2>
          Hello,
          <br /> How can we help you?
        </h2>
      </Text.VerticalAlign>
    </Col>
    <Col className="help__content--2 help__box" sm="8">
      <Text.VerticalAlign>
        <h3>
          FAQs, help, and official info on every DUV LIVE feature can be found
          below.
        </h3>
        <form>
          <input
            aria-label="Search"
            className="form-control form-control-lg mt-5 help__search"
            placeholder="Search"
            type="text"
          />
        </form>
      </Text.VerticalAlign>
    </Col>
  </section>
);

const FAQsSection = () => (
  <section className="faqs spacer">
    <div className="container-fluid">
      <Row>
        {getFAQs(FAQs.general)}
        <Col sm="4">
          <h4>HIRING AN ENTERTAINER</h4>
          <ul>
            <li>Aliquam tincidunt mauris eu risus.</li>
            <li>Vestibulum auctor dapibus neque.</li>
            <li>Nunc dignissim risus id metus.</li>
            <li>Cras ornare tristique elit.</li>
            <li>Vivamus vestibulum ntulla nec ante.</li>
          </ul>
        </Col>
        <Col sm="4">
          <h4>LOGIN/REGISTRATION</h4>
          <ul>
            <li>Aliquam tincidunt mauris eu risus.</li>
            <li>Vestibulum auctor dapibus neque.</li>
            <li>Nunc dignissim risus id metus.</li>
            <li>Cras ornare tristique elit.</li>
            <li>Vivamus vestibulum ntulla nec ante.</li>
          </ul>
        </Col>
        <div className="separator" />
        <Col sm="4">
          <h4>BECOMING AN ENTERTAINER</h4>
          <ul>
            <li>Aliquam tincidunt mauris eu risus.</li>
            <li>Vestibulum auctor dapibus neque.</li>
            <li>Nunc dignissim risus id metus.</li>
            <li>Cras ornare tristique elit.</li>
            <li>Vivamus vestibulum ntulla nec ante.</li>
          </ul>
        </Col>
        <Col sm="4">
          <h4>PAYMENT ISSUES</h4>
          <ul>
            <li>Aliquam tincidunt mauris eu risus.</li>
            <li>Vestibulum auctor dapibus neque.</li>
            <li>Nunc dignissim risus id metus.</li>
            <li>Cras ornare tristique elit.</li>
            <li>Vivamus vestibulum ntulla nec ante.</li>
          </ul>
        </Col>
        <Col sm="4">
          <h4>EVENTS</h4>
          <ul>
            <li>Aliquam tincidunt mauris eu risus.</li>
            <li>Vestibulum auctor dapibus neque.</li>
            <li>Nunc dignissim risus id metus.</li>
            <li>Cras ornare tristique elit.</li>
            <li>Vivamus vestibulum ntulla nec ante.</li>
          </ul>
        </Col>
      </Row>
    </div>
  </section>
);

const HelpForm = () => (
  <section className="brain-box-form spacer">
    <div className="container-fluid">
      <Row>
        <Col sm="8">
          <form>
            <h2 className="header title-border mb-4">
              CAN'T FIND <span>AN ANSWER</span>
            </h2>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="subject">Subject</label>
                <input
                  className="form-control"
                  id="subject"
                  placeholder="Subject"
                  type="text"
                />
              </div>
            </div>
            <div className="form-row mb-2">
              <div className="form-group col-md-12">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  placeholder="Questions, Complaints or Suggestions"
                  rows="8"
                />
              </div>
            </div>
            <button
              className="btn btn-danger btn-transparent btn-lg"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </Col>
      </Row>
    </div>
  </section>
);

const getFAQs = ({ title, faqs }) => {
  const faqsList = faqs.map(({ question, answer }) => (
    <DuvLiveModal body={answer} title={question}>
      <li>{question}</li>
    </DuvLiveModal>
  ));

  return (
    <Col sm="4">
      <h4 className="text-uppercase">{title}</h4>
      <ul>{faqsList}</ul>
    </Col>
  );
};

getFAQs.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.object.isRequired),
  title: PropTypes.string.isRequired
};
export default Help;
