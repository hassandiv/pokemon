import React from 'react'
import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from 'react-router-dom'
import Home from './components/Home'
import Single from './components/Single'
import './App.css'

interface MatchParams {
  name: string
}

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:name" render={({ match }: RouteComponentProps<MatchParams>) => (
            <Single matchUrl={match?.params?.name} />)} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
