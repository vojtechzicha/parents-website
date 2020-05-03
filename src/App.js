import React, { useState } from 'react'
import { Pane, Heading, Avatar, Button, SegmentedControl } from 'evergreen-ui'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'
import { Downloads } from './Downloads'
import { Photos } from './Photos'
import { Videos } from './Videos'
import { Texts } from './Texts'

const names = ['Marie', 'Josef']

const options = [
  { label: 'Videa', value: '1' },
  { label: 'Fotky', value: '2' },
  { label: 'Texty', value: '3' },
  { label: 'Soubory', value: '4' },
]

function App() {
  const [name, setName] = useState(0)
  const [section, setSection] = useState('1')
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          render={() => (
            <div>
              <Pane
                display="flex"
                border="default"
                flexDirection="column"
                justifyContent="center"
                padding={16}
                borderRadius={3}>
                <Pane display="flex" flexDirection="row" marginBottom={24}>
                  <Avatar name={names[name]} size={40} />
                  <Heading size={900} marginLeft={12}>
                    {names[name]}
                    {names.length > 1
                      ? names.map((n, i) =>
                          i === name ? null : (
                            <Button appearance="minimal" onClick={() => setName(i)} marginLeft={12} height={40} key={i}>
                              {n}
                            </Button>
                          )
                        )
                      : null}
                  </Heading>
                  <SegmentedControl width={240} options={options} value={section} onChange={(v) => setSection(v)} />
                </Pane>
                {section === '1' ? (
                  <Videos name={name} />
                ) : section === '2' ? (
                  <Photos name={name} />
                ) : section === '3' ? (
                  <Texts name={name} />
                ) : (
                  <Downloads name={name} />
                )}
              </Pane>
            </div>
          )}
        />
      </Switch>
    </Router>
  )
}

export default App
