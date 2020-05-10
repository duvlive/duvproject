import React from 'react';
import PropTypes from 'prop-types';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

const Sharer = ({ shareUrl, title }) => (
  <ul className="list-unstyled list-inline sharer__icons">
    <li>
      <FacebookShareButton quote={title} url={shareUrl}>
        <FacebookIcon round width="48" />
      </FacebookShareButton>
    </li>
    <li>
      <TwitterShareButton title={title} url={shareUrl}>
        <TwitterIcon round width="48" />
      </TwitterShareButton>
    </li>
    <li>
      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon round width="48" />
      </LinkedinShareButton>
    </li>
    <li>
      <WhatsappShareButton separator=":: " title={title} url={shareUrl}>
        <WhatsappIcon round width="48" />
      </WhatsappShareButton>
    </li>
    <li>
      <TelegramShareButton title={title} url={shareUrl}>
        <TelegramIcon round width="48" />
      </TelegramShareButton>
    </li>
    <li>
      <EmailShareButton subject={`Hey Friend! Check out DUV Live ${shareUrl}`}>
        <EmailIcon round width="48" />
      </EmailShareButton>
    </li>
  </ul>
);

Sharer.propTypes = {
  shareUrl: PropTypes.string,
  title: PropTypes.string,
};

Sharer.defaultProps = {
  shareUrl: 'https://duvlive.com',
  title: 'Live your Best Live',
};
export default Sharer;
