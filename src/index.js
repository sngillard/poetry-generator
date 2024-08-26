function displayPoem(response) {
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
    "You love to write short poems in the style of classic New England poets like Henry David Thoreau, Robert Frost, Louisa May Alcott, Ralph Waldo Emerson, Edgar Allan Poe, Emily Dickinson, and Walt Whitman. Your task is to generate a 4-8 line poem in basic HTML and separate each line with a <br />. Include the user input as the poem title in strong with the first letter uppercase. Be sure to follow the user prompt input. Do not print 'html' just generate the poem in HTML.";
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let poemElement = document.querySelector("#poem");
  poemElement.classList.remove("hidden");
  poemElement.innerHTML = `<div class="blink">Generating a poem about ${userPromptInput.value} ✍🏽</div>`;

  axios.get(apiURL).then(displayPoem);
}

let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);

let slideIndex = 1;
let slideInterval;
let isNavigating = false; //Prevent multiple intervals

//Show slides based on slideIndex
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  //Handle wrap-around
  if (n > slides.length) {
    slideIndex = 1;
  } else if (n < 1) {
    slideIndex = slides.length;
  } else {
    slideIndex = n;
  }

  //Hide all slides and reset all dots
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  //Display the current slide and set the active dot
  slides[slideIndex - 1].style.display = "block";
  if (dots.length > 0) {
    dots[slideIndex - 1].className += " active";
  }
}

//Show the initial slide
showSlides(slideIndex);

//Change slideIndex and show the next or previous slide
function plusSlides(n) {
  if (isNavigating) return; //Prevent multiple clicks
  isNavigating = true;

  slideIndex += n;
  showSlides(slideIndex);

  setTimeout(() => {
    isNavigating = false; //Allow navigation after delay
  }, 500); //Adjust timeout
  resetAutoSlide(); //Restart auto-slide after user interaction
}

//Set the current slide and restart auto-slide
function currentSlide(n) {
  if (isNavigating) return; //Prevent multiple clicks
  isNavigating = true;

  slideIndex = n;
  showSlides(slideIndex);
  setTimeout(() => {
    isNavigating = false; //Allow navigation after delay
  }, 500);

  resetAutoSlide(); //Restart auto-slide after user interaction
}

//Start automatic slide transition
function startAutoSlide() {
  slideInterval = setInterval(function () {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000); //Change slide every 5 seconds
}

//Restart automatic slide transition
function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

//Initialize auto-slide
startAutoSlide();

//Attach event listeners to buttons and dots
document.querySelector(".prev").addEventListener("click", function () {
  plusSlides(-1); //Show the previous slide
});

document.querySelector(".next").addEventListener("click", function () {
  plusSlides(1); //Show the next slide
});

let dots = document.querySelectorAll(".dot");
dots.forEach((dot, index) => {
  dot.addEventListener("click", function () {
    currentSlide(index + 1); //Show the clicked slide
  });
});
