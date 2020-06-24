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

const CONTENT_BODY = `Hi there! I use DUV LIVE to hire the best Entertainers for my parties and to find upcoming events I would love to attend. Join @ https://www.duvlive.com/`;

const Sharer = ({ shareUrl, title }) => (
  <ul className="list-unstyled list-inline sharer__icons">
    <li>
      <FacebookShareButton quote={title} url={shareUrl}>
        <FacebookIcon round width="48" />
      </FacebookShareButton>
    </li>
    <li>
      <TwitterShareButton title={title} url={shareUrl} via={shareUrl}>
        <TwitterIcon round width="48" />
      </TwitterShareButton>
    </li>
    <li>
      <LinkedinShareButton source={shareUrl} summary={title} title="DUV Live">
        <LinkedinIcon round width="48" />
      </LinkedinShareButton>
    </li>
    <li>
      <WhatsappShareButton separator=":: " title={title}>
        <WhatsappIcon round width="48" />
      </WhatsappShareButton>
    </li>
    <li>
      <TelegramShareButton title={title}>
        <TelegramIcon round width="48" />
      </TelegramShareButton>
    </li>
    <li>
      <EmailShareButton
        body={CONTENT_BODY}
        subject={`Hey Friend! Check out DUV Live ${shareUrl}`}
      >
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
  title: CONTENT_BODY,
};
export default Sharer;
