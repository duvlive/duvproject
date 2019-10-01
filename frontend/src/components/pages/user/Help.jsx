import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import FAQs from 'data/faqs';
import { Row } from 'reactstrap';
import { getFAQs } from 'components/pages/frontend/Help';
import BackEndPage from 'components/common/layout/BackEndPage';

const Help = () => (
  <BackEndPage title="Help">
    <div className="main-app">
      <TopMessage message="Help" />

      <section className="app-content">
        <FAQsSection />
        <HelpForm />
      </section>
    </div>
  </BackEndPage>
);

const FAQsSection = () => (
  <section className="faqs">
    <Row>
      {getFAQs(FAQs.general)}
      {getFAQs(FAQs.entertainers)}
      {getFAQs(FAQs.users)}
    </Row>
  </section>
);

export const HelpForm = () => (
  <section className="brain-box-form spacer--3">
    <form>
      <h4 className="header title-border mb-4">
        Need Help, <span>Contact Us</span>
      </h4>
      <div className="form-row mb-2">
        <div className="form-group col-sm-8">
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
      <button className="btn btn-danger btn-transparent btn-lg" type="submit">
        Send Message
      </button>
    </form>
  </section>
);

export default Help;
