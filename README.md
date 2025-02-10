# Fern

A cli to help turn images into pdfs. As well as renaming multiple images from an initial one. The need arose when I decided to store manga 🤓. So, to organize them by volume, it was necessary to sequence the chapter images first and only then generate the PDF with this sequence of images. And that's how Fern 🙂 was born.

## TECHS

- NodeJS
- pdf-lib
- sharp

  **OBS.:** Decorators were used to optimize. The logic of reading the images was the same, so the only thing that changed was the need to manipulate the images... Rename, Generate PDF... etc.

  **OBS.:** It's very simple to create a cli with NodeJS. Basically you have to create an entry point in the root of the project and reference it using the “bin” in package.json.

  ```json
    "bin": {
      "fern": "./cli.js"
    }
  ```

  ## USE CASES

- **Generate PDF**
- **Rename**

## RUNNING

- Ensure that .cli is executable

```bash
  chmod +x cli.js # In the project directory
```

- just make sure that cli is found globally in the terminal

```bash
  npm link # In the project directory
```

This project is licensed under the MIT License - see the [MIT](https://opensource.org/licenses/MIT) file for details.
