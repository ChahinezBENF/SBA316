# project dicription :

# Requirement : with exemple from the code 
- Cache at least one element using selectElementById. ==> const reportForm = document.getElementById("reportForm");
- Cache at least one element using querySelector or querySelectorAll :
                        ==> const field = document.querySelector(`[name="${fieldName}"]`);
                        ==> const planResults = document.querySelectorAll('.planResult');
- Use the parent-child-sibling relationship to navigate between elements at least once (firstChild, lastChild, parentNode,     
nextElementSibling, etc.):
                        ==> observation: result.parentElement.previousElementSibling.textContent.trim(),
- Iterate over a collection of elements to accomplish some task:
                        ==> for (let result of Results):
                        ==>planResults.forEach((result)..)
- Create at least one element using createElement:
                        ==> const errorItem = document.createElement("p");
- Use appendChild and/or prepend to add new elements to the DOM:
                        ==> errorDisplay.appendChild(errorItem);
- Use the DocumentFragment interface or HTML templating with the cloneNode method to create templated content
                        ==>//////
- Modify the HTML or text content of at least one element in response to user interaction using innerHTML, innerText, or textContent:   
                        ==> errorItem.textContent = message;
- Modify the style and/or CSS classes of an element in response to user interactions using the style or classList properties: 
                        ==> errorDisplay.style.display = "block";
- Modify at least one attribute of an element in response to user interaction ==>/////
- Include at least one form and/or input with HTML attribute validation : 
                        ==><form id="reportForm"></form>
                        ==><input type="date" id="reportDate" name="reportDate" class="form-control" />
- Include at least one form and/or input with DOM event-based validation. (This can be the same form or input as the one above, but  
  should include event-based validation in addition to the HTML attribute validation.):
                        ==>reportForm.addEventListener("input", function (e) {....})
                        ==>reportForm.addEventListener('submit', function (event) {....})
- Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive 
  partial credit):      ==> if (!reportForm) {console.error("reportForm element not found!");}
- Commit frequently to the git repository. ==>

  
