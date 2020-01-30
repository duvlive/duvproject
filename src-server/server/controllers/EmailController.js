import { generateEmailTemplate } from './../MailSender';
import EMAIL_CONTENT from './../email-template/content';

const SAMPLE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOm51bGwsInR5cGUiOjIsImlhdCI6MTU3OTQzMDYzMH0.Wc-0c9uGNgf2fIKDR_58ZFHHtEftWB1Tso8ym5YTSQY';

const EmailController = {
  /**
   * create Contact
   * @function
   * @param {object} req is req object
   *  - Query
   *    - name * - derived from the keys in EMAIL CONTENT
   *    - type - text || html
   * @param {object} res
   * @return {object} returns - json || text || html
   */
  getEmailTemplate(req, res) {
    const name = req.query.name || 'NOT_FOUND';
    if (!EMAIL_CONTENT[name]) {
      return res.json({ message: 'Email Template not found' });
    }
    const emailType = req.query.type === 'text' ? 'text' : 'html';
    const options = {
      ...EMAIL_CONTENT[name],
      link: `http://duvlive.herokuapp.com/${SAMPLE_TOKEN}`,
      firstName: '[FirstName]'
    };
    generateEmailTemplate(options).then(data => {
      return res.send(data[emailType]);
    });
  }
};

export default EmailController;
