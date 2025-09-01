/////////////////////////


// Get dropdown and table body
const planSelect = document.querySelector('select[name="plan"]');
const tableBody = document.querySelector('#Row4 tbody');

// Map Inspection Subject to corresponding observations
const observationsMap = {
  "Structural Steel – Welding BC 1704.3.1": [
    "MATERIAL IDENTIFICATION: VERIFY TYPE & GRADE",
    "PROPER FASTENERS FOR JOINTS, COMPONENT & ASSEMBLIES",
    "PROPER FASTENING PROCEDURES",
    "ADEQUATE PLANS AVAILABLE",
    "CONNECTING ELEMENTS",
    "PRE-INSTALLATION VERIFICATION TESTING",
    "PROPER STORAGE",
    "SNUG-TIGHT PRIOR TO FASTENING",
    "STEEL RUNNERS (TRACKS), BLOCKING, LINTELS, CLIP ANGLES, SHOES, REINFORCEMENTS, FASTENERS, AND ACCESSORIES",
    "CONTINUOUS TRACKS SIZED TO MATCH STUDS",
    "ANCHOR ENDS OR STIFFENERS TO SUPPORTING STRUCTURE",
    "STUDS SECURED TO TOP AND BOTTOM RUNNER TRACKS BY EITHER WELDING OR SCREW FASTENERS AT BOTH INSIDE AND OUTSIDE FLANGES",
    "A STUD SHALL BE LOCATED UNDERNEATH EACH TRUSS BEARING POINT",
    "STRUCTURAL STEEL SHOP DRAWINGS",
    "STUDS ARE BRACED WITH TWO ROWS OF BRIDGING, SPACED BETWEEN FLOORS (4'-0\" MAX. SPACING)",
    "JOIST BRIDGING INSTALLED / 12 GAGE SOLID BRIDGING."
  ],
  "Structural Steel – Details BC 1704.3.2": [
    "DETAILS OBSERVATION 1",
    "DETAILS OBSERVATION 2",
    "DETAILS OBSERVATION 3"
  ],
  "Structural Steel – High Strength Bolting BC 1704.3.3": [
    "BOLTING OBSERVATION 1",
    "BOLTING OBSERVATION 2"
  ],
  "Structural Cold - Formed Steel BC 1704.3.4": [
    "COLD FORMED OBSERVATION 1",
    "COLD FORMED OBSERVATION 2"
  ],
   "Structural Cold-Formed Steel BC 1704.3.6": [
    "COLD FORMED OBSERVATION 4",
    "COLD FORMED OBSERVATION 7"
  ]

};

// Update table dynamically on dropdown change
planSelect.addEventListener('change', function () {
  const selectedSubject = planSelect.value;

  // Clear previous rows
  tableBody.innerHTML = '';

  if (!selectedSubject || !observationsMap[selectedSubject]) return;

  // Create rows dynamically
  observationsMap[selectedSubject].forEach((obs, index) => {
    const row = document.createElement('tr');

    // Observation cell
    const obsCell = document.createElement('td');
    obsCell.textContent = obs;
    row.appendChild(obsCell);

    // Result cell with select
    const resultCell = document.createElement('td');
    const select = document.createElement('select');
    select.name = `result${index + 1}`;
    select.classList.add('planResult');

    ["", "N/A", "PASS", "Fail"].forEach(opt => {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });

    resultCell.appendChild(select);
    row.appendChild(resultCell);

    tableBody.appendChild(row);
  });
});



//////////////////////////////

// Capture Form Data 
const reportForm = document.getElementById("reportForm");
console.log(reportForm);

//make sure the programe is working 
if (!reportForm) {
    console.error("reportForm element not found!");
}


//show error if found
function showError(message) {
    errorDisplay.style.display = "block";
    const errorItem = document.createElement("p");
    errorItem.textContent = message;
    errorDisplay.appendChild(errorItem);

}


//hide error if not found
function hideError() {
    // Clear all error messages
    errorDisplay.innerHTML = "";
    errorDisplay.style.display = "none";
}

// Get Lable name for each inpute 
function getLabelName(fieldName) {

       const label = document.querySelector(`label[for="${fieldName}"]`);

    return label ? label.textContent.trim() : fieldName;
}


// first i have to get an immidiate feedback befot submit 
reportForm.addEventListener("input", function (e) {
    const field = e.target;
    hideError(); // Clear previous error message
    //* validate Report Information :
    // Validate Report Number
    if (field.name === "reportNum") {
        if (field.value.trim().length < 6) {
            showError("Report Number must be at least 6 characters long.");
            return;
        }
        if (!/^[A-Z]{2}-[A-Z]{3}-\d{3}$/.test(field.value)) {
            showError("Report Number can only contain uppercase letters, numbers, and dashes.");
            return;
        }
    }

    // Validate Inspection Date
    if (field.name === "reportDate") {
        const dateValue = new Date(field.value);
        const today = new Date();
        if (isNaN(dateValue.getTime()) || dateValue > today) {
            showError("Invalid Date ");
            return;
        }
    }

    // Name Validation for: director , inspector, Contractor, Departement responsible , planer
    if (field.name === "inspectorName" || field.name === "inspectorLastName" 
        || field.name === "directorName" || field.name === "directorLastName"
        || field.name === "contractorName" || field.name === "Bdepartement" || field.name === "planerName") {
        if (!/^[A-Za-z\s]+$/.test(field.value)) {
            showError(field, `${field.name} must contain only letters and spaces.`);
            return;
        }
    }

    // i made a change on my code to reflect to the requirement 
    //Modify at least one attribute of an element in response to user interaction.
    if (field.name === "inspectorID") {
        if (!/^[A-Z0-9]+$/.test(field.value)) {
            field.setAttribute("aria-invalid", "true"); // Modifies the 'aria-invalid' attribute to indicate invalid input
            showError("Inspector ID should contain only uppercase letters and numbers.");
            return;
        } else {
            field.setAttribute("aria-invalid", "false"); // Ensures the attribute reflect valid input
        }
    }
    // if (field.name === "inspectorID") {
    //     if (!/^[A-Z0-9]+$/.test(field.value)) {
    //         showError("Inspector ID should contain only uppercase letters and numbers.");
    //         return;
    //     }
    // }

   

    //* validate Project Information :
    // Validate Permit Number
    if (field.name === "permitNum") {
        if (!/^\d{9}-\d{2}-[A-Z]{2}\/[A-Z0-9]+-[A-Z]\d$/.test(field.value)) {
            showError("Permit Number must follow the format '123456789-01-NB/A12345678-I1'.", field);
            return;
        }
    }
    

    // * Validate Plan Information :
        //  Validate Revision number 
    if (field.name === "revisionNumber") {
        if (isNaN(field.value) || field.value <= 0) {
            showError("Revision Number must be a positive number.");
            return;
        }
    }
 
    
    if (field.name === "planDate") {
        const dateValue = new Date(field.value);
        const today = new Date();
        if (isNaN(dateValue.getTime()) || dateValue > today) {
            showError("Invalid Date");
            return;
        }
    }
});


//////////////////////////

// Notes Section
const notesContainer = document.getElementById("notesContainer");
const addNoteBtn = document.getElementById("addNoteBtn");

let noteIndex = 0;
addNoteBtn.addEventListener("click", () => {
    noteIndex++;
    const noteBlock = document.createElement("div");
    noteBlock.classList.add("mb-3", "border", "p-2", "rounded");
    noteBlock.innerHTML = `
        <label>Note ${noteIndex}</label>
        <textarea name="note${noteIndex}" class="form-control mb-2" rows="2" placeholder="Write your note..."></textarea>
        <input type="file" name="noteImage${noteIndex}" class="form-control" accept="image/*" />
    `;
    notesContainer.appendChild(noteBlock);
});

///////////////////////////

reportForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const requiredFields = [
        "reportNum", "reportDate", "inspectorName", "inspectorLastName",
        "inspectorID", "directorName", "directorLastName", "projectName",
        "permitNum", "address", "contractorName", "planerName", "revisionNumber",
        "Bdepartement", "planDate", "plan"
    ];

    for (let fieldName of requiredFields) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (!field || field.value.trim() === "") {
            alert(`Please fill in the ${getLabelName(fieldName)}.`);
            return;
        }
    }

    // Validate Plan Sheet dropdowns
    const Results = document.querySelectorAll('.planResult');
    for (let result of Results) {
        if (!result.value || result.value === "Select" || result.value.trim() === "") {
            alert("Please select a valid option for all Plan Sheet observations.");
            return;
        }
    }

    // Save form data in an object
    const formData = {
        reportNum: document.querySelector('[name="reportNum"]').value,
        reportDate: document.querySelector('[name="reportDate"]').value,
        inspectorName: document.querySelector('[name="inspectorName"]').value,
        inspectorLastName: document.querySelector('[name="inspectorLastName"]').value,
        inspectorID: document.querySelector('[name="inspectorID"]').value,
        directorName: document.querySelector('[name="directorName"]').value,
        directorLastName: document.querySelector('[name="directorLastName"]').value,
        projectName: document.querySelector('[name="projectName"]').value,
        permitNum: document.querySelector('[name="permitNum"]').value,
        address: document.querySelector('[name="address"]').value,
        contractorName: document.querySelector('[name="contractorName"]').value,
        planerName: document.querySelector('[name="planerName"]').value,
        revisionNumber: document.querySelector('[name="revisionNumber"]').value,
        Bdepartement: document.querySelector('[name="Bdepartement"]').value,
        planDate: document.querySelector('[name="planDate"]').value,
        plan : document.querySelector('[name="plan"]').value,
    };

    // Capture Plan Sheet Results
    const planSheetResults = [];
    const planResults = document.querySelectorAll('.planResult');
    planResults.forEach((result) => {
        planSheetResults.push({
            observation: result.parentElement.previousElementSibling.textContent.trim(),
            result: result.value
        });
    });

    formData.planSheetResults = planSheetResults;

    /////////////////
   // Collect notes & pictures
const notes = [];
const noteBlocks = document.querySelectorAll("#notesContainer > div");

function processNotes(index = 0) {
    if (index >= noteBlocks.length) {
        formData.notes = notes;

        // Save data and redirect
        localStorage.setItem('inspectionReport', JSON.stringify(formData));
        window.location.href = 'presentation.html';
        return;
    }

    const block = noteBlocks[index];
    const text = block.querySelector("textarea").value.trim();
    const fileInput = block.querySelector("input[type='file']");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            notes.push({ text, image: e.target.result }); // Base64 image
            processNotes(index + 1);
        };
        reader.readAsDataURL(file);
    } else {
        notes.push({ text, image: "" });
        processNotes(index + 1);
    }
}

processNotes();
    /////////////

    // Store the data in localStorage
    localStorage.setItem('inspectionReport', JSON.stringify(formData));

    // Redirect to the final report display page
    window.location.href = 'presentation.html'; // Change the URL to the final report page
});
