var ls = require('local-storage');
var lyricsApi = require("apiseeds-lyrics");
var _ = require('lodash');
// const fs = require('fs');

const apikey = 'PUFXtag4o4D95TiYwGlGZNV8wd8Ig1cJCxNh2uqXdcGWrcWuhnQEdDf9yqLai6nj'

export default function lyrics(props) {
  var songArtist = props.name;
  var songName = props.song
  
  function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
  }
  const setToLS = () => {
    var text = ls.get("text");
    let textByLine = text.split("\n")
    var filtered = _.remove(textByLine, function(n) { return n !== '';});
    ls.set('arrayLyrics', filtered)
    return filtered;
  }
  
  lyricsApi.getLyric(apikey, songArtist, songName, function(response,headers) {
    // console.log("Header" , headers);
    // console.log(response);
    ls.set("text", response.result.track.text);
    wait(2000);
    setToLS();
  })

  // let text = fs.readFileSync('./lyric.txt').toString('utf-8')
  
  
  // {ls.remove('text') ? console.log("Success") : console.log("Couldnt remove 'text' from local storage")}

  // console.log(filtered);
 
}