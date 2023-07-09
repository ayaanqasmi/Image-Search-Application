const apiKey="Pgu0vGrjHd---Zl76nz-PSCeyzcWt0tpBYxI_qIoF2w";

const form=document.querySelector("form");
const searchInp=document.querySelector(".search-inp");
const searchBtn=document.querySelector(".search-btn")
const searchResults=document.querySelector(".search-results");
const showMore=document.querySelector(".show-more");

let pageNo=1;
let inputData="";

async function searchImages(){
    inputData=searchInp.value;
    
    const apiUrl='https://api.unsplash.com/search/photos?page='+pageNo+'&query='+inputData+'&client_id='+apiKey;
console.log(apiUrl);
    const response=await fetch(apiUrl);
    const data=await response.json();
    const results=data.results;
    if(results==""){
        document.querySelector(".error").style.display="block";
        showMore.style.display="none"
        pageNo=1;
        return;
    }
    
    if(pageNo===1){
        searchResults.innerHTML="";
    }
    results.map((results)=>{
        const imgWrapper=document.createElement('div');
        imgWrapper.classList.add("search-result");
        const img=document.createElement('img');
        img.classList.add("search-result__img");
        img.src=results.urls.small;
        img.alt=results.alt_description;
        const imgLink=document.createElement('a');
        imgLink.classList.add("search-result__link");
        imgLink.href=results.links.html;
        imgLink.target="_blank";
        imgLink.textContent=results.alt_description;

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(imgLink);
        searchResults.appendChild(imgWrapper)


    });
    pageNo++;
    if(pageNo>1){
        showMore.style.display="block";
    }
    document.querySelector(".error").style.display="none";

}
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    pageNo=1;
    searchImages();
})
showMore.addEventListener("click",()=>{
    searchImages();
})