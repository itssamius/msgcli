import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@bit/mui-org.material-ui.styles'
import FormControl from '@bit/mui-org.material-ui.form-control'
import Input from '@bit/mui-org.material-ui.input'
import InputLabel from '@bit/mui-org.material-ui.input-label'
import Button from '@bit/mui-org.material-ui.button';
import LyricPage from './components/lyricPage'
import lyrics from './components/lyrics'

var ls = require('local-storage');

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function App() {
  const [name, setName] = React.useState('');
  const [song, setSong] = React.useState('');
  const [lyric, setLyric] = React.useState([])
  const [showLyrics, setShowLyrics] = React.useState(false)
  const classes = useStyles();

  const nameHandleChange = event => {
    setName(event.target.value);
  };
  const songHandleChange = event => {
    setSong(event.target.value);
  };
  const songSearchHandler = event => {
    ls.clear();
    lyrics({name: name, song: song})
    setTimeout(filterSongHandler, 5000)
  }
  const filterSongHandler = e => {
    let filteredItem = ls.get('text');
    setLyric(filteredItem.replace("\\n", " <br> "));
    setShowLyrics(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        {!showLyrics ? (
          <React.Fragment>
            <img src={logo} className="App-logo" alt="logo" />
            <div className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-filled">Artist Name</InputLabel>
                <Input id="component-filled" value={name} onChange={nameHandleChange} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-filled">Song Name</InputLabel>
                <Input id="component-filled" value={song} onChange={songHandleChange} />
              </FormControl>
              <Button variant="contained" color="primary" className={classes.button} onClick={songSearchHandler}>
                ~Send!~
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <div>
            <LyricPage text={lyric} />
            <Button variant="contained" color="primary" className={classes.button} onClick={()=> setShowLyrics(false)}>
              Return to Search
            </Button>
          </div>
        )}
      </header>
    </div>
  );
}


