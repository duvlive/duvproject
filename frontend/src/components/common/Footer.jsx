import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from '@reach/router';
import RedLogo from 'assets/img/logo/red-white.svg';

const Footer = () => (
  <footer className="footer">
    <div className="container-fluid">
      <div className="footer__content">
        <Row>
          <Col sm={2} xs={6}>
            <Link to="/">
              <img alt="Duv Live White Logo" height="75" src={RedLogo} />
            </Link>
          </Col>
          <Col sm={2} xs={6}>
            <ul className="list-unstyled footer__links">
              <li className="footer__header">Company</li>
              <li>How it works</li>
              <li>About</li>
              <li>BrainBox</li>
              <li>For the Record</li>
            </ul>
          </Col>
          <Col sm={2} xs={6}>
            <ul className="list-unstyled footer__links">
              <li className="footer__header">Communities</li>
              <li>DJs</li>
              <li>MCs</li>
              <li>Live Bands</li>
            </ul>
          </Col>
          <Col sm={2} xs={6}>
            <ul className="list-unstyled footer__links">
              <li className="footer__header">Useful Links</li>
              <li>FAQs</li>
              <li>Contact Us</li>
            </ul>
          </Col>
          <Col sm={4}>
            <ul className="list-unstyled list-inline footer__icons">
              {getSocialMediaIcons()}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
    <div className="footer__bottom">
      <div className="container-fluid">
        <Row>
          <Col className="d-none d-sm-block" sm={6}>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="/">Terms of Use</a>
              </li>
              <li className="list-inline-item">
                <a href="/">Privacy Policy</a>
              </li>
              <li className="list-inline-item">
                <a href="/">FAQs</a>
              </li>
            </ul>
          </Col>
          <Col sm={6} xs={12}>
            <p className="footer__bottom--copyright">
              &copy; 2019 <strong className="text-danger">DUV LIVE</strong>. All
              Rights Reserved.
            </p>
          </Col>
        </Row>
      </div>
    </div>
  </footer>
);

const getSocialMediaIcons = () => {
  const links = [
    { name: 'facebook', link: 'http://www.facebook.com' },
    { name: 'twitter', link: 'http://www.twitter.com' },
    { name: 'linkedin', link: 'http://www.linkedin.com' },
    { name: 'youtube', link: 'http://www.youtube.com' },
    { name: 'instagram', link: 'http://www.instagram.com' }
  ];
  return links.map(({ name, link }) => (
    <li key={name}>
      <a href={link} rel="noopener noreferrer" target="_blank" title={name}>
        <i className={`icon icon-${name}`} />
      </a>
    </li>
  ));
};

export default Footer;
