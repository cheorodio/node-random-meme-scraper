import fs from 'node:fs';
import axios from 'axios';
import { load } from 'cheerio';

// create memes folder
try {
  if (!fs.existsSync('memes')) {
    fs.mkdirSync('memes');
  }
} catch (err) {
  console.error(err);
}

const imgUrls = [];

// extract HTML from the URL
const html = await axios.get(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const $ = load(html.data);

// get the img source from the HTML
const imgs = $('div');
imgs.each(function () {
  const image = $(this).find('img').attr('src');

  // save the img sources in an array
  imgUrls.push(image);
});

// get only the first 10 images
const filteredImgUrls = imgUrls.slice(3, 13);

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

// for loop to download each link
for (let i = 0; i < 10; i++) {
  const imageUrl = filteredImgUrls[i];
  const imageName = `memes/0${i + 1}.jpg`;
  await download(imageUrl, imageName);
}
