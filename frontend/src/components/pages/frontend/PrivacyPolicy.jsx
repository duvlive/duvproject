import React from 'react';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import { Col, Row } from 'reactstrap';
import { Link } from '@reach/router';

const PrivacyPolicy = () => (
  <FrontEndPage title="Privacy Policy">
    <Content />
  </FrontEndPage>
);

const Content = () => (
  <section className="text-only_content spacer">
    <div className="container-fluid">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h2 className="header h1 text-uppercase text-center mb-4">
            Privacy <span>Policy</span>
          </h2>
          <p>
            When you use DUV LIVE, you trust us with your personal data. We’re
            committed to keeping that trust. That starts with helping you
            understand our privacy practices.
          </p>
          <p>
            We may occasionally update this notice. If we make significant
            changes, we will notify users of the changes through the web app or
            through other means, such as email. We encourage users to
            periodically review this notice for the latest information on our
            privacy practices. After such notice, use of our services by users
            will be understood as consent to the updates to the extent permitted
            by law.
          </p>
          <p>
            This notice describes the personal data we collect, how it’s used
            and shared, and your choices regarding this data. We recommend that
            you read this as we highlight key points about our privacy
            practices.
          </p>
          <p>
            For ease of comprehension, ALL those subject to this notice are
            collectively referred to as <strong>“Users”</strong> in this notice.
            The different classes of Users include, but are not limited to:
          </p>
          <p>
            <strong>EVENT HOSTs:</strong> individuals who request or receive
            entertainment services from any of the entertainer categories.
          </p>
          <p>
            <strong>ENTERTAINERs:</strong> individuals who provide, or submit
            applications to DUV LIVE with the intention to individually or
            through partnerships, provide entertainment services to event hosts.
          </p>
          <p>
            <strong>PROMOTERs:</strong> individuals or organisations that put up
            notices about upcoming events for public information.
          </p>
          <p>
            <strong>VISITORs:</strong> individuals who access DUV LIVE's website
            and look through without signing up or signing in.
          </p>
          <h4 className="mt-5">i. SCOPE</h4>
          <p>
            This notice applies to Users of DUV LIVE's services anywhere,
            including Users of our website, features, or other services.
          </p>
          <p>
            This notice describes how DUV LIVE and its affiliates collect and
            use personal data. This notice applies to all users anywhere in
            Nigeria.
          </p>
          <p>
            Our data practices are subject to applicable laws in the region in
            which we operate. This means that we engage in the practices
            described in this notice in a particular region only if permitted
            under the laws of that region. Please{' '}
            <Link to="/contact-us">contact us here</Link> or through the
            addresses below with any questions regarding our practices in any
            particular region of operation.
          </p>
          <p>
            DUV LIVE is the data controller for the personal data collected in
            connection with the use of DUV LIVE's website and services in
            Nigeria.
          </p>
          <p>
            Questions, comments, and complaints about DUV LIVE's data practices
            can be <Link to="/contact-us">submitted here</Link>.
          </p>

          <h4 className="mt-5"> ii. What Data Do We Collect?</h4>
          <p>
            The following data is collected by DUV LIVE, or on our behalf:
            <ol>
              <li>Data provided by users during account creation </li>
              <li>
                Data created during use of our services, such as app usage and
                device data
              </li>
              <li>Data from other sources.</li>
            </ol>
          </p>
          <h6 className="mt-5">
            1. Data provided by users during account creation{' '}
          </h6>
          <p className="">
            This includes:
            <ol>
              <li>
                <strong>User profile:</strong> We collect data when users create
                or update their accounts. This may include their full name,
                email, phone number and password, address, profile picture,
                payment or banking information, government issued identification
                including identification numbers, birthdate, exhibition videos
                and photo.
              </li>
              <li>
                <strong>User content:</strong> We collect the information users
                upload on our platform and wish to display to the public. This
                may include feedback from other users, photographs or other
                video recordings collected by Entertainers.
              </li>
            </ol>
          </p>

          <h6 className="mt-5">
            2. Data created during use of our services, such as app usage and
            device data Data from other sources.
          </h6>
          <p className="">
            This includes:
            <ol>
              <li>
                <strong>Location data:</strong> We collect precise or
                approximate location data from a user’s mobile device if enabled
                by the user to do so. We may also collect this data when DUV
                LIVE's web app is running on the user’s mobile device but only
                by enabling location data collection from their mobile devices.
              </li>
              <li>
                <strong>Transaction information:</strong> We collect transaction
                information related to the use of our services, including the
                type of services requested or provided, order details, date and
                time the service was provided, amount charged, and payment
                method. Additionally, if someone uses your promotion code, we
                may associate your name with that person.
              </li>
              <li>
                <strong> Usage data:</strong> We collect data about how users
                interact with our services. This includes data such as access
                dates and times, app features or pages viewed, app crashes and
                other system activity, type of browser, and third-party sites or
                services used before interacting with our services. In some
                cases, we collect this data through tracking technologies that
                create and maintain unique identifiers. We do not currently
                collect cookie data, but may do so in the future.
              </li>
              <li>
                <strong> Device data:</strong> We may collect data about the
                devices used to access our services, including the hardware
                models, device IP address, operating systems and versions,
                software, preferred languages, unique device identifiers, serial
                numbers, and mobile network data.
              </li>
              <li>
                <strong>Communications data:</strong> We enable users to
                communicate with each other and with DUV LIVE through our
                website. For example, we enable Event Hosts to send offers to
                Entertainers and receive responses as well. DUV LIVE may also
                use this data for customer support services (including to
                resolve disputes between users), for safety and security
                purposes, to improve our products and services, and for
                analytics.
              </li>
            </ol>
          </p>

          <h6 className="mt-5">3. Data from other sources.</h6>
          <p className="">
            This includes:
            <ol>
              <li>
                User feedback, such as ratings, complaints or compliments.
              </li>
              <li>
                Users participating in our referral programs. For example, when
                Users refer other people, we receive the referred persons'
                personal data from those Users.
              </li>
              <li>
                Account owners who request services for or on behalf of other
                users, or who enable such users to request or receive services
                through their accounts.
              </li>
              <li>
                Users or others providing information in connection with claims
                or disputes.
              </li>
            </ol>
          </p>

          <h4 className="mt-5"> iii. How Do We Use Personal Data?</h4>
          <p>
            We collect and use data to enable the reliable and convenient
            transacting in entertainment services, and other services. We also
            use the data we collect:
            <ol>
              <li>
                To enhance the safety and security of our users and services
              </li>
              <li>
                To provide services and features:
                <br />
                DUV LIVE uses the data we collect to provide, personalize,
                maintain, and improve our products and services.
                <br />
                This includes using the data to:
                <ol>
                  <li>Create and update users’ accounts.</li>
                  <li>
                    Verify Entertainers’ identity, history, and eligibility to
                    work.
                  </li>
                  <li>
                    Offer, process, or facilitate payments for our services.
                  </li>
                  <li>
                    Enable features that allow users to share information with
                    other people, such as when Users submit a compliment about
                    an Entertainer or refer a friend to DUV LIVE.
                  </li>
                  <li>
                    Automated Decision Making such as making Entertainer
                    recommendations to Users who can then pick their choice of
                    entertainer from a suggested list by using criteria such as
                    pricing, location and performing language at any given
                    moment.
                  </li>
                </ol>
              </li>
              <li>For customer support</li>
              <li>For research and development</li>
              <li>To enable communications between users</li>
              <li>
                To send marketing and non-marketing communications to users.
              </li>
            </ol>
            We do not sell or share user personal data with third parties for
            their direct marketing, except with users’ consent.
          </p>

          <h4 className="mt-5">iv. What Are The Rights Of A Data Subject?</h4>
          <p>
            Subject to possible restrictions under national law, as a data
            subject, you have the right to access, rectification, erasure,
            restriction of processing and data portability with regard to your
            personal data. In addition, you can withdraw your consent and object
            to our processing of your personal data on the basis of legitimate
            interests. You can also lodge a complaint with a regulatory
            authority.
          </p>
          <p className="lead text-white mb-1">Your rights in detail:</p>
          <p>
            You can withdraw your consent to the processing of your personal
            data by us at any time. As a result, we may no longer process your
            personal data based on this consent in the future. The withdrawal of
            consent has no effect on the lawfulness of processing based on
            consent before its withdrawal.
          </p>
          <p>
            You have the right to obtain access to your personal data that is
            being processed by us. In particular, you may request information on
            the purposes of the processing, the categories of personal data
            concerned, the categories of recipients to whom the personal data
            have been or will be disclosed, the envisaged period for which the
            personal data will be stored, the existence of the right to request
            rectification or erasure of personal data or restriction of
            processing of personal data ,or to object to such processing, the
            right to lodge a complaint with a supervisory authority and any
            available information as to the personal data’s source (where they
            are not collected from you). Your right to access may be limited by
            national law.
          </p>
          <p>
            You have the right to obtain from us without undue delay the
            rectification of inaccurate personal data concerning you. Taking
            into account the purposes of the processing, you have the right to
            have incomplete personal data completed, including by means of
            providing a supplementary statement.
          </p>
          <p>
            You have the right to obtain from us the erasure of personal data
            concerning you, unless processing is necessary for compliance with a
            legal obligation, for reasons of public interest or for the
            establishment, exercise or defense of legal claims. The right to
            erasure may be limited by national law.
          </p>
          <p>
            You have the right to obtain from us restriction of processing to
            the extent that the accuracy of the data is disputed by you, the
            processing is unlawful, or you have objected to the processing of
            personal data.
          </p>
          <p>
            You have the right to receive the personal data concerning you,
            which you have provided to us, in a structured, commonly used and
            machine-readable format and have the right to transmit those data to
            another controller ("right to data portability").
          </p>
          <p>
            You have the right to lodge a complaint with a supervisory
            authority. As a rule, you can contact the supervisory authority of
            your usual place of residence, your place of work or the registered
            office of the data controller.
          </p>
          <p>
            If your personal data is processed on the basis of legitimate
            interests, you have the right to object to the processing of your
            personal data on grounds relating to your particular situation. This
            also applies to profiling. If your personal data is processed by us
            for direct marketing purposes, you have the right to object at any
            time to the processing of your personal data for such marketing,
            which includes profiling to the extent that it is related to such
            direct marketing.
          </p>
          <p>
            The exercise of the above data subjects’ rights (e.g. right to
            access or erasure) is generally free of charge. Where requests are
            evidently unfounded or excessive, in particular because of their
            repetitive nature, we may charge an appropriate fee (at most our
            actual costs) in accordance with the applicable statutory
            regulations or refuse to process the application.
          </p>

          <h4 className="mt-5">v. What Third-party Technologies Do We Use?</h4>
          <p>
            DUV LIVE makes use of identification technology offered by its
            affiliates in:
            <ol>
              <li>Authenticating users</li>
              <li>Determining the popularity of content</li>
              <li>
                Delivering and measuring the effectiveness of advertising
                campaigns
              </li>
              <li>
                Analyzing site traffic and trends, and generally understanding
                the online behaviors and interests of people who interact with
                our services.
              </li>
            </ol>
            We may also allow others to provide audience measurement and
            analytics services for us, to serve advertisements on our behalf
            across the Internet, and to track and report on the performance of
            those advertisements. These entities may use cookies and other
            technologies to identify the devices used by visitors to our
            websites, as well as when they visit other online sites and
            services.
          </p>

          <h4 className="mt-5">vi. How Do We Share and Disclose Data?</h4>
          <p>
            Some of DUV LIVE's products, services, and features require that we
            share data with other users or at a user’s request. We may also
            share data with our affiliates and partners, for legal reasons or in
            connection with claims or disputes.
          </p>
          <p>DUV LIVE may share the data we collect:</p>

          <p className="lead text-white mb-1">1. With Other Users</p>
          <p>
            This includes sharing:
            <ul>
              <li>
                Entertainers' Stage name, rating, feedback from previous Event
                Hosts, preferred operating location, profile photo, video
                content and pricing, with interested Event Hosts.
              </li>
              <li>
                Event Host’ first name, event address, and offer information,
                with interested entertainers.
              </li>
              <li>
                We also provide event hosts with receipts containing information
                such as a breakdown of amounts charged, the nature of the event
                and such other information required on invoices in the region
                where the service is paid for.
              </li>
              <li>
                For those who participate in our referral program, we share
                certain personal data of referred users, such as event count,
                with the user who referred them, to the extent relevant to
                determining their referral bonus.
              </li>
            </ul>
          </p>

          <p className="lead text-white mb-1">2. With the general public</p>
          <p>
            <ul>
              <li>
                Questions or comments from users submitted through public forums
                such as DUV LIVE's social media pages may be viewable by the
                public, including any personal data included in the questions or
                comments submitted by a user.
              </li>
              <li>
                Profile photo, stage name and bio of entertainers can be viewed
                by the general public i.e. any visitor on the website.
              </li>
              <li>
                Events posted for public display by users can be viewed by
                visitors to the website.
              </li>
            </ul>
          </p>

          <p className="lead text-white mb-1">
            3. For legal reasons or in the event of a dispute
          </p>
          <p>
            We may share users’ personal data if we believe it’s required by
            applicable law, regulation, operating license or agreement, legal
            process or governmental request, or where the disclosure is
            otherwise appropriate due to similar concerns. This includes sharing
            personal data with law enforcement officials, regulatory bodies,
            other government authorities, or other third parties as necessary to
            enforce our user agreements, or other policies;
          </p>

          <p className="lead text-white mb-1">4. With consent</p>
          <p>
            DUV LIVE may share a user’s personal data other than as described in
            this notice if we notify the user and they consent to the sharing.
          </p>

          <h4 className="mt-5">vii. Storage duration and erasure</h4>
          <p>
            Your personal data will be stored by us and our service providers in
            accordance with applicable data protection laws to the extent
            necessary for the processing purposes set out in this User Privacy
            Notice. As far as legally permissible or required, we restrict the
            processing of your data, instead of deleting it (e.g. by restricting
            access to it). This applies in particular to cases where we may
            still need the data for the execution of the contract or for the
            assertion of or defense against legal claims. In these cases, the
            duration of the restriction of processing depends on the respective
            statutory limitation or retention periods. The data will be deleted
            after the relevant limitation or retention periods have expired.
          </p>
          <p>
            How long we retain personal data may vary depending on the Services
            we provide and our legal obligations under applicable national law.{' '}
          </p>

          <h4 className="mt-5">viii. User data requests</h4>
          <p>
            We provide users with a variety of ways to learn about, control, and
            submit questions and comments about the handling of their data.
            <ol>
              <li>
                <strong>Accessing data:</strong> Users can ask for an
                explanation of the data we collect from them and how we use it.
              </li>
              <li>
                <strong>Receiving data:</strong> Users can ask for a copy of
                data that we collect from them with their consent or as
                necessary to provide our services.
              </li>
              <li>
                <strong>Changing or updating data:</strong> Users can edit the
                name, phone number, email address, and photo associated with
                their account through the Edit Profile menu in their profile
                portal. They may do so if they believe such data is inaccurate
                or incomplete.
              </li>
              <li>
                <strong>Deactivating Accounts:</strong> Users may request
                deactivation of their account at any time through the
                deactivation option in their account portal.{' '}
              </li>
              <li>
                Objections, restrictions, and complaints: Users may request that
                we stop using some of their personal data, or that we limit our
                use of their data. We may however continue to process data after
                such objection or request to the extent required or permitted by
                law.
              </li>
            </ol>
          </p>

          <h4 className="mt-5">ix. Data security</h4>
          <p>
            We protect your personal data through technical and organizational
            security measures to minimize risks associated with data loss,
            misuse, unauthorized access and unauthorized disclosure and
            alteration. To this end we use firewalls and data encryption, for
            example, and authorization controls for data access.
          </p>
          <p>
            However, you also bear responsibility for the security of your data.
            You exercise this responsibility by keeping your personal and log-in
            details safe and secure, using strong passwords, and logging out of
            your accounts when using other devices in order to avoid
            unauthorized access to your account.
          </p>

          <h4 className="mt-5">x. How to contact DUV LIVE with enquiries: y</h4>
          <p className="pl-4">
            You can learn more about privacy. If you have questions about this
            notice, our privacy practices, standards and information handling,
            you can contact us as online -via our website/email or in writing
            at:
          </p>
          <address className="pl-4 mt-5">
            DUV LIVE,
            <br />
            ATTN: Privacy Centre
            <br />
            46, Omoruyi Street,
            <br /> Benin City, Edo.
          </address>

          <p className="mt-5 pt-5 lead text-white">
            Date of Last Revision: JUNE 20, 2020
          </p>
        </Col>
      </Row>

      <p />
    </div>
  </section>
);

export default PrivacyPolicy;
