import React from 'react'
import styles from './ThemePage.module.css'
import light from '../../assets/images/light.png'
import dark from '../../assets/images/dark.png'
import tailBlue from '../../assets/images/blue.png'
import bubbleIcon from '../../assets/images/chatIcon.png'

function ThemesPage({ formTheme, setFormTheme }) {
  return (
    <div className={styles.page}>
      <div className={styles.selectTheme}>
        <h3>Customize the theme</h3>
        <div className={styles.themeOptions} onClick={()=> setFormTheme('Light')}>
          <img src={light} alt="Light Theme" />
          <h4>Light</h4>
        </div>
        <div className={styles.themeOptions} onClick={()=> setFormTheme('Dark')} >
          <img src={dark} alt="Dark Theme" />
          <h4>Dark</h4>
        </div>
        <div className={styles.themeOptions} onClick={()=> setFormTheme('TailBlue')}>
          <img src={tailBlue} alt="TailBlue Theme" />
          <h4>TailBlue</h4>
        </div>
      </div>

      <div className={styles.applyTheme} style={formTheme == 'Dark' ? {background:'#1F1F23'} : formTheme == 'TailBlue' ? {background:'#508C9B'} : {background:'#ffffff'} }>
        <div className={styles.bubble}>
          <img src={bubbleIcon} alt="Bubble" />
          <p>Hello</p>
        </div>
        <div className={styles.input}>
          <p>Hi</p>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default ThemesPage
