import React from 'react';
import { Col, Row } from 'reactstrap';
import FrontEndPage from 'components/common/FrontEndPage';

const TermsOfUse = () => (
  <FrontEndPage>
    <Content />
  </FrontEndPage>
);

const Content = () => (
  <section class="text-only_content spacer">
    <div className="container-fluid">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h2 className="header h1 text-uppercase text-center mb-4">
            Terms <span>Of Use</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
            hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque,
            aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula
            sollicitudin laoreet viverra, tortor libero sodales leo, eget
            blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse
            potenti.
          </p>
          <p>
            Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae
            luctus metus libero eu augue. Morbi purus libero, faucibus
            adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent
            elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum
            volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu
            pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu,
            fermentum et, dapibus sed, urna.
          </p>
          <p>
            Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna
            a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis
            libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing
            varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna.
            Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget,
            gravida vitae, ultricies ac, leo. Integer leo pede, ornare a,
            lacinia eu, vulputate vel, nisl.
          </p>
          <p>
            Suspendisse mauris. Fusce accumsan mollis eros. Pellentesque a diam
            sit amet mi ullamcorper vehicula. Integer adipiscing risus a sem.
            Nullam quis massa sit amet nibh viverra malesuada. Nunc sem lacus,
            accumsan quis, faucibus non, congue vel, arcu. Ut scelerisque
            hendrerit tellus. Integer sagittis. Vivamus a mauris eget arcu
            gravida tristique. Nunc iaculis mi in ante. Vivamus imperdiet nibh
            feugiat est. Lorem ipsum dolor sit amet, consectetuer adipiscing
            elit. Phasellus hendrerit.
          </p>

          <p>
            Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel,
            dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin
            laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor
            eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas,
            ante et vulputate volutpat, eros pede semper est, vitae luctus metus
            libero eu augue. Morbi purus libero, faucibus adipiscing, commodo
            quis, gravida id, est. Sed lectus.
          </p>
          <p>
            Praesent elementum hendrerit tortor. Sed semper lorem at felis.
            Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod
            dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
            dapibus eu, fermentum et, dapibus sed, urna. Morbi interdum mollis
            sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper
            laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a
            purus.
          </p>
          <p>
            Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in,
            lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris
            ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies
            ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel,
            nisl.
          </p>
        </Col>
      </Row>

      <p />
    </div>
  </section>
);

export default TermsOfUse;
