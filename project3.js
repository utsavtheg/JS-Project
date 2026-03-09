const images = [
  'img5.jpg',
  'img4.jpg',
  'img3.jpg',
  'img2.jpg',
  'img1.jpg',
]

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const sliderImage = document.querySelector("#sliderImage");
const slideCounter = document.querySelector("#slideCounter");
const dotsContainer = document.querySelector("#dotsContainer");

let currentIndex = 0;

function showSlide(index){
  sliderImage.setAttribute("src",images[index]);
  slideCounter.textContent = `${index+1} / ${images.length}`;

  updateDots(index);
}

function nextSlide(){
  currentIndex++;

  if(currentIndex >= images.length){
    currentIndex = 0
  }

  showSlide(currentIndex);
}

function prevSlide(){
  currentIndex--;
  if(currentIndex < 0){
    currentIndex = images.length-1;
  }
  showSlide(currentIndex);
}
function createDots(){
  images.forEach((image,index)=>{
    const dot = document.createElement("span");
    dot.className = 'dot';

    dot.addEventListener("click",()=>{
      currentIndex = index;
      showSlide(currentIndex);
    })
    dotsContainer.append(dot);
  })
}
function updateDots(index){
  const dots = document.querySelectorAll(".dot");

  dots.forEach(dot=>{
    dot.classList.remove("active");
  })
  dots[index].classList.add('active');
}

nextBtn.addEventListener("click",nextSlide);
prevBtn.addEventListener("click", prevSlide);