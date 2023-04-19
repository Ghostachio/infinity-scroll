const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const count = 30;
const apiKey = '4ikUPyhptPgrbwGzjhV4aAZKrhDktUdfn9I5GHAEhJ4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


const imageLoaded = () =>{
    imagesLoaded ++;
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready = ', ready);
    }
    
}


// get photos from unsplash api 

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error){
    // catch error here
    }
}

// create elements for links and photos and andd to dom
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images ', totalImages);
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

window.addEventListener('scroll', function(){
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready === true) {
        ready = false;
        getPhotos();
        console.log('scrolled')
    }
})




// on load
getPhotos();



