import React from 'react';
import { Col, Row } from 'reactstrap';
import FrontEndPage from 'components/common/layout/FrontEndPage';

const TermsOfUse = () => (
  <FrontEndPage title="Terms of Use">
    <Content />
  </FrontEndPage>
);

const Content = () => (
  <section className="text-only_content spacer">
    <div className="container-fluid terms-of-use">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h2 className="header h1 text-uppercase text-center mb-4">
            Welcome <span>to DUV Live</span>
          </h2>
          <p>
            Thanks for using DUVLIVE. Henceforth referred to as 'The Platform',
            ‘DUVLIVE’ refers to the entertainment services company that operates
            the above named website. The range of services we provide on The
            Platform will henceforth be referred to as The Services or Our
            Services.
          </p>

          <h4>Using our Platform</h4>

          <p>
            In order to continue enjoying the use of our services, you must
            follow any policies made available to you within the Platform.
          </p>
          <p>
            Using our Services does not give you ownership of any intellectual
            property rights in our Services or the content you access. You may
            not use content from our Services unless you obtain permission from
            its owner or are otherwise permitted by law. These terms do not
            grant you the right to use any branding or logos used in our
            Services. Don’t remove, obscure, or alter any legal notices
            displayed in or along with our Services.
          </p>
          <p>
            Our Services display some content that is not DUV LIVE's. This
            content is the sole responsibility of the entity that makes it
            available. We may review content to determine whether it is illegal
            or violates our policies, and we may remove or refuse to display
            content that we reasonably believe violates our policies or the law.
            But that does not necessarily mean that we review content, so please
            don’t assume that we do.
          </p>

          <p>
            In connection with your use of the Services, we may send you service
            announcements and other information. You may opt-out of some of
            those communications.
          </p>

          <h4>Your DUV LIVE Account</h4>
          <p>
            You may need a DUV LIVE Account in order to use some of our
            Services. You may create your own User or Entertainer Account.{' '}
          </p>
          <p>
            To protect your Account, keep your password confidential. You are
            responsible for the activity that happens on or through your
            Account. Try not to reuse your Account password on third-party
            applications.
          </p>

          <h4>Copyright Protection</h4>
          <p>
            We respond to notices of alleged copyright infringement and
            terminate accounts of repeat infringers according to the process set
            out in the operating jurisdiction's Copyright Act.
          </p>

          <h4>Your Content in our Services</h4>
          <p>
            Some of our Services allow you to upload, submit, store and share
            content. You retain ownership of any intellectual property rights
            that you hold in that content. In short, what belongs to you stays
            yours.
          </p>

          <h4>Modifying and Terminating our Services</h4>
          <p>
            We are constantly changing and improving our Services. We may add or
            remove functionalities or features, and we may suspend or stop a
            Service altogether.
          </p>
          <p>
            You can stop using our Services at any time, although we’ll be sorry
            to see you go. DUV LIVE may also stop providing Services to you, or
            add or create new limits to our Services at any time.
          </p>

          <h4>Our Warranties and Disclaimers</h4>
          <p>
            We provide our Services using a commercially reasonable level of
            skill and care and we hope that you will enjoy using them. But there
            are certain things that we don’t promise about our Services.
          </p>
          <p>
            Other than as expressly set out in these terms or additional terms,
            neither DUV LIVE nor its affiliates make any specific promises about
            the Services. For example, we don’t make any commitments about the
            content within the Services, since We provide the Services “as is”.
          </p>

          <h4>Liability for our Services</h4>
          <p>
            When permitted by law, DUV LIVE will not be responsible for lost
            profits, revenues, or data, financial losses or indirect, special,
            consequential, exemplary, or punitive damages.
          </p>
          <p>
            To the extent permitted by law, the total liability of DUV LIVE, for
            any claims under these terms, including for any implied warranties,
            is limited to the amount you paid us to use the Services.
          </p>
          <p>
            In all cases, DUV LIVE will not be liable for any loss or damage
            that is not reasonably foreseeable.
          </p>
          <p>
            We recognize that in some countries, you might have legal rights as
            a consumer. If you are using the Services for a personal purpose,
            then nothing in these terms or any additional terms limits any
            consumer legal rights which may not be waived by contract.
          </p>
          <p>
            It is hereby provided that the platform shall be exempted from all
            forms of liability
          </p>
          <ol>
            <li>
              It shall not be vicariously liable for criminal acts arising from
              the violations of the copyright legislation brought about by the
              act of the Entertainer.
            </li>
          </ol>

          <h4>Business uses of our Services</h4>
          <p>
            If you are using our Services on behalf of a business, that business
            accepts these terms. It will hold harmless and indemnify DUV LIVE
            and its affiliates, officers, agents, and employees from any claim,
            suit or action arising from or related to the use of the Services,
            including any liability or expense arising from claims, losses,
            damages, suits, judgments, litigation costs and attorneys’ fees.
          </p>
          <p>
            If there is a conflict between these terms and the additional terms,
            the additional terms will control for that conflict.
          </p>
          <p>
            These terms control the relationship between DUV LIVE and YOU. They
            do not create any third party beneficiary rights.
          </p>
          <p>
            If you do not comply with these terms, and we don’t take action
            right away, this doesn’t mean that we are giving up any rights that
            we may have (such as taking action in the future).
          </p>
          <p>
            If it turns out that a particular term is not enforceable, this will
            not affect any other terms.
          </p>
        </Col>
      </Row>

      <p />
    </div>
  </section>
);

export default TermsOfUse;
