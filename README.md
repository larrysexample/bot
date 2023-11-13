# Twitter bot
This bot uses Google Drive and Gapps Scripts to tweet images periodically, without repetition.

# Create Gmail account
[Gmail](https://gmail.com)

# Create Twitter account
[Twitter](https://twitter.com) - 
good luck, the captchas are unreasonable

# Prepare your Google Drive folder
Create a folder - in this case I created the folder Hibike
Paste the pics inside this folder

Then, create a new folder inside this one called myfolder. Inside myfolder, create an empty txt file called counter.txt (warning: this has to be a txt file; do not create a google doc. You can create it on Windows and then upload it). Folders should look like this:

# Twitter Developer Part 1
Go [here](https://developer.twitter.com/en/portal/dashboard) and follow the next steps

### Use the Basic tier

### Describe the use cases
This is the text I have used:

"Using twitter API to create a bot that periodically tweets images extracted from shows/anime/manga\
This will be done using google app scripts and google drive
Project is non profit and for entertainment purposes\
No users will be spammed or DMed by this account"

### Create keys and tokens
Generate these keys (save them but do not worry you can regenerate them again if needed)

# Google App Script Part 1
Go to your Google Drive folder and create your script

### Add Auth Libraries
Paste this ID for Oauth1

Do the same process for Oauth2 with this ID

### Get your script link
Grab your script ID, and replace it on this link:
https://script.google.com/macros/d/YOUR_SCRIPT_ID_GOES_HERE/usercallback

Save this link

# Twitter Developer Part 2

Do the same settings as following pictures:

Your callback URI is the link from [this step](###Get-your-script-link)

Save and save your client tokens too

# Google App Script Part 2

### Add keys/other variables
Add the keys you saved from [this step](###Create-keys-and-tokens) and [this one](###Twitter-Developer-Part-2)

RESET is used for the program to loop after tweeting every picture. TOTAL_FILES should be the total number of pictures you have

### Paste the code from app.gs on your script
