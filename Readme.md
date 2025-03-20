# project dicription :
- Inspection report application that uses HTML, CSS, and JavaScript to create, validate, and manage form inputs for an inspection  process. It ensures a user-friendly experience by providing dynamic validation, real-time error feedback, and a polished UI design.

# Pages and functions used :
- HTML Structure (report.html) : I organized the inspection report form using form, table, label, inputs, Bootstrap classes 
                               - Report Information: Includes fields for the report number, date, and inspector details.
                               - Project Information: Collects project-specific details like the permit number, project name, and    
                                 address.
                               - Plan Information: Gathers details such as the planner's name, building department, and revision numbers.
                               - Plan sheet type for special inspection
                               - Plan Sheet Results: A table to record observations with dropdowns for results.
                               - custom styling with some Bootstrap 
- HTML Structure (Presentation.html) : Show the result of the the inspection report form for better and clean view 
- JavaScript Functionality (report.js): dynamically validates form inputs and manages the form's behavior 
                               - Real-Time Validation with input Event
                               - Submission Validation with submit Event
                               - check inputes validities using (regex) and other conditions 
                               - Error Handling with showError and hideError functions
                               - Saves form data  localStorage 
- JavaScript Functionality (presentation.js) : Retrieve DATA from localStorage by parsing the stored JSON data and then updates various  
                                              elements in the DOM (Document Object Model) based on the retrieved content.
                               - The inspectionData is parsed using JSON.parse() to convert the JSON string into a usable object.
                               - Each section (reportResult1 to reportResult7) is populated with relevant data from the parsed object.
                               - DOMContentLoaded This event ensures the script runs only after the page's DOM has fully loaded
NB : i used sepaate page for DOMContentLoaded evenet to avoid some problems 

# Function and wants to add in the future :
 - Upload/take a picture and add it in the next pages of the report
 - detect the location automatilcy using GPS and post it in the report
 - add print and downoad option so the engineer can have a physical copy of the report 
 - Note section for all added notes


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
                        ==>i tried to modify my code to use cloneNode method but it didnt work sorry 
- Modify the HTML or text content of at least one element in response to user interaction using innerHTML, innerText, or textContent:   
                        ==> errorItem.textContent = message;
- Modify the style and/or CSS classes of an element in response to user interactions using the style or classList properties: 
                        ==> errorDisplay.style.display = "block";
- Modify at least one attribute of an element in response to user interaction:
                        ==>field.setAttribute("aria-invalid", "true") and field.setAttribute("aria-invalid", "false");
- Include at least one form and/or input with HTML attribute validation : 
                        ==>(form id="reportForm")
                        ==>(input type="date" id="reportDate" name="reportDate" class="form-control" )
- Include at least one form and/or input with DOM event-based validation. (This can be the same form or input as the one above, but  
  should include event-based validation in addition to the HTML attribute validation.):
                        ==>reportForm.addEventListener("input", function (e) {....})
                        ==>reportForm.addEventListener('submit', function (event) {....})
                        ==>document.addEventListener('DOMContentLoaded', () => {....})
- Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive 
  partial credit):      ==> if (!reportForm) {console.error("reportForm element not found!");}
- Commit frequently to the git repository:
                        ==> allready did more than 3 times
- Include a README file that contains a description of your application :
                        ==> Cheked
- Level of effort displayed in creativity, presentation, and user experience: 
                        ==> apte to the instructor to decide 


  
