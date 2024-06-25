#!/usr/bin/env bash

# This script fetch the basic data from api once and store it in file system. 
# Since this data is non-volatie i.e figures does not change often that is why in production; 
# this should be stored in S3

# Data that is fetched from API is:
# 1. https://api.footprintnetwork.org/v1/countries (All of the countries)
# 2. https://api.footprintnetwork.org/v1/years (Supported Years 1961-onwards)
# 3. https://api.footprintnetwork.org/v1/types (Data types and their abbrevations For example: EFCpc means Ecological Footprint per person)

API_USERNAME="your_username"
API_PASSWORD="$API_KEY"

# Determine the project root directory
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC_DIR="$PROJECT_ROOT/public"

# Ensure the public directory exists
mkdir -p "$PUBLIC_DIR"

# Set the output file paths
COUNTRIES_FILE="$PUBLIC_DIR/countries.json"
YEARS_FILE="$PUBLIC_DIR/years.json"
TYPES_FILE="$PUBLIC_DIR/types.json"

# Function to fetch data and check for errors
fetch_data() {
    local url="$1"
    local output_file="$2"

    # Perform the curl request
    response=$(curl -u "$API_USERNAME:$API_PASSWORD" -H "Accept: application/json" -w "%{http_code}" -o "$output_file" "$url")

    # Check if the response code is 200 (OK)
    if [ "$response" -ne 200 ]; then
        echo "Failed to fetch data from $url. HTTP status code: $response"
        exit 1
    fi
}

# Fetch all countries
fetch_data "https://api.footprintnetwork.org/v1/countries" "$COUNTRIES_FILE" 

# Fetch supported years
fetch_data "https://api.footprintnetwork.org/v1/years" "$YEARS_FILE" 

# Fetch data types and their abbreviations
fetch_data "https://api.footprintnetwork.org/v1/types" "$TYPES_FILE"



echo "Data fetched successfully and saved in the $PROJECT_ROOT/public directory."
