# We get node as a base image
FROM node:latest

# We create a directory for our app
RUN mkdir -p /usr/src/app

# We set the working directory
WORKDIR /usr/src/app

# We copy the package.json file
COPY package.json /usr/src/app

# We install the dependencies
RUN npm install

# We copy the rest of the files
COPY . /usr/src/app

# We expose the port
EXPOSE ${PORT}

# We start the app
CMD [ "npm", "start" ]