import React from 'react'
import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from 'react-router-dom'
import Home from './components/Home'
import Single from './components/Single'
import './App.css'

// interface faceMatch<P> {
//   params: P;
//   isExact: boolean;
//   path: string;
//   url: string;
// }

// interface MatchParams {
//   name: string
// }

// export interface RouteComponentProps<P> {
//   match: match<P>
//   // location: H.Location
//   // history: H.History
//   // staticContext?: any
// }

// export interface match<P> {
//   params: P
//   isExact: boolean
//   path: string
//   url: string
// }

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/:name" render={({ match }: MatchProps) => (
            <Single name={match.params.name} />)} /> */}
           <Route path="/:name" component={Single} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
