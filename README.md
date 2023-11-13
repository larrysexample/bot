# Twitter bot
This bot uses Google Drive and Gapps Scripts to tweet images periodically, without repetition.

# Create Gmail account
[Gmail](https://gmail.com)

![image](https://github.com/larrysexample/bot/assets/150640746/add97cac-bc4e-499d-8507-4b9f9f98ea64)

# Create Twitter account
[Twitter](https://twitter.com) - 
good luck, the captchas are unreasonable

![image](https://github.com/larrysexample/bot/assets/150640746/5d22c2fe-b591-4f75-a2a1-778b8b016e11)

# Prepare your Google Drive folder
Create a folder - in this case I created the folder Hibike
Paste the pics inside this folder

Then, create a new folder inside this one called myfolder. Inside myfolder, create an empty txt file called counter.txt (warning: this has to be a txt file; do not create a google doc. You can create it on Windows and then upload it). Folders should look like this:

![image](https://github.com/larrysexample/bot/assets/150640746/95d8c5fd-46b4-4ccf-8911-6b11094e8ed7)
![image](https://github.com/larrysexample/bot/assets/150640746/76cba686-5fff-4b69-b94c-c5dfbed5512d)

# Twitter Developer Part 1
Go [here](https://developer.twitter.com/en/portal/dashboard) and follow the next steps - login if you haven't

### Use the Basic tier

![image](https://github.com/larrysexample/bot/assets/150640746/36d4f283-c176-4f48-b91d-8f8676c93259)

### Describe the use cases

![image](https://github.com/larrysexample/bot/assets/150640746/4071ee8b-e8b9-4a62-b1fc-fc39b92f1209)

This is the text I have used:

"Using twitter API to create a bot that periodically tweets images extracted from shows/anime/manga\
This will be done using google app scripts and google drive
Project is non profit and for entertainment purposes\
No users will be spammed or DMed by this account"

### Create keys and tokens

![image](https://github.com/larrysexample/bot/assets/150640746/02f24d41-985a-406c-ac78-8f778f811566)

Generate these keys (save them but do not worry you can regenerate them again if needed)

![image](https://github.com/larrysexample/bot/assets/150640746/0211861b-2dbc-4998-930a-ce161195798c)

# Google App Script Part 1
Go to your Google Drive folder and create your script

![image](https://github.com/larrysexample/bot/assets/150640746/cb55f745-3df9-4ed2-8afa-ee26b72d794a)

### Add Auth Libraries

On the left side click on the plus next to libraries

Paste this ID for Oauth1: 1CXDCY5sqT9ph64fFwSzVtXnbjpSfWdRymafDrtIZ7Z_hwysTY7IIhi7s  and then look up and add

![image](https://github.com/larrysexample/bot/assets/150640746/d42c57af-6c5c-463b-91ae-ee558294fe73)

Do the same process for Oauth2 with this ID 1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF 

https://github.com/googleworkspace/apps-script-oauth1
https://github.com/googleworkspace/apps-script-oauth2

### Get your script link
Go to settings, grab your script ID, and replace it on this link:
https://script.google.com/macros/d/YOUR_SCRIPT_ID_GOES_HERE/usercallback

![image](https://github.com/larrysexample/bot/assets/150640746/8af67d7a-412d-459e-9e7e-a851e14a7226)

Save this link

# Twitter Developer Part 2

Set up user auth

![image](https://github.com/larrysexample/bot/assets/150640746/10960dd2-c8e3-4845-a81c-3f39a4ea3d67)
![image](https://github.com/larrysexample/bot/assets/150640746/716811ef-2ff8-4300-adf7-db432415221c)

Do the same settings as following pictures:

![image](https://github.com/larrysexample/bot/assets/150640746/71c4a430-1ae4-40ec-8051-e29a6609fe39)

![image](https://github.com/larrysexample/bot/assets/150640746/5cd66f37-7eb2-4dda-94c2-fd17016bae51)

Your callback URI is the link from [this step](#get-your-script-link)

Save and save your client tokens too

![image](https://github.com/larrysexample/bot/assets/150640746/3113ded5-dff6-497b-bfec-b81aed7ec776)

# Google App Script Part 2

### Add keys/other variables
Go to settings the keys you saved from [this step](#create-keys-and-tokens) and [this one](#twitter-developer-part-2)

![image](https://github.com/larrysexample/bot/assets/150640746/dd9cef34-16fd-4ad2-b9dd-b1aa62f03931)

RESET is used for the program to loop after tweeting every picture. TOTAL_FILES should be the total number of pictures you have

### Paste the code from app.gs on your script

Run sendTweet

![image](https://github.com/larrysexample/bot/assets/150640746/d55128ae-3cc4-4a3f-827f-8acefd500ea5)


You might have to do these:

![image](https://github.com/larrysexample/bot/assets/150640746/f41cdbf2-ecdf-439a-9852-64b44d84c3ce)

Just click Advanced -> Go to project

![image](https://github.com/larrysexample/bot/assets/150640746/f2d97f72-fd35-4a51-b3ca-30b12a33cfec)

Open link and confirm

And voilà

![image](https://github.com/larrysexample/bot/assets/150640746/82ff862d-6905-4c04-9485-7e8bc11eb6eb)

After that you can setup triggers

![image](https://github.com/larrysexample/bot/assets/150640746/ec97ce67-1499-45b0-953a-f7fcc594290e)
![image](https://github.com/larrysexample/bot/assets/150640746/84913f01-f809-45f9-901a-41819c10c06e)



