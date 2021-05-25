# Use Node v8 as the base image.
FROM node:alpine

# create and set app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY backend/services/users/package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Run app
CMD ["npm", "run", "start:dev"]
