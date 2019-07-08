import image1 from 'assets/img/events/1.png';
import image2 from 'assets/img/events/2.png';
import image3 from 'assets/img/events/3.png';
import AfricaYouth from 'assets/img/events/africa-youth-talent.jpeg';
import Kulture from 'assets/img/events/kulture.jpeg';
import LagosFashion from 'assets/img/events/lagos-fashion.jpeg';
import LifeLight from 'assets/img/events/life-and-light.jpeg';
import NationalBusiness from 'assets/img/events/national-business-conference.jpeg';
import TarkwaBay from 'assets/img/events/tarkwa-bay.jpeg';
import { shuffleItems } from 'utils/helpers';

const description = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. <br />
Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna. <br />
Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia .`;

const description2 = `<div class="js-xd-read-more-contents l-mar-top-3" data-automation="listing-event-description">
<p><strong><span> </span><em>Attending #AYTSummit2019 is like earning a master degree in business.</em><br></strong></p>
<p>Africa Youth and Talent Summit heads into its 3rd year after a successful 2017 &amp; 2018 edition that saw over 1,000 attendees majorly from Africa countries including, Ghana, Kenya, Nigeria, Somalia, Togo, and Zimbabwe and had a global online reach of 2 million.</p>
<p>The annual Summit is arguably Africa's largest Youth and Talent Development Platform. The summit returns to Nigeria on 24th August 2019. AYTS week-long programming focuses on youth, personal development, ideas, trends, insights, business agriculture, and best practices to transform communities across Africa.</p>
<p><strong>2019 SUMMIT THEME</strong></p>
<p>The theme for 2019 is <strong><span>The Role of Youth in Building Africa's Economy</span>.</strong> The summit will feature A-list facilitators and panelist from across Africa.</p>
<p><strong>AYTSummit 2019 PROGRAMMING:</strong></p>
<p>Conference programming accesses an on-site attendee pool of over 1,000 young Africa thought leaders with an additional online reach upwards of 4 million people worldwide.</p>
<p><strong>Topic of discussion includes;</strong></p>
<p><span>-Youth and Politics</span><br><span>-Leadership and Personal Development</span><br><span>-Business Development</span><br><span>-Effective Business Communication</span></p>
<p><strong> Participation Fee</strong></p>
<p>Attending #AYTSummit2019 is like earning a master degree in business. <br></p>
<p><strong>Youth Ticket (Ticket is FREE and covers)</strong></p>
<p>- Access to Main/Syndicate Sessions</p>
<p>- A certificate is N3,000 and optional.</p>
<p><strong>VIP Ticket covers (N7,000)</strong><br>-Free unlimited Wifi during the summit<br>-AYTS Network Nigeria membership<br>(Access to free training, workshops, and specialized sessions)<br>-Hard Copy Summit Certificate presented at the summit<br>-Special Delegate Seat with name/country tags</p>
<p><strong>Executive Ticket covers (10,000)</strong><br>-Special seat arrangement with Keynote Session Speakers <br>-Free unlimited Wifi during the summit<br>-AYTS Network Nigeria membership<br>(Access to free training, workshops, and specialized sessions)<br>-Hard Copy Summit Certificate presented at the summit</p>
<p><br>Kindly pay to AYTS Network 0109068450 Access/Diamond Bank. Once payment is made, send your teller and your full names to enable us to serve you better.</p>
<p><strong>Experiences:</strong></p>
<p>Some of AYTS most memorable moments happen outside the summit environment. We have created AYTS <strong>NETWORK GHANA, AYTS NETWORK KENYA</strong>, and <strong>AYTS NETWORK NIGERIA</strong> to sustain the impact of our summits.</p>
<p><strong>Registration Closes</strong> 11:59 pm on Friday, 15th of July, 2019</p>
<p><strong>Enquiries/Partnership/Sponsorship:</strong> Tel: +254712634577 (Kenya), +234-909-529-2240 (Nigeria), +233-245-870-928 (Ghana) Email: contact@aytsummit.org, www.aytsummit.org</p>
<p><strong>FAQs</strong></p>
<p><strong>What are my transportation/parking options for getting to and from the event?</strong> Hotel Accommodation and Transportation Services will be provided by Service Agents at a subsidized rate. If you need any of these services, write us via contact@aytsummit.org</p>
<p><strong>Do I have to bring my printed ticket to the event?</strong> Yes, kindly come with your printed ticket for accreditation</p>
<p><strong>Is my registration fee or ticket transferrable?</strong> No, registration ticket is not transferable</p>
<p><strong>Is it ok if the name on my ticket or registration doesn't match the person who attends?</strong> No</p>
<p><strong>What is the Purpose of the Summit?</strong> To educate youth with skills for continental development across sectors of the Africa economy. -To unite Africa’s youth towards building a strong relationship for continental growth through ideas shared from the summit. – To present a positive development framework to the AU countries, ministries of youths government and public universities within the continent. – To learn from renowned and qualified experts on various career development for the betterment of our continent.</p>
<p><strong>What benefits will I receive as a participant?</strong> • To become a skilled African Youth • Network with youths from around Africa • Join a continental discuss for youth development</p>
<p><strong>Who can participate in the Summit?</strong> Youths from around the continent • Aged between 18 and 35 • Good communication skills in English</p>
<p><strong>What is the official language of the Summit?</strong> The official language for the summit will be in English. However, we will have translators for other major tribes.</p>
<p><strong>How to participate in the Summit?</strong> Click the Register button and fill in the application form</p>
<p><br></p>
</div>`;

const events = [
  {
    start_date: '2019-08-19',
    end_date: null,
    description,
    image: LagosFashion,
    location: 'Lagos, Nigeria',
    ticket: 'Free',
    title: 'Lagos Fashion Show',
    start_time: '9:00AM',
    end_time: '4:00PM',
    organizer: 'Home 4 Africa',
    venue: 'Federal Palace Hotel & Casino, Lagos, LA'
  },
  {
    start_date: '2019-08-12',
    end_date: null,
    description:
      'A gathering for Alternative Gospel Songs from various artist. Hosted by Ife of Iplay Music',
    image: LifeLight,
    location: 'Lagos, Nigeria',
    ticket: 'Free',
    title: 'Fashions Finest Africa EPIC Show',
    start_time: '3:00PM',
    end_time: '7:00PM',
    organizer: 'IFE',
    venue:
      '131, Obafemi Awolowo way,<br /> Allen Round About (PRESKEN hotel Ikeja)<br /> Ikeja, LA 100271'
  },
  {
    start_date: '2019-08-17',
    end_date: null,
    description:
      'What better way to celebrate you than to celebrate your culture in the most involving way. Let us celebrate you at the Kulture Fest.',
    image: Kulture,
    location: 'Lagos, Nigeria',
    ticket: 'Free',
    title: 'Kulture Fest - Lagos',
    start_time: '12:00PM',
    end_time: null,
    organizer: 'La Vida Brand Exhibition',
    venue: 'Lagos Island<br />er Corporation Rd <br />Lagos, LA'
  },
  {
    start_date: '2019-06-13',
    end_date: '31-07-2019',
    description:
      'A time out with friends by the seaside with food, music, ganes and lots more.',
    image: TarkwaBay,
    location: 'Lagos, Nigeria',
    ticket: 'N 1000',
    title: 'Takwa Bay Beach Hangout',
    start_time: '10:00AM',
    end_time: null,
    organizer: 'Kingsword Singles',
    venue: 'Tarkwa Bay <br />Lagos, LA'
  },
  {
    start_date: '2019-07-20',
    end_date: null,
    description,
    image: image1,
    location: 'Lagos, Nigeria',
    ticket: 'N 7000',
    title: 'Lagos Fashion Hangout',
    start_time: '9:00AM',
    end_time: '5:00PM',
    organizer: null,
    venue: 'Ligali Ayorinde Street<br /> Lagos, LA'
  },
  {
    start_date: '2019-07-20',
    end_date: null,
    description,
    image: image2,
    location: 'Lagos',
    ticket: 'FREE',
    title: 'Celebration Submit',
    start_time: '9:00AM',
    end_time: '4:00PM',
    organizer: 'Helping Souls',
    venue: 'Harbour Point, Lagos, Lagos'
  },
  {
    start_date: '2019-07-25',
    end_date: null,
    description,
    image: image3,
    location: 'Lagos, Nigeria',
    ticket: 'FREE',
    title: 'EPIC Celebration 2019',
    start_time: '9:00AM',
    end_time: '5:00PM',
    organizer: 'Helping Souls',
    venue: 'Eko Hotels & Suites, Lagos, LA'
  },
  {
    start_date: '2019-08-24',
    end_date: null,
    description: description2,
    image: AfricaYouth,
    location: 'Lagos, Nigeria',
    ticket: 'FREE',
    title: 'AFRICA YOUTH AND TALENT SUMMIT 2019, LAGOS-NIGERIA',
    start_time: '8:00AM',
    end_time: '4:00PM',
    organizer: 'AYTS NETWORKS',
    venue: `D'Podium International Event Centre<br />31b Aromire Avenue<br />Off Adeniyi Jones <br />Ikeja, Lagos, Lagos 234`
  },
  {
    start_date: '2019-10-3',
    end_date: null,
    description: `Register to attend the 2019 National Business Conference holding on Thursday October 3, 2019, in Lagos. <br /> The conference theme is: "Creating Connections-Building Bridges… Together" <br />
    VISIT the conference website at <a href="#">https://nationalbusinessconference.com.ng</a>`,
    image: NationalBusiness,
    location: 'Lagos, Nigeria',
    ticket: 'FREE',
    title: '2019 National Business Conference',
    start_time: '8:00AM',
    end_time: '4:00PM',
    organizer: 'BNI NIGERIA',
    venue: `Eko Hotels & Suites<br /> 1415 Adetokunbo Ademola Street<br /> VICTORIA ISLAND<br /> Lagos, LA`
  }
];

export default shuffleItems(events);
