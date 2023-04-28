# Node.js Random Meme Generator

An upLeveled Node.js project that challenges me to create a cli (Command Line Interface) application that scrapes the current version of this website:

memegen-link-examples-upleveled.netlify.app

...and saves the first 10 images into a folder called "memes" within the directory of the new project. The image files should be named with a number with a leading zero, eg. 01.jpg, 02.jpg, etc.

In order to implement this project, I had to break the task down into smaller tasks and so I gave myself the following todo to organise my thoughts and ways of tackling this project:

## TODO:

### Scaffold Project

- [x] Create a github repo and clone it
- [x] Create README.md
- [x] Initialise the project and add `"type": "module",`
- [x] Create .gitignore and add:
  ```bash
  node_modules/
  npm-debug.log*
  .DS_Store
  ```
- [x] Add ESLint configuration
- [x] Create index.js

### Project

- [x] Create `memes` folder in `.gitignore`
- [x] Find a library to make HTTP request
  - [x] Make a GET request to URL.
- [x] Find a library to parse the code and extract specific HTML data
  - [x] Navigate through the HTML of the website and find the sources to be scraped
- [x] Get the src URL strings from the img
- [x] Add the first 10 image URL strings to an array
- [x] Loop over the URLs
- [x] Create a file in memes folder
- [x] Access the img URL
- [x] Store img data from the website to the file
- [x] Test program and run multiple times without errors
