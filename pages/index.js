import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import Say from 'react-say';

const data = {
  'views': {
    'default': {
      'inverval': 1000,
      'prepend': '',
      'buttons': [
        {'display': 'yes'},
        {'display': 'no'},
        {'display': 'thank you'},
        {'display': 'My...', 'view': 'My...'},
        {'display': 'I want...', 'view': 'I want...'},
        {'display': 'I am...', 'view': 'I am...'},
        {'display': 'People...', 'view': 'People...'}
      ],
    },
    'My...': {
      'inverval': 1000,
      'prepend': 'My ',
      'buttons': [
        {'display': 'heat pack please'},
        {'display': 'pain meds please'},
        {'display': 'legs hurt'}, 
        {'display': 'arms hurt'},
        {'display': 'torso hurt'},
        {'display': 'head hurt'},
        {'display': '🔙 back', 'view': 'default'}
      ]
    },
    'I want...': {
      'inverval': 1000,
      'prepend': 'I want ',
      'buttons': [
        {'display': 'water'},
        {'display': 'my mouth suctioned'},
        {'display': 'my tracheostomy suctioned'},
        {'display': 'to use the bathroom'},
        {'display': 'to lay down'},
        {'display': 'to sit up'},
        {'display': 'to write'},
        {'display': '🔙 back', 'view': 'default'}
      ]
    },
    'I am...': {
      'inverval': 1000,
      'prepend': 'I am ',
      'buttons': [
        {'display': 'cold'},
        {'display': 'hot'},
        {'display': 'tired'},
        {'display': 'happy'},
        {'display': 'sad'},
        {'display': 'afraid'},
        {'display': '🔙 back', 'view': 'default'}
      ]
    },
    'People...': {
      'inverval': 1000,
      'prepend': 'I want to talk to ',
      'buttons': [
        {'display': 'Nurse'},
        {'display': 'Doctor'},
        {'display': 'Family'},
        {'display': 'Chaplan'},
        {'display': '🔙 back', 'view': 'default'}
      ]
    }
  }
}

export default function Home() {
  const [selectedButton, setSelectedButton] = useState(0)
  const [message, setMessage] = useState("")
  const [clicks, setClicks] = useState(0)
  const [viewId, setViewId] = useState("default")

  const cards = data.views[viewId].buttons.map((b, idx) => {
    return (
      <a key={idx} className={(idx == selectedButton) ? styles.card + " " + styles.active : styles.card}>
        <h2>{b.display}</h2>
      </a>
    )
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedButton(button => button >= cards.length - 1 ? 0 : button + 1)
    }, data.views[viewId].inverval)
    return () => clearInterval(interval)
  }, [cards.length])

  const clickHandler = (e, button) => {
    if (button.view) {
      setViewId(button.view)
      setSelectedButton(0)
      setMessage("")
    } else {
      setMessage(button.display)
    }
    setClicks(clicks + 1)
  }

  return (
    <div className={styles.container} onClick={(e) => clickHandler(e, data.views[viewId].buttons[selectedButton])}>

      <main className={styles.main}>
        <div className={styles.title}>
          {message ? data.views[viewId].prepend + message : ""}
          {message ? <Say text={data.views[viewId].prepend + message} key={clicks}/> : ""}
        </div>
        <div className={styles.grid}>
          {cards}
        </div>
      </main>

      <footer className={styles.footer}>
          Powered by ❤️
      </footer>
    </div>
  )
}
