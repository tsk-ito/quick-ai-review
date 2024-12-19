# Quick AI Review README

This extension automatically reviews your source code using AI every time you save a file. The review results are displayed as a brief notification in VSCode, helping you improve your code quality quickly and easily.

Enjoy your code reviews with Quick AI Review!

## Features

- Automatically reviews your source code when you save a file.
- Displays the review results in a concise 2-sentence notification within VSCode.

## Requirements

There are no specific external dependencies or configurations required for this extension. Simply install it and start saving files to get immediate code reviews.

## Extension Settings

### replyLanguage

Replies in various languages, depending on the model's capabilities.

### reviewerAssistantUrl

The endpoint to which review requests are sent.

### provider

Currently, only Ollama is supported.

### modelName

The name of the model that performs the review.

### maxLineCount

The maximum number of lines of source code to review. If the source code exceeds this line count, no review will be performed.

## Known Issues

AI-driven reviews are not always perfect, and depending on the model's performance, incorrect feedback may sometimes be given. It is recommended to also manually review your code, rather than relying solely on this extension.

## Release Notes

### 0.0.1

Initial release of Quick AI Review:

First working version of AI-driven code review on file save.
