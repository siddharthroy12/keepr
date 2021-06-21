import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import PrivateRoute from './Components/PrivateRoute'
import ProtectedRoute from './Components/ProtectedRoute';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import LoggerScreen from './Screens/LoggerScreen'

import { fetchNotes } from './Actions/notesActions';

import './Utils.css'

function App() {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  const createNoteState = useSelector(state => state.createNote)
	const updateNoteState = useSelector(state => state.updateNote)
  const trashNoteState = useSelector(state => state.trashNote)

  useEffect(() => {
		if (createNoteState.message) {
			dispatch(fetchNotes())
		}
	}, [createNoteState, dispatch])

  useEffect(() => {
    if (updateNoteState.message) {
      dispatch(fetchNotes())
    }
  }, [updateNoteState, dispatch])

  useEffect(() => {
    if (trashNoteState.message) {
      dispatch(fetchNotes())
    }
  }, [trashNoteState, dispatch])

  useEffect(() => {
    if (login.loggedIn) {
      dispatch(fetchNotes())
    }
  }, [login, dispatch])


  return (
    <Router>
      <Switch>
        <ProtectedRoute component={LoginScreen} path='/login' />
        <ProtectedRoute component={LoggerScreen} path='/logger' />
        <PrivateRoute component={HomeScreen} exact path="/" />
      </Switch>
    </Router>
  );
}

export default App;
