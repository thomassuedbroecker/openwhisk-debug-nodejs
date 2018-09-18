**CUSTOMIZED VERSION OF THE PROJECT**

# Debugging Node.js OpenWhisk Functions in VS Code

**Table of content**

* [1 Motivation and introduction](#part01)
* [2 Prerequisites and Setup](#part02)
* [3 Using the debugging in Visual Studio Code for OpenWhisk functions](#part03)
* [3.1 Debugging from Visual Studio Code](#part031)
* [3.2 Debugging Single File Functions](#part032)
* [3.3 Debugging Zipped Functions](#part033)
* [3.4 Debugging Functions in Docker Containers](#part034)
* [3.5 Debugging dockerized Functions](#part035)
* [3.6 Debugging TypeScript Functions in Docker Containers](#part036)
* [4 Additional Resources](#part04)

## 1 Motivation and introduction

### 1.1 The objective <a name="part01"></a>

This [project](https://github.com/nheidloff/openwhisk-debug-nodejs) shows how [Apache OpenWhisk](http://openwhisk.org/) functions can be developed and debugged locally via [Visual Studio Code](https://code.visualstudio.com/).

This project **doesn't** contain a **new tool** or OpenWhisk **extension**. 
Instead it contains sample _functions_ and the **configurations** of VS Code that explains:
_How to debug your own _functions_ code you want to execute in **OpenWhisk** or in **IBM Functions**._

It is very useful that you get familiar with the visual studio code configurations, because this is more or less the **magic part** for the debugging.

1. Where are configurations stored inside visual studio code?
In the following image you can see the where you can find the **configurations** for your **visual studio code** project.

![Configurations inside VS Code 01](https://github.com/thomassuedbroecker/openwhisk-debug-nodejs/raw/master/images/vs-configurations-01.png "Debugging")

2. The next picture shows: Where to define the configuration?

![Configurations inside VS Code 02](https://github.com/thomassuedbroecker/openwhisk-debug-nodejs/raw/master/images/vs-configurations-02.png "Debugging")

_Note:_ Keep in mind you just **simply debug the normal technology**, before you upload or update the code into OpenWhisk.

You don't need to use Docker to debug functions unless you want to write your functions in Docker containers. In the simplest case clone the repo, overwrite the samples in functions/singleFile with your own code and run the debug configurations.

---
### 1.2 The supported scenarios 
[->](#part01)
Five different scenarios are supported by the different debugging configurations.

* *Single file JavaScript* functions (synch and asynch)
* *Zipped JavaScript functions* with additional npm dependencies
* *JavaScript* functions running in *Docker containers*
* *Dockerized JavaScript functions* running in the local Node.js runtime
* *TypeScript functions* running in Docker containers

The following screenshot shows how functions that run in **Docker** can be debugged from Visual Studio Code. In order to do this, a volume is used to share the files between the IDE and the container and VS Code attaches a **remote debugger** to the **Docker container**. 

You this has the advantage the functions can **be changed** in the IDE **without having to restart** the container. [nodemon](https://github.com/remy/nodemon) restarts the Node application in the container automatically when files change.

![alt text](https://github.com/nheidloff/openwhisk-debug-nodejs/raw/master/images/debugging-docker-3.png "Debugging")

### 1.3 Additional documentation in YouTube 
[->](#part01)
Watch the [video](https://www.youtube.com/watch?v=P9hpcOqQ3hw) to see this in action.

---
## 2 Prerequisites and Setup <a name="part02"></a>
[->](#part01) 
In order to use the **configurations** for your **visual studio code** you need the following prerequisites and you need to set up your system.

---
### 2.1 Prerequisites
[->](#part01)
Make sure you have the following tools installed:

* [Visual Studio Code](https://code.visualstudio.com/)
   **You have to enable the cli in Visual Studio** "https://code.visualstudio.com/docs/setup/mac"
* [Node](https://nodejs.org/en/download/)
* [Docker](https://docs.docker.com/engine/installation/)
* [git](https://git-scm.com/downloads)
* [IBM Cloud account](https://ibm.biz/nheidloff)

---
### 2.2 Setup
[->](#part01)
Run the following commands to open the **visual studio code** inside the current folder.

```sh
$ git clone https://github.com/nheidloff/openwhisk-debug-nodejs.git
$ cd openwhisk-debug-nodejs
$ npm install
$ code .
```

_NOTE:_ Niklas has predefined several **configurations** to debug the OpenWhisk sample inside the github.

---
## 3 Using the debugging in Visual Studio Code for OpenWhisk functions <a name="part03"></a>

### 3.1 Debugging from Visual Studio Code <a name="part031"></a>
[->](#part01)
There are two ways to start the debugger in VS Code:

* From the [debug page](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/start-debugger-ui.png) choose the specific launch configuration
* Open the [command palette](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/start-debugger-palette-1.png) (⇧⌘P) and search for 'Debug: Select and Start Debugging' or enter 'debug se'. After this select the specific [launch configuration](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/start-debugger-palette-2.png)

---
### 3.2 Debugging **Single File Functions** <a name="part032"></a>
[->](#part01)
There are three sample functions:

* [function.js](functions/singleFile/function.js)
* [functionAsynch.js](functions/singleFile/functionAsynch.js)
* [functionAsychReject.js](functions/singleFile/functionAsychReject.js)

---
#### 3.2.1 Debugging
[->](#part01)
To run and debug the functions, you can define the input as JSON in [payload.json](payloads/payload.json). In order to debug the functions, set breakpoints in the code.

Run the launch configurations 'function.js', 'functionAsynch.js' and 'functionAsychReject.js' to run and debug the functions - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-single-file-1.png).

---
#### 3.2.2 Deployment and Invocation
[->](#part01)
In order to deploy the functions to IBM Cloud Functions, replace 'your-ibm-cloud-organization' and 'your-ibm-cloud-space' and run the following commands:

```sh
$ bx login -a api.ng.bluemix.net
$ bx target -o <your-ibm-cloud-organization> -s <your-ibm-cloud-space>
$ bx plugin install Cloud-Functions -r Bluemix
$ cd openwhisk-debug-nodejs/functions/singleFile
$ bx wsk action create function function.js
$ bx wsk action invoke --blocking function --param name Niklas
$ bx wsk action create functionAsynch functionAsynch.js
$ bx wsk action invoke --blocking functionAsynch --param name Niklas
$ bx wsk action create functionAsynchReject functionAsynchReject.js
$ bx wsk action invoke --blocking functionAsynchReject --param name Niklas
```

After you've changed the functions and created them on IBM Cloud Functions, use 'bx wsk action update' instead of 'bx wsk action create'.

---
### 3.3 Debugging Zipped Functions <a name="part033"></a>
[->](#part01)
There is a sample function [functionAsynch.js](functions/zip/functionAsynch.js) that shows how to use a npm module which is not supported by the standard [OpenWhisk Node runtime](https://hub.docker.com/r/openwhisk/nodejs6action/~/dockerfile/).

---
#### 3.3.1 Debugging
[->](#part01)
To run and debug the function, you can define the input as JSON in [payload.json](payloads/payload.json). In order to debug the function, set breakpoints in [functionAsynch.js](functions/zip/functionAsynch.js).

Install the npm modules:

```sh
$ cd openwhisk-debug-nodejs/functions/zip
$ npm install
```

Run the launch configurations 'zip' to run and debug the function - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-zip.png).

---
#### 3.3.2 Deployment and Invocation
[->](#part01)
In order to deploy the functions to IBM Cloud Functions, replace 'your-ibm-cloud-organization' and 'your-ibm-cloud-space' and run the following commands:

```sh
$ bx login -a api.ng.bluemix.net
$ bx target -o <your-ibm-cloud-organization> -s <your-ibm-cloud-space>
$ bx plugin install Cloud-Functions -r Bluemix
$ cd openwhisk-debug-nodejs/functions/zip
$ sh deploy.sh
$ bx wsk action invoke --blocking zippedFunctionAsynch --param name Niklas
```

After you've changed the function and created it on IBM Cloud Functions, use 'bx wsk action update' instead of 'bx wsk action create' in [deploy.sh](functions/zip/deploy.sh).

---
### 3.4 Debugging Functions in Docker Containers <a name="part034"></a>
[->](#part01)
There is a sample function [function.js](functions/docker/function.js) that shows how to write an OpenWhisk function running in a container by implementing the endpoints '/init' and '/run'.

The function can be changed in the IDE without having to restart the container after every change. Instead a mapped volume is used to share the files between the IDE and the container and [nodemon](https://github.com/remy/nodemon) restarts the Node application in the container automatically when files change.

---
#### 3.4.1 Debugging
[->](#part01)
Run the following commands in a terminal to run the container - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-docker-1.png):

```sh
$ cd openwhisk-debug-nodejs/functions/docker
$ docker-compose up --build
```

Run the launch configurations 'function in container' to attach the debugger - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-docker-2.png).

You can define the input as JSON in [payload.json](payloads/payload.json). Set breakpoints in [function.js](functions/docker/function.js). After this invoke the endpoints in the container by running these commands from a second terminal - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-docker-3.png).

```sh
$ cd openwhisk-debug-nodejs
$ node runDockerFunction.js
```

You'll see the output of the function in the terminal - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-docker-4.png).

After you're done stop the container via these commands in the first terminal - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-docker-5.png):

```sh
$ cd openwhisk-debug-nodejs/functions/docker
$ docker-compose down
```

---
#### 3.4.2 Deployment and Invocation
[->](#part01)
In order to deploy the functions to IBM Cloud Functions, replace 'your-ibm-cloud-organization', 'your-ibm-cloud-space' and 'dockerhub-name' and run the following commands:

```sh
$ bx login -a api.ng.bluemix.net
$ bx target -o <your-ibm-cloud-organization> -s <your-ibm-cloud-space>
$ bx plugin install Cloud-Functions -r Bluemix
$ cd openwhisk-debug-nodejs/functions/docker
$ docker build -t <dockerhub-name>/openwhisk-docker-nodejs-debug:latest .
$ docker push <dockerhub-name>/openwhisk-docker-nodejs-debug
$ bx wsk action create actionDocker --docker <dockerhub-name>/openwhisk-docker-nodejs-debug:latest
$ bx wsk action invoke --blocking actionDocker --param name Niklas
```

---
### 3.5 Debugging dockerized Functions <a name="part035"></a>
[->](#part01)
You can run and debug the same dockerized function [function.js](functions/docker/function.js) in your local Node.js runtime without Docker.

---
#### 3.5.1 Debugging
[->](#part01)
Run these commands to install the dependencies:

```sh
$ cd openwhisk-debug-nodejs/functions/docker
$ npm install
```

Run the launch configurations 'dockerized function' to launch the debugger - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-dockerized-1.png).

You can define the input as JSON in [payload.json](payloads/payload.json). Set breakpoints in [function.js](functions/docker/function.js). After this invoke the endpoints in the container by running these commands from a terminal - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-dockerized-3.png).

```sh
$ cd openwhisk-debug-nodejs
$ node runDockerFunction.js
```

---
#### 3.5.2 Deployment and Invocation
[->](#part01)
See above. This is identical to 'Debugging Functions in Docker Containers'.

---
### 3.6  Debugging TypeScript Functions in Docker Containers <a name="part036"></a>
[->](#part01)
There is a sample function [function.ts](functions/typescript/src/function.ts) that shows how to write an OpenWhisk function in TypeScript running in a container by implementing the endpoints '/init' and '/run'.

The function can be changed in the IDE without having to restart the container after every change. Instead a mapped volume is used to share the files between the IDE and the container and [nodemon](https://github.com/remy/nodemon) restarts the Node application in the container automatically when files change.

---
#### 3.6.1 Debugging
[->](#part01)
Run the launch configurations 'typescript function' to start the container and to attach the debugger - see [screenshot](https://github.com/nheidloff/openwhisk-debug-nodejs/blob/master/images/debugging-typescript.png).

You can define the input as JSON in [payload.json](payloads/payload.json). Set breakpoints in [function.ts](functions/typescript/src/function.ts). After this invoke the endpoints in the container by running these commands from a second terminal.

```sh
$ cd openwhisk-debug-nodejs
$ node runDockerFunction.js
```

You'll see the output of the function in the terminal.

After you're done stop the container via these commands in the first terminal.

```sh
$ cd openwhisk-debug-nodejs/functions/typescript
$ docker-compose down
```
---
#### 3.6.2 Deployment and Invocation
[->](#part01)
In order to deploy the functions to IBM Cloud Functions, replace 'your-ibm-cloud-organization', 'your-ibm-cloud-space' and 'dockerhub-name' and run the following commands:

```sh
$ bx login -a api.ng.bluemix.net
$ bx target -o <your-ibm-cloud-organization> -s <your-ibm-cloud-space>
$ bx plugin install Cloud-Functions -r Bluemix
$ cd openwhisk-debug-nodejs/functions/typescript
$ docker build -t <dockerhub-name>/openwhisk-docker-typescript-debug:latest .
$ docker push <dockerhub-name>/openwhisk-docker-typescript-debug
$ bx wsk action create actionTypeScript --docker <dockerhub-name>/openwhisk-docker-typescript-debug:latest
$ bx wsk action invoke --blocking actionTypeScript --param name Niklas
```

---
## 4 Additional Resources <a name="part04"></a>
[->](#part01)
To find out more about how to develop OpenWhisk functions locally, check out the following resources:

* [Advanced debugging of OpenWhisk actions](https://medium.com/openwhisk/advanced-debugging-of-openwhisk-actions-518414636932)
* [wskdb: The OpenWhisk Debugger](https://github.com/apache/incubator-openwhisk-debugger)
* [Testing node.js functions locally](https://github.com/apache/incubator-openwhisk-devtools/tree/master/node-local)