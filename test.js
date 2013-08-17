var tomate = require('./')(process.argv[2]);

// tomate.search('Star Wars', function(err, res){
//   if (err) throw err;
  // console.log('%j\n', res);
// });

tomate.search('Jobs', { page_limit: 1 }, function(err, res){
  if (err) throw err;
  console.log('%j\n', res);
});

tomate.movie('12911', function(err, res){
  if (err) throw err;
  console.log('%j\n', res);
});

tomate.movies('in_theaters', { page_limit: 3 }, function(err, res){
  if (err) throw err;
  console.log('%j\n', res);
});
