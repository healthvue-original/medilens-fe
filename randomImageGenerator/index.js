import Jimp from "jimp";

function randomImage() {
  // Define the size of the image
  const width = 9560;
  const height = 9560;
  // Create a new image
  new Jimp(width, height, (err, image) => {
    if (err) throw err;
    // Loop through each pixel
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        // Generate random color values for each pixel
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        // Set the pixel color
        const color = Jimp.rgbaToInt(red, green, blue, 255);
        image.setPixelColor(color, x, y);
      }
    }
    // Save the image
    image.write("random_image.png", (err) => {
      if (err) throw err;
      console.log("Random image saved as random_image.png");
    });
  });
}

function gradientImage() {
  const width = 8000;
  const height = 8000;

  new Jimp(width, height, (err, image) => {
    if (err) throw err;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const r = (x / width) * 255;
        const b = (y / height) * 255;
        const color = Jimp.rgbaToInt(r, 0, b, 255);
        image.setPixelColor(color, x, y);
      }
    }

    image.write("gradient_image.png", (err) => {
      if (err) throw err;
      console.log("Gradient image generated and saved as gradient_image.png");
    });
  });
}

randomImage();