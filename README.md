# Godolog

Blog template to use Google Docs as article editor.

## Usage

### Set up

1. Create a new repository from [Use this template](https://github.com/r7kamura/godolog/generate) button above with **Include all branches** option.
2. Set up service account and OIDC settings on Google Cloud Platform.
3. Create a folder on Google Drive and share it with the account.
4. Set secrets on your GitHub repository.
    - `GOOGLE_DRIVE_FOLDER_ID`
    - `GOOGLE_SERVICE_ACCOUNT`
    - `GOOGLE_WORKLOAD_IDENTITY_PROVIDER`

I prepared a simple shell script that creates the necessary GCP resources for OIDC settings by using `cloud` command. Fill in some required variables and then run this script.

- https://gist.github.com/r7kamura/59b0eff812c834aa5e34143adfba6b1e

### Write articles

Once set up, the documents in the folder will be periodically synced as articles.

Note that there is a restriction on the document file name,
which must be in the format like "YYYY-MM-DD-slug" (e.g. "2022-05-05-foo-bar").
This file name will be used for the article URL and the published date.
