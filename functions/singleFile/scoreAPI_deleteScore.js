function main(args) {
  console.log("Score API Action called");
  console.log("Args:" + JSON.stringify(args));

  // require the openwhisk npm package
  var ow = require("openwhisk");

  // read apihost, auth, and namespace from params
  var apiHost = args.FUNCTIONS_APIHOST;
  var namespace = "_";
  var auth = args.FUNCTIONS_AUTHORIZATION;

  // generate api_key from auth
  var base64Auth = new Buffer(auth).toString("base64");
  var apiKey = "Basic " + base64Auth;
  var options = { apihost: apiHost, api_key: apiKey, namespace: namespace };

  // instantiate the openwhisk instance before you can use it
  var openwhisk = ow(options);

  // http://www.stevenatkin.com/index.php/2017/05/16/using-async-and-promises-in-openwhisk/

  return new Promise(function(resolve, reject) {
    //  REST api
    var request = require("request");
    var reqURL = args.SCOREAPI_URL + "api/v1/deletescore";
    console.log("URL: \n", reqURL);
    var restoptions = {
      method: "POST",
      url: reqURL,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-ibm-client-secret": args.SCOREAPI_CLIENT_SECRET,
        "x-ibm-client-id": args.SCOREAPI_CLIENT_ID
      },
      body: { score: { id: args.score.id, rev: args.score.rev } },
      json: true
    };

    request(restoptions, function(error, response, body) {
      console.log("in request");
      if (error) {
        console.error("Failed: %s", error.message);
        reject(error);
      } else {
        var value = JSON.stringify(body);
        console.log("Success: ", value);
        console.log("Response:", response);
        resolve(body);
      }
    });
  });
}

exports.main = main // necessary for local debugging
