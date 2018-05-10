#!/bin/sh
#################
# README FIRST! #
#################
# - The pipeline.json need a correct OAUTHTOKEN in order for the GitHub connection to work. 
# An alternative is to set it up in the UI after it has been created. Webhooks can only be crated
# through the UI ;(
# - This script is assuming the region is configured globally using aws configure.
 
 {
   aws codepipeline create-pipeline --cli-input-json file://pipeline.json -OAuthToken
 } ||
 { 
   aws codepipeline update-pipeline --cli-input-json file://pipeline.json
 }

# aws codepipeline get-pipeline --name redshift-deploy-pipeline --region us-east-1

#TODO: - use secure value for OAUTH token
#TODO: Script assumes s3 bucket, IAM roles exist. Create cloud formation script for setting up
# prereqs and their 