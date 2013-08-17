/**
 * Module dependencies.
 */

var request = require('superagent');

/*
 * Export Client Factory
 */

module.exports = function(key){
  return new Client(key);
};

/*
 * Constructor
 */

function Client(key) {
  if (!key) throw new TypeError('api key required');
  this.remote = 'http://api.rottentomatoes.com/api/public/v1.0/';
  this.key = key;
}

/*
 * Movies Search
 */

Client.prototype.search = function(name, extra, fn){
  if (!name) throw new TypeError('name required');
  if ('function' == typeof extra) {
    fn = extra;
    extra = {};
  }
  extra['q'] = name;
  this.APIRequest(this.remote + 'movies.json', extra, fn);
};

/*
 * Movie Info
 */

Client.prototype.movie = function(id, fn){
  if (!id) throw new TypeError('id required');
  var url = this.remote + 'movies/' + id + '.json';
  this.APIRequest(url, {}, fn);
};

/*
 * Movie Lists
 */

Client.prototype.movies = function(type, extra, fn){
  if (!type) throw new TypeError('type required');
  if ('function' == typeof extra) {
    fn = extra;
    extra = {};
  }
  var url = this.remote + 'lists/movies/' + type + '.json';
  this.APIRequest(url, extra, fn);
};

/*
 * API requests
 */

Client.prototype.APIRequest = function(url, params, fn) {
  request
  .get(url)
  .query({ apikey: this.key })
  .query(params)
  .end(function(err, res){
    if (err) return fn(err);
    try {
      res.body = JSON.parse(res.text);
    } catch (e) {
      // ignore
    }
    fn(null, res.body);
  });
};
