# Use the official Azure Functions Python base image
FROM mcr.microsoft.com/azure-functions/python:4-python3.10

# Set environment variables for Azure Function runtime
ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

# Set working directory inside the container
WORKDIR /home/site/wwwroot

# Copy dependencies and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all function files
COPY . .
