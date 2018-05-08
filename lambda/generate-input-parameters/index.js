var assert = require('assert');
var AWS = require('aws-sdk');
var http = require('http');

exports.handler = function(event, context) {

    var codepipeline = new AWS.CodePipeline();
    var s3 = new AWS.S3();
    
    // Retrieve the Job ID from the Lambda action
    var jobId = event["CodePipeline.job"].id;
    
    // Retrieve the value of UserParameters from the Lambda action configuration in AWS CodePipeline, in this case a URL which will be
    // health checked by this function.
    var url = event["CodePipeline.job"].data.actionConfiguration.configuration.UserParameters; 
    
    var outputArtifacts = event["CodePipeline.job"].data.outputArtifacts;
    
    console.log('outputArtifacts: ', outputArtifacts);
    console.log('location : ', outputArtifacts[0].location);
    console.log('s3Location : ', outputArtifacts[0].location.s3Location);

    var putOutputArtifact = function(parameters, bucket, key, successCallback, failureCallback) {
        var params = {
            Body: JSON.stringify(parameters), 
            Bucket: bucket, 
            Key: key + '/parameters.json',
            ServerSideEncryption: 'aws:kms'
           };
           
           // TODO: Work on permissions for this object so that it can be read by the next step
           // in the deploy pipeline as an artifact
           
           s3.putObject(params, function(err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                failureCallback('s3 put object failed');
            }
            else {
                console.log('s3 put object was successful', data);           // successful response
                successCallback('s3 put object was successful');
            }
        });
    }

    // Notify AWS CodePipeline of a successful job
    var putJobSuccess = function(message) {
        var params = {
            jobId: jobId
        };
        
        codepipeline.putJobSuccessResult(params, function(err, data) {
            if(err) {
                context.fail(err);      
            } else {
                context.succeed(message);      
            }
        });
    };
    
    // Notify AWS CodePipeline of a failed job
    var putJobFailure = function(message) {
        var params = {
            jobId: jobId,
            failureDetails: {
                message: JSON.stringify(message),
                type: 'JobFailed',
                externalExecutionId: context.invokeid
            }
        };
        codepipeline.putJobFailureResult(params, function(err, data) {
            console.log(err);
            context.fail(message);      
        });
    };
    
    var generatedValues = {
        Parameters: {
            // generate password for each execution. We should not need to use this password ever, role/group based access to redshift
            MasterUserPassword: "passW0rd123456789"
        }
    };

    try {
        putOutputArtifact(generatedValues, outputArtifacts[0].location.s3Location.bucketName, outputArtifacts[0].location.s3Location.objectKey, putJobSuccess, putJobFailure);
    } catch (error) {
        console.log(error);
        putJobFailure('something went wrong...');
    }
};