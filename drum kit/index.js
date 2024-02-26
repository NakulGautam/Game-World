const numberofdrums = document.querySelectorAll(".drum").length
console.log(numberofdrums)



document.addEventListener("keydown", function(e){
// console.log(this.textContent)
// let key = this.textContent
console.log(e)
console.log(e.key)
makeSound(e.key)
buttonAnimation(e.key)
})

for(let i= 0; i < numberofdrums; i++){
  document.querySelectorAll(".drum")[i].addEventListener("click", function(){
  // console.log(this.textContent)
  let key = this.textContent
  makeSound(key)
  buttonAnimation(key)
  })
  }



function makeSound(key){
 if(key === "w"){
  const tom1 = new Audio("sounds/tom-1.mp3")
  tom1.play()
 }
 else if(key === "a"){
  const tom2 = new Audio("sounds/tom-2.mp3")
  tom2.play()
 }
 else if(key === "s"){
  const tom3 = new Audio("sounds/tom-3.mp3")
  tom3.play()
 }
 else if(key === "d"){
  const tom4 = new Audio("sounds/tom-4.mp3")
  tom4.play()
 }
 else if(key === "j"){
  const snare = new Audio("sounds/snare.mp3")
  snare.play()
 }
 else if(key === "k"){
  const crash = new Audio("sounds/crash.mp3")
  crash.play()
 }
 else if(key === "l"){
  const kickBass = new Audio("sounds/kick-bass.mp3")
  kickBass.play()
 }
 else{
  console.log(key);
 }
}

function buttonAnimation(currentKey){
  const activeButton = document.querySelector("." + currentKey)
  // console.log(activeButton)
  activeButton.classList.add("pressed");
  setTimeout(function(){
    activeButton.classList.remove("pressed");
  }, 100)

}