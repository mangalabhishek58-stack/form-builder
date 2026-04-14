import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LandingPage.module.css'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import logo from '../../assets/logo.png'
import chatbotimg from '../../assets/images/chatBotIntro.png'
import chatbotCompare from '../../assets/images/chatbotCompare.png'
import typebot from '../../assets/images/typebotStandard.png'
import desc1 from '../../assets/images/desc1.png'
import desc2 from '../../assets/images/desc2.png'
import { teamlogos } from '../../assets/data/teamsLogo'
import { companyLogos1, companyLogos2 } from '../../assets/data/companyslogo'
import { features } from '../../assets/data/featuresData'

function LandingPage() {
  const navigate = useNavigate() ;
  const signUppage = () =>{
    navigate('/signup')
  }

  return (
    <div className={styles.page} >
      <header className={styles.header} >
        <div className={styles.heading} >
          <img src={logo} alt="logo" />
          <h4>FormBot</h4>
        </div>
        <div className={styles.navbar} >
          <button className={styles.loginButton} onClick={() => navigate('/login') } >Sign in</button>
          <button className={styles.signupButton} onClick={signUppage} >Create a FormBot</button>
        </div>
      </header>

      <div className={styles.container} >
        {/* introduction of chatbot part */}
        <section className={styles.layout1} >
          <div className={styles.chatbotIntro} >
            <h2>Build advanced chatbots <br /> visually</h2>
            <p>Typebot gives you powerful blocks to create unique chat experiences. Embed them<br />
              anywhere on your web/mobile apps and start collecting results like magic.</p>
            <button className={styles.signupButton} onClick={signUppage} >Create a FormBot for free</button>
          </div>
          <div className={styles.introImage} style={{ marginTop: '50px' }}>
            <img src={chatbotimg} alt="" />
          </div>
        </section>

        {/* Replace form  to new ChatBot section */}
        <section className={styles.layout2} >
          <div>
            <h2>Replace your old school forms with <br />
              chatbots</h2>
            <p>Typebot is a better way to ask for information. It leads to an increase in customer satisfaction and retention and multiply by 3 <br />
              your conversion rate compared to classical forms.</p>
          </div>
          <div className={styles.comparison} >
            <div>
              <img src={chatbotCompare} alt="Comparing Chat Bot" />
            </div>
          </div>
        </section>

        <section className={styles.layout3} >
          <div className={styles.shortDesc} >
            <div className={styles.descImg} >
              <img src={desc1} alt='desc1' />
            </div>
            <div className={styles.descDiv} >
              <h3>Easy building experience</h3>
              <p>All you have to do is drag and
                drop blocks to create your app.
                Even if you have custom needs,
                you can always add custom
                code.</p>
            </div>
          </div>
          <div className={styles.shortDesc} >
            <div className={styles.descDiv} >
              <h3>Embed it in a click</h3>
              <p>Embedding your typebot in
                your applications is a walk in
                the park. Typebot gives you
                several step-by-step platform-
                specific instructions. Your
                typebot will always feel "native".</p>
            </div>
            <div className={styles.descImg} >
              <img src={desc2} alt="desc2" />
            </div>
          </div>

        </section>

        <section className={styles.layout4}>
          <div className={styles.rowIcons}>
            <div className={styles.rowIcon1} >
              {companyLogos1?.map((logo, index) =>{
                return <div><img key={index} src={logo} /></div>
              })}
            </div>
            <div className={styles.rowIcon2} >
              {companyLogos2?.map((logo, index) =>{
                return <div><img key={index} src={logo} /></div>
              })}
            </div>
          </div>
          <div className={styles.layout4Text} >
            <h4>Integrate with any platform</h4>
            <p>Typebot offers several native integrations blocks as well as instructions on <br />
              how to embed typebot on particular platforms</p>
          </div>
        </section>

        <section className={styles.layout5} >
          <div className={styles.layout5Heading} >
            <h2>Collect results in real-time</h2>
            <p>
              One of the main advantage of a chat application is that you collect the user's responses on each question. <br />
              <span>You won't lose any valuable data.</span>
            </p>
          </div>
          <div style={{width:'50%'}}>
            <img src={typebot} alt="Typebot" />
          </div>
        </section>

        <section className={styles.layout6} >
          <div className={styles.layout6Heading} >
            <h3>And many more features</h3>
            <p>Typebot makes form building easy and comes with powerful features</p>
          </div>
          <div className={styles.features}>
            {features.map((feature , index) =>{
              return <div className={styles.featureDiv} key={index}>
                <div><img src={feature.icon} alt="fe" /></div>
                <h4>{feature.heading} </h4>
                <p>{feature.desc}</p>
              </div>
            })}
          </div>
        </section>

        <section className={styles.layout7} >
          <h4>Loved by teams and creators from all around the world</h4>
          <div className={styles.teams} >
            {teamlogos?.map((logo, index) =>
              (<img key={index} src={logo} />))}
          </div>
        </section>

        <section className={styles.layout8}>
          <div>
            <h2>Improve conversion and user engagement<br />
              with FormBots </h2>
            <button className={styles.signupButton} onClick={signUppage} >Create a FormBot for free</button>
            <p>No trial. Generous <span>free</span> plan.</p>
          </div>
        </section>
      </div>

      <footer >
        <div>
          <li>Made with ❤️ by<br />
            @cuvette</li>
        </div>
        <div>
          <ul>
            <li>Status <BsBoxArrowUpRight /> </li>
            <li>Documentation <BsBoxArrowUpRight /></li>
            <li>Roadmap <BsBoxArrowUpRight /></li>
            <li>Price</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Discord <BsBoxArrowUpRight /></li>
            <li>GitHub repository <BsBoxArrowUpRight /></li>
            <li>Twitter <BsBoxArrowUpRight /></li>
            <li>Linkedin <BsBoxArrowUpRight /></li>
            <li>OSS Friends</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>About</li>
            <li>Contact</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
