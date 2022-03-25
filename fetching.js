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
  /* console.log(bike); */

  const template = document.querySelector("#template_bikes").content;

  const copy = template.cloneNode(true);
  copy.querySelector(".bike h2").textContent = bike.brand;
  copy.querySelector("#model_name").textContent = bike.model;
  copy.querySelector(".price p").textContent = bike.price;
  copy.querySelector(".stock p").textContent = bike.stock;
  console.log(bike.colours);
  let colorArray = bike.colours.split(" ");
  colorArray.forEach((color) => {
    console.log(color);
    copy.querySelector(".colours p").classList.add(color);
  });
  //copy.querySelector(".colours p").setAttribute("class", bike.colours);
  copy.querySelector(".bike img").src =
    bike._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;

  /* const span = document.querySelector(".colours p").textContent;

  if (span === "") {

  } */

  document.querySelector(".colour1");

  const parent = document.querySelector("main");
  parent.appendChild(copy);
}
