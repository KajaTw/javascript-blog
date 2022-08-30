"use strict";

const optCloudClassCount = 5,
optCloudClassPrefix = 'tag-size-';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked!");

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log("clickedElement:", clickedElement);
  clickedElement.classList.add("active");

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll(".post.active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute("href");

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add("active");
}

//* generate links *//

function generateTitleLinks(customSelector = ''){
  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optArticleTagsSelector = ".post-tags .list",
    optTitleListSelector = ".titles";

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);

  function clearTitlelist() {
    titleList.innerHTML = "";
  }

  clearTitlelist();

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = "";

  for (let article of articles) {
    const articleId = article.getAttribute("id");
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
/* [DONE] get the article id */
/* [DONE] find the title element */
/* [DONE] get the title from the title element */
/* [DONE] create HTML of the link */
/* insert link into titleList */

generateTitleLinks();

function generateTags() {
  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optArticleTagsSelector = ".post-tags .list",
    optTitleListSelector = ".titles";

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {
    /* find tags wrapper */

    const wrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = "";

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute("data-tags");

    /* split tags into array */

    const articleTagsArray = articleTags.split(" ");

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";

      /* add generated code to html variable */

      html = html + linkHTML;

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */

    wrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
}
generateTags();

// function tagClickHandler //

function tagClickHandler(event) {
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute("href");

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for (let activeTag of activeTags) {
    /* remove class active */

    activeTag.classList.remove("active");

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let tagLink of tagLinks) {
    /* add class active */

    tagLink.classList.add("active");

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const optArticleTagsSelector = 'a[href^="#tag-"]';
  const links = document.querySelectorAll(optArticleTagsSelector);

  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */

    link.addEventListener("click", tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

// funkcja generateAuthors //

function generateAuthors() {
  const optArticleSelector = ".post",
    optAuthorSelector = ".post-author";

  // find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  // start LOOP for every article //

  for (let article of articles) {
    // find post-author //

    // empty html variable //

    let html = "";

    /* get authors from data-authors attribute*/

    const authors = article.getAttribute("data-author");

    /* generate html link */

    const linkHTML =
      '<li><a href="#tag-' + authors + '">' + authors + "</a></li>";
      console.log(linkHTML);

    /* add generated code to the html variable */

    html = html + linkHTML;

    const wrapper = article.querySelector(optAuthorSelector);
    wrapper.innerHTML = html;
    console.log(wrapper.innerHTML);

    /* insert html of all links into post-author */

    // END LOPP //
  }
}
generateAuthors();

// function calculateTagsParams

function calculateTagsParams(tags) {
  let params = {max: 0, min: 999999};
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    else if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  console.log(params);
return(params);

}
calculateTagsParams();

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) +1 );
  return(optCloudClassPrefix + classNumber);
}

// Tag cloud //
function generateTagCloud() {
  const optTagsListSelector = ".tags.list", optArticleTagsSelector = ".post-tags .list", optArticleSelector = ".post";

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = "";

    /* get tags from data-tags attribute */
    const tags = article.getAttribute("data-tags");

    /* split tags into array */
    const tagsArray = tags.split(" ");
    /* START LOOP: for each tag */
    for (let tag of tagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-'+ tag +'">' + tag + '</a></li>';
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags object*/
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  console.log(allTags);

 /*[NEW] create variable for all links HTML code */

 let allTagsHTML = '';
 
 /*[NEW] start loop: for each tag in allTags: */
 for(let tag in allTags){
 /*[NEW] generate code of a link  and add it to allTagsHTML */
 
  const tagLinkHTML = '<li><a href="#tag-' + tag +'" class="' + calculateTagClass(allTags[tag], tagsParams) +'">' + tag +'</a></li>';
  console.log(tagLinkHTML);
  allTagsHTML += tagLinkHTML;
 //  [NEW] END LOOP: for each tag in allTags: */
  }
 /* [NEW] add html from allTagsHTML to tagList */
 tagList.innerHTML = allTagsHTML;

}
generateTagCloud();


