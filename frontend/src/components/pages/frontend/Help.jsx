import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import Text from 'components/common/utils/Text';
import { Col, Row, Form } from 'reactstrap';
import { Formik } from 'formik';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import AlertMessage from 'components/common/utils/AlertMessage';
import Input from 'components/forms/Input';
import TextArea from 'components/forms/TextArea';
import { faqSchema } from 'components/forms/schema/frontPageSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import FAQs from 'data/faqs';
import { Accordion, AccordionItem } from 'react-light-accordion';
import Button from 'components/forms/Button';

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

export const HelpForm = () => {
  const [message, setMessage] = React.useState(null);
  return (
    <section className="brain-box-form spacer">
      <div className="container-fluid">
        <Row>
          <Col sm={{ size: 8, offset: 2 }}>
            <Formik
              initialValues={setInitialValues(faqSchema)}
              onSubmit={(values, actions) => {
                axios
                  .post('/api/v1/faq', values)
                  .then(function (response) {
                    const { data, status } = response;
                    if (status === 200) {
                      setMessage({
                        type: 'success',
                        message: data.message,
                      });
                      actions.setSubmitting(false);
                      actions.resetForm();
                    }
                  })
                  .catch(function (error) {
                    setMessage({
                      message: error.response.data.message,
                      lists:
                        error.response.data.errors &&
                        Object.values(error.response.data.errors),
                    });
                    actions.setSubmitting(false);
                  });
              }}
              render={({ isSubmitting, handleSubmit, ...props }) => (
                <Form>
                  <h2 className="header title-border mb-4">
                    CAN'T FIND <span>AN ANSWER</span>
                  </h2>
                  <AlertMessage {...message} />
                  <div className="form-row">
                    <Input
                      formGroupClassName="col-md-6"
                      label="Email"
                      name="userEmail"
                      placeholder="Email Address"
                    />
                    <Input
                      formGroupClassName="col-md-6"
                      label="Subject"
                      name="userSubject"
                      placeholder="Subject"
                    />
                  </div>
                  <TextArea
                    label="Question"
                    name="userMessage"
                    placeholder="Your Question"
                    rows="6"
                  />
                  <DisplayFormikState {...props} hide showAll />
                  <div className="form-row">
                    <Button
                      className="btn-danger btn-wide btn-transparent"
                      loading={isSubmitting}
                      onClick={handleSubmit}
                    >
                      Ask Question
                    </Button>
                  </div>
                </Form>
              )}
              validationSchema={createSchema(faqSchema)}
            />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export const getFAQs = ({ title, faqs }) => {
  const faqsList = faqs.map(({ question, answer }, index) => (
    <AccordionItem key={title + index} title={question}>
      {answer}
    </AccordionItem>
  ));

  return (
    <Col sm={{ size: 8, offset: 2 }}>
      <h4 className="accordion-header">{title}</h4>
      <Accordion atomic={true}>{faqsList}</Accordion>
    </Col>
  );
};

getFAQs.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.object.isRequired),
  title: PropTypes.string.isRequired,
};
export default Help;
