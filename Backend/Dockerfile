# Use Node.js LTS as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port your backend runs on (e.g., 5000)
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
