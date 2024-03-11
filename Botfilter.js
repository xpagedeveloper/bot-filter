// ==UserScript==
// @name         Aminos.ai Bot filter
// @namespace    http://tampermonkey.net/
// @version      2024-03-11
// @description  Adds a filterbox to the aminos ai gui
// @author       Fredrik Norling
// @match        https://app.aminos.ai/dashboard/bots
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aminos.ai
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
function createFilterSelect() {
  const blogComments = document.querySelectorAll('.blog-comments__item');
  const filterSelect = document.createElement('select');
  filterSelect.id = 'filter-select';

  // Create the first option (all)
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'All';
  filterSelect.appendChild(allOption);

  // Create unique options from text-secondary elements
  const uniqueOptions = new Set();
  blogComments.forEach(comment => {
    const secondaryText = comment.querySelector('.text-secondary');
    if (secondaryText) {
      const orgtext = secondaryText.textContent;
       if (!orgtext.includes(' - ')) {
        uniqueOptions.add('Not defined'); // Add Not defined option
       }else{
      const optionText = secondaryText.textContent.split(' - ')[0];
        uniqueOptions.add(optionText);
      }
    }
  });

  // Create options for the select box
  uniqueOptions.forEach(optionText => {
    const option = document.createElement('option');
    option.value = optionText;
    option.textContent = optionText;
    filterSelect.appendChild(option);
  });

  // Append the select box above the first blog-comments element
  const firstBlogComment = document.querySelector('.blog-comments__item');
  firstBlogComment.parentElement.insertBefore(filterSelect, firstBlogComment);

  // Add event listener to handle option selection
  filterSelect.addEventListener('change', function () {
    const selectedOption = this.value;
    blogComments.forEach(comment => {
      if (selectedOption === 'all') {
        comment.style.display = '';
        comment.classList.add("d-flex");
        comment.classList.add("p-3");
      } else {
        const secondaryText = comment.querySelector('.text-secondary');
        if (secondaryText) {
         var leftPart = secondaryText.textContent.split(' - ')[0];
             if(secondaryText.textContent.indexOf(" - ")==-1){
                 leftPart="Not defined";
             }
          if (leftPart !== selectedOption) {
              console.log("hide")
            comment.style.display = 'none';
              comment.classList.remove("d-flex");
              comment.classList.remove("p-3");
          } else {
              console.log("Display")
            comment.style.display = '';
                comment.classList.add("d-flex");
              comment.classList.add("p-3");
          }
        }
      }
    });
  });
}

// Call the function to create the filter select box
createFilterSelect();
    // Your code here...
})();
