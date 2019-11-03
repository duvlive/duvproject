import React from 'react';
import { Col, Row } from 'reactstrap';
import FrontEndPage from 'components/common/layout/FrontEndPage';

const TermsOfUse = () => (
  <FrontEndPage title="Terms of Use">
    <Content />
  </FrontEndPage>
);

const Content = () => (
  <section class="text-only_content spacer">
    <div className="container-fluid terms-of-use">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h2 className="header h1 text-uppercase text-center mb-4">
            Welcome <span>to DUV Live</span>
          </h2>
          <p>
            Thanks for using our products and services. The Services are
            provided by DUV LIVE Entertainment, located at 46,Omoruyi Street,
            Aduwawa, Edo,Nigeria.
          </p>

          <p>
            By using our Services, you are agreeing to these terms and
            conditions. Please read them carefully.
          </p>
          <p>
            Our Services are very diverse, so sometimes additional terms or
            product requirements (including age requirements) may apply.
            Additional terms will be available with the relevant Services, and
            those additional terms become part of your agreement with us if you
            use those Services.
          </p>

          <h5>Using our Services</h5>
          <p>
            You must follow any policies made available to you within the
            Services.
          </p>
          <p>
            Don’t misuse our Services. For example, don’t interfere with our
            Services or try to access them using a method other than the
            interface and the instructions that we provide. You may use our
            Services only as permitted by control laws and regulations. We may
            suspend or stop providing our Services to you if you do not comply
            with our terms or policies or if we are investigating suspected
            misconduct.
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
            announcements, administrative messages, and other information. You
            may opt-out of some of those communications.
          </p>
          <p>
            Some of our Services are available on mobile devices. Do not use
            such Services in a way that distracts you and prevents you from
            obeying traffic or safety laws.
          </p>

          <h5>Your DUV LIVE Account</h5>
          <p>
            You may need a DUV LIVE Account in order to use some of our
            Services. You may create your own User or Entertainer Account.{' '}
          </p>
          <p>
            To protect your Account, keep your password confidential. You are
            responsible for the activity that happens on or through your
            Account. Try not to reuse your Account password on third-party
            applications. If you learn of any unauthorized use of your password
            or DUV LIVE Account, follow these instructions.
          </p>

          <h5>Privacy and Copyright Protection</h5>
          <p>
            DUV LIVE’s privacy policies explain how we treat your personal data
            and protect your privacy when you use our Services. By using our
            Services, you agree that DUV LIVE can use such data in accordance
            with our privacy policies.
          </p>
          <p>
            We respond to notices of alleged copyright infringement and
            terminate accounts of repeat infringers according to the process set
            out in the operating country's Copyright Act.
          </p>

          <h5>Modifying and Terminating our Services</h5>
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

          <h5>Our Warranties and Disclaimers</h5>
          <p>
            We provide our Services using a commercially reasonable level of
            skill and care and we hope that you will enjoy using them. But there
            are certain things that we don’t promise about our Services.
          </p>
          <p>
            Other than as expressly set out in these terms or additional terms,
            neither DUV LIVE nor its affiliates make any specific promises about
            the Services. For example, we don’t make any commitments about the
            content within the Services, the specific functions of the Services,
            or their reliability, availability, or ability to meet your needs.
            We provide the Services “as is”.
          </p>

          <h5>Liability for our Services</h5>
          <p>
            When permitted by law, DUV LIVE will not be responsible for lost
            profits, revenues, or data, financial losses or indirect, special,
            consequential, exemplary, or punitive damages.
          </p>
          <p>
            To the extent permitted by law, the total liability of DUV LIVE, for
            any claims under these terms, including for any implied warranties,
            is limited to the amount you paid us to use the Services (or, if we
            choose, to supplying you the Services again).
          </p>
          <p>
            In all cases, DUV LIVE will not be liable for any loss or damage
            that is not reasonably foreseeable. We recognize that in some
            countries, you might have legal rights as a consumer. If you are
            using the Services for a personal purpose, then nothing in these
            terms or any additional terms limits any consumer legal rights which
            may not be waived by contract.
          </p>

          <h5>Business uses of our Services</h5>
          <p>
            If you are using our Services on behalf of a business, that business
            accepts these terms. It will hold harmless and indemnify DUV LIVE
            and its affiliates, officers, agents, and employees from any claim,
            suit or action arising from or related to the use of the Services or
            violation of these terms, including any liability or expense arising
            from claims, losses, damages, suits, judgments, litigation costs and
            attorneys’ fees.
          </p>
          <p>
            If there is a conflict between these terms and the additional terms,
            the additional terms will control for that conflict.
          </p>
          <p>
            These terms control the relationship between DUV LIVE and you. They
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
