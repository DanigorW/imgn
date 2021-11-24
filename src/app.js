const url = 'https://www.reddit.com/r/askreddit.json?count=25';
const loader = document.querySelector(".loader");
const errorPage = document.querySelector(".error");
const paginationLinkNext = document.querySelector(".next-page");
const paginationLinkPrevious = document.querySelector(".previous-page");

paginationLinkPrevious.style.display = "none";
errorPage.style.display = "none";

let nextPostsClicks = 0;
let posts = [];
let nextPosts = null;
let prePosts = null


const getData = async (urlToFetch) => {
    try {
        const req = await fetch(urlToFetch);
        const data = await req.json();
        nextPosts = data.data.after;
        prePosts = data.data.before;

        const dataToWorkWith = data.data.children;

        for (let key in dataToWorkWith) {
            const {
                title,
                url,
                author,
                id,
                created,
                ups,
            } = dataToWorkWith[key].data;

            posts.push({
                title,
                url,
                author,
                id,
                created,
                ups
            })
        }

        renderContent(posts)

    } catch (error) {
        paginationLinkNext.style.display = "none"
        errorPage.style.display = "block";
        loader.style.display = "none";
        throw new Error(error);


    }
};

const convertTime = (data) => {
    const date = new Date(data * 1000).toISOString().substring(0, 10);
    return date.replace(/-/g, '/');;
}

paginationLinkNext.addEventListener("click", () => {
    paginationLinkNext.innerHTML = `Next page (${nextPostsClicks + 1}) `
    posts = [];
    removeElements(".post");
    loader.style.display = "block";
    getData(url + `&after=${nextPosts}`)

    renderContent(posts)
    nextPostsClicks++;
    if (nextPostsClicks > 0) {
        paginationLinkPrevious.style.display = "block";
    }
})

paginationLinkPrevious.addEventListener("click", () => {
    paginationLinkNext.innerHTML = `Next page (${nextPostsClicks - 1}) `
    posts = [];
    removeElements(".post")
    loader.style.display = "block";
    getData(url + `&before=${prePosts}`)
    renderContent(posts)
    nextPostsClicks--
    if (nextPostsClicks == 0) {
        paginationLinkNext.innerHTML = `Next page`
        paginationLinkPrevious.style.display = "none";
    }
})


const renderContent = (dataToRender) => {

    dataToRender.forEach(item => {
        const card = document.createElement("div");
        card.innerHTML = `<div class="post">
        <h3 class="post-header">
           ${item.title}
        </h3>
        
        <span class="author">Author: ${item.author}</span>
        
        <span class="voted">Voted: ${item.ups}</span>
        
        <div class="bottom-link">
        <a class="link" href=${item.url} target="_blank">See full article</a>
        <span>Date: ${convertTime(item.created)}</span>
        </div>
      
        </div>`
        loader.style.display = "none"
        document.querySelector(".posts-container").appendChild(card)
    })
}

const removeElements = (elmToDelete) => {
    document.querySelectorAll(elmToDelete).forEach(elm => {
        elm.parentElement.removeChild(elm);

    })
}

window.addEventListener("load", () => {
    if (document.readyState === "complete") {
        getData(url)
    }
})