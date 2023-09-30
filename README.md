![Screenshot 2023-09-08 221308](https://github.com/akshayxemo/intervuMe-web/assets/83893825/16733d29-ce7e-4cbd-8141-891ac82d538f)

# intervuMe-web
This platform offers users the opportunity to prepare for interviews through 1:1 live sessions with mentors, receive performance feedback, and chat with mentors. Mentors can sign up through the admin dashboard and set their availability for meetings. Additionally, the platform integrates subscription payments using the Stripe API and provides performance visualization based on interview results.
- live at [here](https://intervu-me.onrender.com/)
  
# Prerequisite
- <img src="https://cdn.simpleicons.org/nodedotjs/339933" height="20" alt="nodejs logo"  /> &nbsp; Node.js
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="20" alt="git logo"  /> &nbsp; Git
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height="20" alt="vscode logo"  /> &nbsp; VS code (IDE)
- <img src="https://cdn.simpleicons.org/mongodb/47A248" height="20" alt="mongodb logo"  /> &nbsp; Mongodb

installation link -> [NodeJs](https://nodejs.org/en) ⋅ [Git](https://git-scm.com/downloads) ⋅ [VS code](https://code.visualstudio.com/download) ⋅ [mongodb](https://www.mongodb.com/try/download/community)

# Tech stack
<div align="center">
  <img src="https://skillicons.dev/icons?i=mongodb" height="40" alt="mongodb logo"  />
  <img width="12" />
  
  <img src="https://skillicons.dev/icons?i=express" height="40" alt="express logo"  />
  <img width="12" />

  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  
  <img src="https://cdn.simpleicons.org/nodedotjs/339933" height="40" alt="nodejs logo"  />
  <img width="12" />
  
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" height="40" alt="materialui logo"  />
  <img width="12" />
  
  <img src="https://img.shields.io/badge/Socket.io-010101?logo=socketdotio&logoColor=white&style=for-the-badge" height="40" alt="socketio logo"  />
</div>
  
# Setup
- Backend setup
> change directory to backend
```
cd backend
```
> install the modules
```
npm install
```
- Frontend setup
> change directory to frontend
```
cd frontend
```
> install the modules
```
npm install
```
# Run
### Run Backend
```
node index.js
```
- if you had nodemon installed use this in git bash
```
nodemon index.js
```

- install nodemon if not already have it
```
npm i nodemon
```
### Run Frontend
```
npm run dev
```

# How to Test the system 

- Step 1: Sign Up using your any email ID in a browser.
- Step 2: Sign Up pre registerd mentor in another different broweser or PC or device.
  - MENTOR SIGNUP DETAILS
    - Email: royanik08@gmail.com
    - Password: @aniK007
- Step 3: Book a session with the given mentor using your registerd account
- Step 4: now wait for the session status to ongoing and a joining button
- Step 5: Use the joining button from both mentor and mentee ( your account ) to get into the video meeting
- Step 6: If you end call from mentor account ANIK ROY you can see the Result status pop up from where you can give a rating based result
- Step 7: to chat with mentor just follow or add the mentor from the mentor by add icon on top of mentor session booking card and you will see the mentor at your chat box.
- Step 8: Now you can freely chat realtime with mentor (test it with both side it works).
- Step 9: To check the subscription options use the **demo card** information such as 4242424242424242 **DD/MM** 4242 **CVV** 424

**⚠️ Addressing some problem that occour after deploying the site that is when you engaging in the video call for some reason you cant see your own video in the mini video box while you are atively streaming your video (But working perfectly fine in the local device). If you can find any solution to that feel free to connect me and let me know. Also in this deployed platform refreashing will show 404 page not fpund error since its a problem regarding the react router.**

# Screenshots
## Dashboard
  ![Screenshot 2023-09-30 131954](https://github.com/akshayxemo/intervuMe-web/assets/83893825/341932fa-2501-4729-a547-624c7d77cb20)
  
## Booking a mentor
  ![Screenshot 2023-09-30 131803](https://github.com/akshayxemo/intervuMe-web/assets/83893825/f9874ba5-53c1-4370-8e73-52c906875c7d)
  ![Screenshot 2023-09-30 131825](https://github.com/akshayxemo/intervuMe-web/assets/83893825/7bed3d19-d3f0-45b4-9836-3f9be60576be)
  
## Engaging into the video call
  ![Screenshot 2023-09-30 131845](https://github.com/akshayxemo/intervuMe-web/assets/83893825/ee7bfd5d-e4bc-436e-bb58-a8d3489ae576)
  ![Screenshot 2023-09-30 131857](https://github.com/akshayxemo/intervuMe-web/assets/83893825/fbd64a68-190b-495c-b898-cf582299b483)

## Mentor giving the performance result after the end of the meeting
  ![Screenshot 2023-09-30 131932](https://github.com/akshayxemo/intervuMe-web/assets/83893825/c07e8468-a86a-4b4d-bdbb-a2a1e38ed8cc)

## Enflicting performace result in the visualizasion
  ![Screenshot 2023-09-30 131912](https://github.com/akshayxemo/intervuMe-web/assets/83893825/6803f03f-3eed-43a5-9e3b-43a99cfed270)

## Subscription Options
  ![Screenshot 2023-09-30 132008](https://github.com/akshayxemo/intervuMe-web/assets/83893825/608b4e33-fd51-4e7a-b9eb-54bee339d97e)
  ![Screenshot 2023-09-30 132024](https://github.com/akshayxemo/intervuMe-web/assets/83893825/b59a0207-ddf7-4aca-957f-371610873d0d)

# Future Scope
We will add a Mock test system so that user can test their knowledge and prepare themself by giving mock test (MCQ based). Admin can see more details about their sites and have more functionalities. Mentor login can be done using a single request to ther server and sending the actual signup link to its given mail id. Also try to incorporate the error issue regarding the self video preview window in the video meeting. The Subscription plans are there and also it will enflict the current pack but there is no connection with the actual functionalities, meaning with any kind of subscription user able to leverage all the functionalities right now, the restrictions are not made yet.
