# aws-deploy-demo

This is a repo use to play with various AWS products. Below there's some useful documentation I used in building the demo.

## Configuration parameters / secrets

Systems Manager Parameters: <https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-about.html>

## YAML or JSON?

- <https://aws.amazon.com/blogs/mt/the-virtues-of-yaml-cloudformation-and-using-cloudformation-designer-to-convert-json-to-yaml/>

## AWS Lambda

### Automating Deployment

Tutorial: <https://docs.aws.amazon.com/lambda/latest/dg/build-pipeline.html>
AWS SAM: <https://github.com/awslabs/serverless-application-model>

Additional steps, not covered by tutorial or incomplete in tutorial:

1. IAM Role configuration: AWS-CloudFormation-LambdaExecute with additional policies:
- Cloud Formation - Create Change Set
- IAM - Pass Role
- Lambda - Create Function

1. Execute Change Set step in pipeline

2 Distinct steps are required, first for creating or updating the change set on an existing stack. Second for actually executing the change set. TODO: These will better be reflected in the CLI scripts for creating the pipeline.

If second step fails, the stack rolls back and retrying the step fails. TODO: Figure out a better/easier way to handle failures.

## Redshift

- <https://aws.amazon.com/blogs/big-data/create-an-amazon-redshift-data-warehouse-that-can-be-securely-accessed-across-accounts/>
- <https://aws.amazon.com/blogs/big-data/automating-analytic-workflows-on-aws/>
- <https://docs.aws.amazon.com/redshift/latest/mgmt/generating-user-credentials.html>
- <https://github.com/awslabs/amazon-redshift-utils>
- <https://aws.amazon.com/blogs/big-data/top-8-best-practices-for-high-performance-etl-processing-using-amazon-redshift/>
- <https://aws.amazon.com/blogs/big-data/optimizing-for-star-schemas-and-interleaved-sorting-on-amazon-redshift/>
- <https://docs.aws.amazon.com/redshift/latest/dg/best-practices.html>

## AWS CLI

Getting Started: <https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html>
Create a Pipeline using the CLI: <https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create.html#pipelines-create-cli>
Create a CodeBuild project using the CLI:
<https://docs.aws.amazon.com/codebuild/latest/userguide/getting-started.html#getting-started-create-build-project-cli>