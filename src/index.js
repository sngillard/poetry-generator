function displayPoem(response) {
  console.log("poem generated");
  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generatePoem(event) {
  event.preventDefault();

  let userPromptInput = document.querySelector("#user-prompt-input");
  let apiKey = "8t518306o3b66f49626bf9e2c29fafe7";
  let prompt = `User prompt input: Generate a New England poem about ${userPromptInput.value}`;
  let context =
    "You love to write short poems in the style of class New England poets like Henry David Thoreau, Robert Frost, Louisa May Alcott, Ralph Waldo Emerson, Edgar Allan Poe, Emily Dickinson, and Walt Whitman. Your task is to generate a 4-6 line poem in basic HTML and separate each line with a <br />. Include the user input as the poem title in strong with the first letter uppercase. Be sure to follow the user prompt input.";
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  console.log("Generating poem");
  console.log(`Prompt: ${prompt}`);
  console.log(`Context: ${context}`);

  axios.get(apiURL).then(displayPoem);
}

let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);
