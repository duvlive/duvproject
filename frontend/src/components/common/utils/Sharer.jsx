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

const CONTENT_BODY = `Hi there! I use DUV LIVE to hire the best Entertainers for my parties and to find upcoming events I would love to attend. Join @ https://www.duvlive.com/.`;
const TWITTER_CONTENT_BODY = `Hi there! I use DUV LIVE to hire the best Entertainers for my parties and to find upcoming events I would love to attend. Join @`;

const Sharer = ({ shareUrl, content }) => (
  <ul className="list-unstyled list-inline sharer__icons">
    <li>
      <FacebookShareButton quote={content} url={shareUrl}>
        <FacebookIcon round width="48" />
      </FacebookShareButton>
    </li>
    <li>
      <TwitterShareButton title={TWITTER_CONTENT_BODY} url={shareUrl}>
        <TwitterIcon round width="48" />
      </TwitterShareButton>
    </li>
    <li>
      <LinkedinShareButton source={shareUrl} summary={content} title="DUV Live">
        <LinkedinIcon round width="48" />
      </LinkedinShareButton>
    </li>
    <li>
      <WhatsappShareButton separator=":: " title={content} url={shareUrl}>
        <WhatsappIcon round width="48" />
      </WhatsappShareButton>
    </li>
    <li>
      <TelegramShareButton title={content} url={shareUrl}>
        <TelegramIcon round width="48" />
      </TelegramShareButton>
    </li>
    <li>
      <EmailShareButton
        body={content}
        subject={`Hey Friend! Check out DUV Live ${shareUrl}`}
      >
        <EmailIcon round width="48" />
      </EmailShareButton>
    </li>
  </ul>
);

Sharer.propTypes = {
  content: PropTypes.string,
  shareUrl: PropTypes.string,
};

Sharer.defaultProps = {
  content: CONTENT_BODY,
  shareUrl: 'https://duvlive.com',
};
export default Sharer;
