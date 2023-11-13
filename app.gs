var env = PropertiesService.getScriptProperties().getProperties();
var media_id_final;
var status;

function getService() {
  pkceChallengeVerifier();
  const userProps = PropertiesService.getUserProperties();
  const scriptProps = PropertiesService.getScriptProperties();
  return OAuth2.createService('twitter')
    .setAuthorizationBaseUrl('https://twitter.com/i/oauth2/authorize')
    .setTokenUrl('https://api.twitter.com/2/oauth2/token?code_verifier=' + userProps.getProperty("code_verifier"))
    .setClientId(env.CLIENT_ID)
    .setClientSecret(env.CLIENT_SECRET)
    .setCallbackFunction('authCallback')
    .setPropertyStore(userProps)
    .setScope('users.read tweet.read tweet.write offline.access')
    .setParam('response_type', 'code')
    .setParam('code_challenge_method', 'S256')
    .setParam('code_challenge', userProps.getProperty("code_challenge"))
    .setTokenHeaders({
      'Authorization': 'Basic ' + Utilities.base64Encode(env.CLIENT_ID + ':' + env.CLIENT_SECRET),
      'Content-Type': 'application/x-www-form-urlencoded'
    })
}

function authCallback(request) {
  const service = getService();
  const authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied.');
  }
}

function pkceChallengeVerifier() {
  var userProps = PropertiesService.getUserProperties();
  if (!userProps.getProperty("code_verifier")) {
    var verifier = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

    for (var i = 0; i < 128; i++) {
      verifier += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    var sha256Hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, verifier)

    var challenge = Utilities.base64Encode(sha256Hash)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
    userProps.setProperty("code_verifier", verifier)
    userProps.setProperty("code_challenge", challenge)
  }
}

function logRedirectUri() {
  var service = getService();
  Logger.log(service.getRedirectUri());
}

function main() {
  const service = getService();
  if (service.hasAccess()) {
    Logger.log("Already authorized");
  } else {
    const authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL and re-run the script: %s', authorizationUrl);
  }
}

function sendTweet() {

tweetSpecificFile();

  var payload = {
    text: status,
    media: { media_ids: [media_id_final] }
  }

  var service = getService();
  if (service.hasAccess()) {
    var url = `https://api.twitter.com/2/tweets`;
    var response = UrlFetchApp.fetch(url, {
      method: 'POST',
      'contentType': 'application/json',
      headers: {
        Authorization: 'Bearer ' + service.getAccessToken()
      },
      muteHttpExceptions: true,
      payload: JSON.stringify(payload)
    });
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
  } else {
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL and re-run the script: %s',authorizationUrl);
  }
}

function getService2() {

  return OAuth1.createService('Twitter')

    // set the endpoint URLs.
    .setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
    .setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
    .setAuthorizationUrl('https://api.twitter.com/oauth/authorize')

    // set the consumer key and secret.
    .setConsumerKey(env.CONSUMER_KEY)
    .setConsumerSecret(env.CONSUMER_SECRET)

    // set your user's access token key and secret
    .setAccessToken(env.TOKEN, env.TOKEN_SECRET)

    .setCallbackFunction('authCallback');
}


function uploadTwitterMedia(file, type) {

  var file = DriveApp.getFilesByName(file);

  while (file.hasNext()) {
    var target = file.next();
  }

  var service = getService2();
  var initResponse = initTwitterUpload(target, service, target, type);

  appendTwitterUpload(target, initResponse, service);
  Utilities.sleep(20000);

  finalizeTwitterUpload(initResponse, service);
  Utilities.sleep(20000);

  Logger.log(initResponse["media_id_string"])

  var baseUrl = "https://api.twitter.com/1.1/statuses/update.json?"
  // set desired status
  var params = "status=Bocchi the Rock%21&media_ids=" + initResponse["media_id_string"]
  var tweetUrl = baseUrl + params

  var response = getService2().fetch(tweetUrl, {
    method: 'POST',
    muteHttpExceptions: true
  })

  Logger.log(response)

  return initResponse["media_id_string"]
}

function initTwitterUpload(url, service, file, type) {

  var test = DriveApp.getFilesByName(file)

  while (test.hasNext()) {
    var file = test.next();
    var size = file.getSize();
  }

  var type = file.getMimeType();
  var size = file.getSize()
  var baseUrl = "https://upload.twitter.com/1.1/media/upload.json?"
  console.log("hhhh")
  console.log(type)
  var oauthParams;
  if(type == 'video/mp4'){
    oauthParams = "command=INIT&total_bytes=" + encodeURIComponent(size).replace(/\!/g, "%21")
    .replace(/\*/g, "%2A")
    .replace(/\'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29") + "&media_type=" + encodeURIComponent(type).replace(/\!/g, "%21")
    .replace(/\*/g, "%2A")
    .replace(/\'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29") + "&media_category=" + Oauth1percentEncode("tweetvideo");
  }
  else if(type == 'image/gif'){
    oauthParams = "command=INIT&total_bytes=" + encodeURIComponent(size).replace(/\!/g, "%21")
    .replace(/\*/g, "%2A")
    .replace(/\'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29") + "&media_type=" + encodeURIComponent(type).replace(/\!/g, "%21")
    .replace(/\*/g, "%2A")
    .replace(/\'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29") + "&media_category=" + Oauth1percentEncode("tweetvideo");
  }
  else{
    oauthParams = "command=INIT&total_bytes=" + encodeURIComponent(size).replace(/\!/g, "%21")
    .replace(/\*/g, "%2A")
    .replace(/\'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29") + "&media_type=" + encodeURIComponent(type).replace(/\!/g, "%21")
    .replace(/\*/g, "%2A")
    .replace(/\'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29") + "&media_category=" + Oauth1percentEncode("tweetimage");
  }
  

  var tweetUrl = baseUrl + oauthParams
  Logger.log(tweetUrl)
  var response = service.fetch(tweetUrl, { method: 'POST' })

  Logger.log(JSON.parse(response.getContentText()))
  
  var jsonResponse = JSON.parse(response.getContentText());

  var mediaIdString = jsonResponse.media_id_string;
  var expiresAfterSecs = jsonResponse.expires_after_secs;
  var mediaId = jsonResponse.media_id;
  var mediaKey = jsonResponse.media_key;

  media_id_final = mediaIdString;

  Logger.log("media_id_string: " + mediaIdString);
  Logger.log("expires_after_secs: " + expiresAfterSecs);
  Logger.log("media_id: " + mediaId);
  Logger.log("media_key: " + mediaKey);
  Logger.log(media_id_final);

  return JSON.parse(response.getContentText())
}

function appendTwitterUpload(file, init, service) {

  var options = null
  var response = null
  var baseUrl = "https://upload.twitter.com/1.1/media/upload.json?command=APPEND&media_id=" + init["media_id_string"] +
    "&segment_index=" + Oauth1percentEncode(0);
  var boundary = "xxxxxxxxxx";
  var data = "";

  data += "--" + boundary + "\r\n";
  data += "Content-Disposition: form-data; name=\"status\"\r\n\r\n" + "status" + "\r\n" +
    "--" + boundary + "\r\n"
  data += "Content-Disposition: form-data; name=\"media\"; filename=\"" + file.getName() + "\"\r\n";
  data += "Content-Type:" + file.getMimeType() + "\r\n\r\n";

  var payload = Utilities.newBlob(data).getBytes()
    .concat(file.getBlob().getBytes())
    .concat(Utilities.newBlob("\r\n--" + boundary + "--").getBytes());

  var options = {
    method: "post",
    contentType: "multipart/form-data; boundary=" + boundary,
    payload: payload,
    muteHttpExceptions: true,
  }
  var response = service.fetch(baseUrl, options);

  Logger.log(response.getResponseCode())
  return response.getResponseCode()
}

function finalizeTwitterUpload(init, service) {

  var baseUrl = "https://upload.twitter.com/1.1/media/upload.json?"
  var params = "command=FINALIZE&media_id=" + Oauth1percentEncode(init["media_id_string"])
  var tweetUrl = baseUrl + params
  var response = service.fetch(tweetUrl, {
    method: 'POST',
    muteHttpExceptions: true
  })
  Logger.log(JSON.parse(response.getContentText()))
  return JSON.parse(response.getContentText())
}


function Oauth1percentEncode(text) {

  text = encodeURIComponent(text).replace(/\!/g, "%21")
    .replace(/\*/g, "%2A")
    .replace(/\'/g, "%27")
    .replace(/\(/g, "%28");

  return text
}

function getFileBlob(basename) {

  /* 
    handle the file type and get the proper file name
  */

  var jpg = basename + ".jpg";
  var png = basename + ".png";
  var gif = basename + ".gif";
  var mp4 = basename + ".mp4";
  var jpg_format = jpg.substring(0, 50);
  var png_format = png.substring(0, 50);
  var gif_format = gif.substring(0, 50);
  var mp4_format = mp4.substring(0, 50)
  var jpg_file = DriveApp.getFilesByName(jpg_format);
  var png_file = DriveApp.getFilesByName(png_format);
  var gif_file = DriveApp.getFilesByName(gif_format);
  var mp4_file = DriveApp.getFilesByName(mp4_format);
  var target_file;

  while (jpg_file.hasNext()) {
    target_file = jpg_file.next().getBlob();
    Logger.log(target_file.getName());
  }

  while (png_file.hasNext()) {
    target_file = png_file.next().getBlob();
    Logger.log(target_file.getName());
  }

  while (gif_file.hasNext()) {
    target_file = gif_file.next().getBlob();
    Logger.log(target_file.getName());
  }

  while (mp4_file.hasNext()) {
    target_file = mp4_file.next().getBlob();
    Logger.log(target_file.getName());
  }

  return target_file;
}

function tweetFile() {

  var target_file;
  var final_file;

  // set counter text file and the containing folder
  var fileName="counter.txt";
  var folderName="myfolder";

  var basename;
  var content;

  var reset = parseInt(PropertiesService.getScriptProperties().getProperty('RESET'));

  reset += 1;

  PropertiesService.getScriptProperties().setProperty('RESET', reset.toString());

  // get list of folders with matching name
  var folderList = DriveApp.getFoldersByName(folderName);

    if (folderList.hasNext()) {
      
      // found matching folder
      var folder = folderList.next();

      // search for files with matching name
      var fileList = folder.getFilesByName(fileName);

      if (fileList.hasNext()) {

        // found matching file - append text
        var file = fileList.next();
        // set number of total files
        var total_files = PropertiesService.getScriptProperties().getProperty('TOTAL_FILES');
        var number;

        // find a file that has not been tweeted out yet
        do {

          number = Math.floor(Math.random() * total_files);
          console.log(number)
        
          if(number < 1){
            status = "Hibike! Euphonium"
            basename = number + "hibike" + number;
            nospace = basename;
            content = 'galf' + basename + 'flag' + "\n";
            dif = 1;
          }

          else if(number >= 1 && number < 2){
            status = "Liz and the Blue Bird"
            basename = number + "liz" + number;
            nospace = basename;
            content = 'galf' + basename + 'flag' + "\n";
            dif = 2;
          }

        } while (file.getBlob().getDataAsString().includes(content));
      }
    }

  target_file = getFileBlob(basename);
  final_file = target_file.getName();

  var format = final_file.substring(final_file.length - 3, final_file.length);

  var final = basename + "." + format;

  if (reset == parseInt(PropertiesService.getScriptProperties().getProperty('TOTAL_FILES'))){
          file.setContent("")
          PropertiesService.getScriptProperties().setProperty('RESET', '0');
  }

  return final;

}

function tweetSpecificFile() {

  // set the file to be tweeted
  var filename = tweetFile();
  
  var file = DriveApp.getFilesByName(filename);
  var format = filename.substring(filename.length - 3, filename.length);

  Logger.log(format)

  uploadTwitterMedia(filename, format);
  
}
