import fs from 'node:fs';
import axios from 'axios';
import { load } from 'cheerio';

// create memes folder
if (!fs.existsSync('memes')) {
  fs.mkdirSync('memes');
}

const imageUrls = [];

// extract HTML from the URL
const html = await axios.get(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const $ = load(html.data);

// get the image source from the HTML
const images = $('div');
images.each(function () {
  const image = $(this).find('img').attr('src');

  // save the image sources in an array
  imageUrls.push(image);
});

// get only the first 10 images
const filteredImageUrls = imageUrls.slice(3, 13);

// download the images
async function download(url, filepath) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on('error', reject)
      .once('close', () => resolve(filepath));
  });
}

// format the naming of the images
function format(n) {
  return (n < 10 ? '0' : '') + n;
}

// for loop to download each image
for (let i = 0; i < 10; i++) {
  const imageUrl = filteredImageUrls[i];
  const imageName = `memes/${format(i + 1)}.jpg`;
  await download(imageUrl, imageName);
}
