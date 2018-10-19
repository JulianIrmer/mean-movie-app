const express = require('express');
const cors = require('cors');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
let scArray = [];

//server port
const port = 5000;

//setting up express
const app = express();

//middelware
app.use(cors());
app.use(express.json());
app.use(bodyParser());

//connect to mLab
const dbURL = 'mongodb://moviedb:lala1234@ds123614.mlab.com:23614/hollydb';
const db = mongojs(dbURL, ['movies']);

app.get('/api/getdata', (req, res) => {
  db.movies.find().sort({name: 1},(err, docs) => {
    if(err){
      console.error('DB Error', err);
    }
    else{
      console.log(`Getting all(${docs.length}) entries from mLab!`);
      res.json(docs);
    }
  });
});

app.post('/api/postdata', (req, res) => {
  const data = req.body.params;
  console.log(data);
  // db.movies.save();
});

// ##############################
// GET DATA FROM IMDB.com and save it in a mongo database
// scrape();
function scrape(){
  let name;
  let year;
  let movieURL;
  let rating;
  let director;
  let stars = [];
  let seen;
  let text;
  

  const url = 'https://www.imdb.com/chart/top?ref_=nv_mv_250';
  fetch(url)
    .then(response => response.text())
    .then(body => {
      $ = cheerio.load(body);

      $('.lister-list tr').each((i, item) => {
        const $item = $(item);
        name = $item.find('.titleColumn a').text();
        year = $item.find('.secondaryInfo').text().replace('(', '').replace(')', '');
        movieURL = 'https://www.imdb.com'+$item.find('.titleColumn a').attr('href');
        rating = $item.find('.imdbRating').text().replace(/[^0-9.]/g, '');

        const movie = {
          title: name,
          year: year,
          url: movieURL,
          director,
          stars,
          rating: rating,
          seen,
          text
        }
        scArray.push(movie);
      });

      for(let i = 0; i < scArray.length; i++){
      // for(let i = 0; i < 3; i++){
        // console.log(scArray[i]);
        fetch(scArray[i].url)
          .then(response => response.text())
          .then(body => {
            $ = cheerio.load(body);

            scArray[i].text = $('.summary_text').text();

            scArray[i].director = $('.credit_summary_item').find('a').first().text();

            $('.credit_summary_item:nth-child(4) a').slice(0,3).each((i, item)=>{
              stars.push($(item).text());
            })

            scArray[i].stars = stars;
            stars = [];
            // console.log(scArray[i]);
            
            db.movies.save(scArray[i]);
          })
          .catch(err => console.error(err))
          
      }
      console.log('done pushing');      
    })
    .then()
    .catch(err => console.error(err))
}
// ##############################

//starting the server 
app.listen(port, () => console.log(`Server listening on port ${port}.`));