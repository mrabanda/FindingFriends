var friendList = require('../data/friends.js');

var newPersonScores = [1,2,3,4,5,1,2,3,4,5]

module.exports = function api (app) {
  app.get('/api/friends', function (request, response) {
    response.send(friendList);
  })
  app.post('/api/friends', function (request, response) {
    const newPerson = request.body;
    const newPersonScores = newPerson.scores
    const sumArray = (previous, current) => previous + current;
    
    var counter = 0;

    console.log(friendList);
  
    var getScoresDif = function (number) {
      if (counter === (newPersonScores.length)) {
        counter = 0
      }
      var dif = Math.abs(number - newPersonScores[counter])
      counter++
      return dif
    }

    var compareArray =
      friendList.map((person) => person.scores.map(getScoresDif));
    
    var finalScores = 
      compareArray.map((scoreArr) => scoreArr.reduce(sumArray));

    const lowestDif = Math.min(...finalScores);
    var friendMatchIndex = finalScores.indexOf(lowestDif);

    response.json(friendList[friendMatchIndex])

    friendList.push(newPerson);

  })  
};