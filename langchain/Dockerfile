# Use official Python base image
FROM python:3.12.10-slim

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# RUN pip install langchain python-dotenv langchain-ollama langchain-core langchain_community
# RUN pip freeze

# Copy application files
COPY . .

# Set the command to run the script
CMD ["python", "src/app.py"]