//This file holds any configuration variables we may need
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://william:password3@ds251112.mlab.com:51112/radical_tweet_data', //place the URI of your mongo database here.
  },
  port: (process.env.PORT || 8080)
};
