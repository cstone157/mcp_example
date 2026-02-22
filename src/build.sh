#!/bin/bash

# Check and see if nerdctl is installed
if ! command -v nerdctl &> /dev/null
then
    echo "nerdctl could not be found. Please install nerdctl to build the Docker"
    exit
fi

# Build the Docker image
nerdctl build -t mcp_example:latest .
