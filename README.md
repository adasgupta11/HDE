# General Guide
Each Task project has 2 main subfolder - scripts & log .
 * Within scripts folder all scripts that are being executed to complete the task are kept.
 * Within log folder, files ending with info contains success workflow log. Files ending with error contains failure workflow log.
.env file has been manually populated.



## Task - Setup
 * 5 generated Accounts details can be found in ./accountDetails.json file
 * Each of the account was inititally funded with 500 Hbar
 * 
 ### Steps to execute Setup Tasks
 goto Hedera_certification/01_Task_Setup/scripts path. Then execute -
   node createMultiAccout.js
   
 ### Logs







## Task - Token Service

 ### Steps to execute Setup Tasks
 node createToken.js
 node transferToken.js
 node pauseTokeen.js
 node transferTokenAfterPause.js
 node unpauseToken.js
 node transferTokenAfterPause.js

 ### Logs
Hedera_certification/02_Task_Token_Service/logs


## Task - Smart Contract Service

 ### Steps to execute Setup Tasks
 goto Hedera_certification/06_Task_Consensus_Service/scripts
 execute node deploy.js
 execute node callFunction.js
 ### Logs
Hedera_certification/03_SmartContract_Service/logs



## Task - Scheduled Transaction Service

 ### Steps to execute Setup Tasks
goto scripts folder
node createSchueduledTx.js
 ### Logs
Hedera_certification/04_Scheduled_TX/logs


## Task - Multi Signature Service

 ### Steps to execute Setup Tasks
  goto scripts folder
node accoutAllowance.js
node allowanceTransfer.js
 ### Logs
Hedera_certification/05_MultiSignature_Service/logs

## Task - Consensus Service

 ### Steps to execute Setup Tasks
 goto scripts folder
node createTopic.js
node submitMessage.js
 ### Logs
Hedera_certification/06_Task_Consensus_Service/logs





