const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);

const url = "http://vaskommd.com/wp-database/wp/wp-json/wp/v2/bike?_embed";

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })

  .then((data) => {
    /* console.log(data); */
    handleData(data);
  })

  .catch((e) => {
    console.error("an error occured:", e.message);
  });

function handleData(data) {
  data.forEach(showPosts);
}

function showPosts(bike) {
  console.log(bike.colour4); 

  const template = document.querySelector("#template_bikes").content;
  const copy = template.cloneNode(true);

  copy.querySelector(".bike h2").textContent = bike.brand;
  copy.querySelector("#model_name").textContent = bike.model;
  copy.querySelector(".price p").textContent = bike.price;
  copy.querySelector(".stock p").textContent = bike.stock;
  copy.querySelector("#cl1").setAttribute("class", bike.colour1);
  copy.querySelector("#cl2").setAttribute("class", bike.colour2);
  copy.querySelector("#cl3").setAttribute("class", bike.colour3);
  copy.querySelector("#cl4").setAttribute("class", bike.colour4);
  copy.querySelector("#cl5").setAttribute("class", bike.colour5);
  copy.querySelector(".na").textContent = bike.colours;
 
  

  /* let colorArray = bike.colours.split(" "); 

  colorArray.forEach((color) => {
    console.log(color);
    copy.querySelector(".colours p").classList.add(color);
    copy.querySelector(".colours p").setAttribute("class", bike.colours);
  }); */

  
  copy.querySelector(".bike img").src =
    bike._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;

  const parent = document.querySelector("main");
  parent.appendChild(copy);
}
