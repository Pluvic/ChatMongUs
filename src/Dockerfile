# Use Node.js as the base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose backend port
EXPOSE 3000

# Run backend
CMD ["node", "app.js"]
