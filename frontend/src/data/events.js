import React from 'react';
import ReImageNigeria from 'assets/img/events/reimage-nigeria.jpeg';
import VirtualFashion from 'assets/img/events/virtual-fashion.jpeg';
import LekkiWriter from 'assets/img/events/lekki-writer.jpeg';
import LagosUrban from 'assets/img/events/lagos-urban.jpeg';
import KehindeBankole from 'assets/img/events/kehinde-bankole.jpeg';
import Conference2020 from 'assets/img/events/conference-2020.jpeg';
import GlobalLeader from 'assets/img/events/global-leader-submit.jpeg';
import InnovationSubmit from 'assets/img/events/innovation-submit.jpeg';
import WomenConference from 'assets/img/events/women-conference.jpeg';
import { shuffleItems } from 'utils/helpers';

const conference2020Desc = (
  <div>
    <p>
      This FREE Conference is organized by{' '}
      <a
        href="http://www.crustmine.com"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        <strong>CrustMine Consulting</strong>
      </a>
      <strong> </strong>to engage stakeholders on the vital role Customer
      Service plays in an organization. The maiden Customer Service Conference
      which held on 12th October, 2019 was well attended by the Commission for
      Education, Lagos State, Senior Manager, Capacity Building, Nigerian
      Institute of Management (Chartered), Head of Retail, Konga, just to
      mention but three.
    </p>
    <p>
      The <strong>Conference</strong> is packed with <strong>FREE</strong>{' '}
      Accelerator Training on Customer Retention Techniques, Special sessions
      from Conference faculty, One on One Interview Session with a veteran and
      Panel Discussion. In the course of the Conference, we will also be
      commemorating the 2020 Customer Service Week.
    </p>
    <p>
      Here Are Some Amazing Benefits You Would Lose If You Fail to Attend{' '}
      <strong>Customer Service Conference 2020</strong>
    </p>
    <p></p>
    <p>
      1. Knowledge for exploits in Customer Relationship Management – Customer
      Service.
    </p>
    <p>
      2. Delivers to you an awesome platform to discuss and network with other
      professionals.
    </p>
    <p>3. Leadership Skill Development.</p>
    <p>4. Certificate of Participation</p>
    <p>
      For Enquires kindly call <strong> +234-907-713-8178</strong> and/or send a
      mail to <strong>conference@crustmine.com |</strong>{' '}
      <strong>crustmineconsulting@gmail.com</strong>. You could also visit our{' '}
      <a
        href="http://www.crustmine.com"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        website
      </a>{' '}
      too
    </p>
    <p></p>
    <p>
      N.B: This is a Virtual Conference. You can join in via our YouTube Channel
      -{' '}
      <a
        href="https://www.youtube.com/channel/UCXHk1AAxHmXBVpG1o6srcNw?view_as=subscriber"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        CrustMineNG
      </a>{' '}
    </p>
    <p></p>
  </div>
);

const events = [
  {
    start_date: '2020-10-10',
    end_date: null,
    description: conference2020Desc,
    image: Conference2020,
    location: 'Lagos, Nigeria',
    ticket: 'Free',
    title: 'CUSTOMER SERVICE CONFERENCE 2020',
    slug: 'customer-service-conference-2020',
    startTime: '11:00 AM',
    eventDuration: '4:00PM',
    organizer: 'CrustMineNG',
    venue: 'Online Event',
  },
  {
    start_date: '2020-09-04',
    end_date: null,
    image: GlobalLeader,
    location: 'Lagos, Nigeria',
    ticket: 'Free',
    title: 'Global Leaders Summit',
    slug: 'global-leaders-summit',
    startTime: '3:00PM',
    eventDuration: '7:00PM',
    organizer: 'Pan Africa',
    venue: 'Online Event',
    description: (
      <div className="structured-content-rich-text structured-content__module l-align-left l-mar-vert-6 l-sm-mar-vert-4 text-body-medium">
        <p>
          An High level Convergence of Influential Global leaders 2020. This
          Initiative is a gathering of Influential Global leaders, the
          Convergence aim to create a network platform for Influential Global
          leaders to share Impactful strategies to solve our collective global
          challenges. The Summit will emphasis on the role of Leadership in our
          global development and advancement.
        </p>
        <p />
      </div>
    ),
  },
  {
    start_date: '2020-10-16',
    end_date: null,
    description: (
      <div className="structured-content-rich-text structured-content__module l-align-left l-mar-vert-6 l-sm-mar-vert-4 text-body-medium">
        <p>
          Kehinde Bankole has played roles from Shakespeare’s Globe theatre UK
          to roles on blockbuster films in Nigeria. A Cast on Netflix Original
          series by Akin Omotoso, Kehinde was Born and raised in Lagos, Nigeria,
          as a twin to both late Architect Dad and administrative secretary Mum,
          who encouraged her to begin informal drama and music training as a
          growing child along with her 5 other close knit siblings, She Studied
          Mass Communication in Olabisi Onabanjo University.
        </p>
        <p>
          Kehinde came into limelight After her Tv debut on Nigerian drama
          series Super Story and went on to wow Cinema audiences in her film
          debut as Teacher Tawa, the prime target of a serial killer in
          acclaimed director Kunle Afolayan’s psychological thriller October 1
          (2014) alongside Veteran actor Sadik Dabar, Nick Rhys, Fabian Lojede,
          Lawrence Stubbings and others earning her Best Actress, Africa Magic
          Viewers Choice Awards (2015). She played Lead and major roles in
          movies including “The Set Up” (2019), Dinner (2015), Dear Affy (2020),
          Mama Drama (2020), Cross-Roads, Ebony life Tv series “Desperate
          housewives Africa” (2015) And also won Best of Nollywood “Revelation
          of the year award” 2009 for Elerin Eye.
        </p>
        <p>
          Kehinde’s stage hightlights include credits playing Hermione “Oya” in
          “The Winter’s Tale” at Shakespeare’s Globe Theatre, adapted as “Itan
          Oginintin” (2012) Renegade theatre, The Duchess (Iyalode) in “The
          Duchess Of Malfi” reimagined as “Iyalode Of Eti” (2016) Utopia
          theatre, Queen Moremi as Queen Moremi (2019) Terra Kulture and her own
          one woman play “Chronicles of Iya Risi” produced by Sarah Lawal (Lagos
          Theatre Festival) 2017. She co voiced the Lux-beauty promotion cover
          song produced by Cobhams Asuquo in Nigeria in 2009 as a LUX FACE.“A
          TASTE OF PHOBIA” an indie horror film by Italian film maker, Domiziano
          Cristopharo, Sunny King and Tony Newton featured kehinde in 2017.
        </p>
      </div>
    ),
    image: KehindeBankole,
    location: 'Lagos, Nigeria',
    ticket: 'Free',
    title: 'The Concept Of You - Kehinde Bankole',
    slug: 'the-concept-of-you',
    startTime: '12:00PM',
    eventDuration: null,
    organizer: 'Utopia Theatre',
    venue: 'Online Event',
  },
  {
    start_date: '2020-08-29',
    end_date: null,
    description: (
      <div>
        <p>
          The Pride Women Conference is expected to be a life-changing webinar
          that is aimed at helping you get a holistic grip on your life in the
          “new normal”, with the conference examining how you can meet the
          challenges of relationships, family, career and business in these
          uncertain times.
        </p>
        <p>
          The past months have been anything but normal, and the prevailing
          situation is taking a heavy toll on our emotional well-being with most
          of us finding it difficult to cope. The conference will thus provide
          participants with coping tools to help them maintain their emotional
          well-being in these challenging times. Participants will be empowered
          to take ownership of their overall emotional well-being in a holistic
          manner.
        </p>
      </div>
    ),
    image: WomenConference,
    location: 'Lagos, Nigeria',
    ticket: 'Free',
    title: '4TH PRIDE WOMEN CONFERENCE',
    slug: 'pride-women-conference',
    startTime: '11:00AM',
    eventDuration: null,
    organizer: 'Pride Magazine Nigeria',
    venue: 'Online Event',
  },
  {
    start_date: '2020-08-06',
    end_date: null,
    description: (
      <div>
        <p>INITIATIVE FOR GLOBAL TRANSFORMATION PRESENTS</p>
        <p></p>
        <p>HER FIRST VIRTUAL CONFERENCE </p>
        <p></p>
        <p>A NATION BUILDING INITIATIVE FOCUSED ON NATIONAL TRANSFORMATION</p>
        <p></p>
        <p>
          THEME- REIMAGINE NIGERIA – CONCEPTUALIZING THE NIGERIA OF OUR DREAMS
        </p>
        <p>VENUE ZOOM/ FACEBOOK/ YOUTUBE </p>
        <p>TIME 6:00PM</p>
        <p>DATE 6TH AUG</p>
        <p>SPEAKERS PROF VINCENT ANIGBOGU | Ambassador SOLOMON JEREH: </p>
        <p>MODERATOR: JOYCE DANIELS</p>
        <p>PANELIST</p>
        <p>
          PASTOR BUKOLA AJIDE, DR. ALEX OTTI. SINA FABENRO JYRON, RT. HON.
          ONOFIOK LUKE, FRANCIS ADEBAYO (FORMER ANN GOVERNORSHIP-CANDIDATE FOR
          LAGOS STATE) FELA DUROTOYE- FORMER PRESIDENTIAL CANDIDATE AND
          MOTIVATIONAL SPEAKER.
        </p>
        <p></p>
      </div>
    ),
    image: ReImageNigeria,
    location: 'Lagos, Nigeria',
    ticket: 'Free',
    title: 'REIMAGINE NIGERIA',
    slug: 'reimagine-nigeria',
    startTime: '6:00PM',
    eventDuration: '9:00PM',
    organizer: 'Initiative for Global Initialization',
    venue: 'Online Event',
  },
  {
    start_date: '2020-09-28',
    end_date: null,
    description: (
      <div>
        <p>
          The year 2020 has been an extraordinary year as the world has, and is
          experiencing a shift in the dynamics of how we live, conduct our
          lives, sources of livelihoods, industries and society at large.
        </p>
        <p>
          In the light of the pandemic and the restrictions on gatherings for
          safety reasons The Fashion Souk by Eventful has had to adapt to the
          new norm and pivot for the fifth edition of the biannual Souk.
        </p>
        <p>
          We are excited to announce that The Fashion Souk by Eventful is going
          virtual from the 28th - 30th of August and is sponsored by First Bank
          of Nigeria and Bank of Industry.
        </p>
        <p>
          The Souk will be showcased online on the Eventful Nigeria website with
          exhibitions from the most creative and technologically driven Nigerian
          and African Fashion businesses over the course of 3 days.
        </p>
        <p>
          The virtual Souk will cater to the fashion interests and needs of
          local and international fashion enthusiasts, and business owners from
          the safety and comfort of their personal spaces.
        </p>
        <p>
          It promises to be a new and exciting online fashion experience in
          Nigeria and around the world for 2020!
        </p>
        <p>
          To participate as a vendor, click the bitly link on @thefashionsouk_ng
          IG profile to apply. Stalls are limited in supply.
        </p>
        <p>Applications close at Midnight on Tuesday, 14th July.</p>
        <p>See you at The Souk!</p>
      </div>
    ),
    image: VirtualFashion,
    location: 'Lagos',
    ticket: 'FREE',
    title: 'The Virtual Fashion Souk',
    slug: 'virtual-fashion',
    startTime: '9:00AM',
    eventDuration: '4:00PM',
    organizer: 'Eventful Nigeria',
    venue: 'Online Event',
  },
  {
    start_date: '2020-09-20',
    end_date: null,
    description: (
      <div>
        <p>
          While everyone tries to stay safe and indoors during this
          once-in-a-lifetime kind of event, we are about creating a community of
          book enthusiasts and (aspiring) writers who want to stay connected.
          All meetups are virtual (for now) and can go a number of ways -
          critique, readings, writing prompts, book and artist discussions and
          recommendations.&nbsp;&nbsp;
        </p>
        <p>
          The first meetup is on Saturday, 22nd of August. 2020. We would break
          the ice and then jump on a few writing prompts. Everyone will write
          for 40 minutes and then share and discuss. No pressure, though - you
          can just observe if you want to.{' '}
        </p>
        <p>
          A Zoom meeting link will be mailed to you days leading up to the
          event.
        </p>
      </div>
    ),
    image: LekkiWriter,
    location: 'Lagos, Nigeria',
    ticket: 'FREE',
    title: 'Lekki Writers Cocoon',
    slug: 'lekki-writers-cocoon',
    startTime: '6:00PM',
    organizer: 'Ayobami Tehingbola',
    venue: 'Online Event',
  },
  {
    start_date: '2020-07-23',
    end_date: null,
    description: <p>www.urbanchallenge.co</p>,
    image: LagosUrban,
    location: 'Lagos, Nigeria',
    ticket: 'FREE',
    title: 'Lagos Urban Innovation Challenge Winners Announcement',
    slug: 'lagos-urban-innovation-challenge-winners',
    startTime: '8:00AM',
    eventDuration: '4:00PM',
    organizer: 'Utopia',
    venue: 'Online Event',
  },
  {
    start_date: '2020-09-30',
    end_date: null,
    description: `Register to attend the 2019 National Business Conference holding on Thursday October 3, 2019, in Lagos. <br /> The conference theme is: "Creating Connections-Building Bridges… Together" <br />
    VISIT the conference website at <a href="#">https://nationalbusinessconference.com.ng</a>`,
    image: InnovationSubmit,
    location: 'Lagos, Nigeria',
    ticket: 'FREE',
    title: 'Innovation Summit & Awards Ceremony',
    slug: 'innovattion-summit-awards-ceremony',
    startTime: '8:00AM',
    eventDuration: '4:00PM',
    organizer: 'Conservation X Labs',
    venue: 'Online Event',
  },
];

export default shuffleItems(events);
