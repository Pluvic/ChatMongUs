# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the port Vite runs on (default: 5173)
EXPOSE 5173

# Run Vite in dev mode
CMD ["npm", "run", "dev", "--", "--host"]
