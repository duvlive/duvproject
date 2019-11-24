import React from 'react';
import PropTypes from 'prop-types';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import Text from 'components/common/utils/Text';
import { Col, Row } from 'reactstrap';
import FAQs from 'data/faqs';
import { Accordion, AccordionItem } from 'react-light-accordion';

const Help = () => {
  return (
    <div className="help-section">
      <FrontEndPage title="Help">
        <HelpSection />
        <FAQsSection />
        <HelpForm />
      </FrontEndPage>
    </div>
  );
};

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
        <div className="subtitle--3">
          Can't find an answer, you can ask us your questions directly below
        </div>
      </Text.VerticalAlign>
    </Col>
  </section>
);

const FAQsSection = () => (
  <section className="faqs spacer--3">
    <div className="container-fluid">
    <h2 className="header title-border offset-sm-2">
        Frequently <span>Asked Questions</span>
      </h2>
      <Row>
        {getFAQs(FAQs.general)}
        {getFAQs(FAQs.entertainers)}
        {getFAQs(FAQs.users)}
      </Row>
    </div>
  </section>
);

export const HelpForm = () => (
  <section className="brain-box-form spacer">
    <div className="container-fluid">
      <Row>
        <Col sm={{ size: 8, offset: 2}}>
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

export const getFAQs = ({ title, faqs }) => {
  const faqsList = faqs.map(({ question, answer }, index) => (
    <AccordionItem key={title + index} title={question}>
      {answer}
    </AccordionItem>
  ));

  return (
    <Col sm={{ size: 8, offset: 2}}>
      <h4 className="accordion-header">{title}</h4>
      <Accordion atomic={true}>{faqsList}</Accordion>
    </Col>
  );
};

getFAQs.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.object.isRequired),
  title: PropTypes.string.isRequired
};
export default Help;
