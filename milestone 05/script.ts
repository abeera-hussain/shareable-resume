const form = document.getElementById('resume-form')as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display')as HTMLDivElement;
const shareablelinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement; 
const shareablelinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('dowmload-pdf') as HTMLButtonElement

form.addEventListener('submit' , (event: Event)=> {
    event.preventDefault(); 

    const username =(document.getElementById('username') as HTMLInputElement).value 
    const name = (document.getElementById('name') as HTMLInputElement).value
    const email = (document.getElementById('email') as HTMLInputElement).value
    const phone = (document.getElementById('phone') as HTMLInputElement).value
    const education = (document.getElementById('education') as HTMLTextAreaElement).value
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value


    const resumeData ={
        name,
        email,
        phone,
        education,
        experience,
        skills
    };

    localStorage.setItem(username, JSON.stringify(resumeData));

    
    const resumeHTML = `
    <h2><b>Editable Resume</b></h2>
    <h3>Personal Information</h3>
    <p><b>Name:</b><span contentededitable="true">
    ${name}</span><p>
    <p><b>Email:</b> <span contentededitable="true">${email}</span><p>
    <p><b>Phone:</b><span contentededitable="true">${phone} </span><p>
    
<h3>Education</h3>
<p contenteditable="true">${education}</p>

<h3>Experience</h3>
<p contenteditable="true">${experience}</p>

<h3>Skills</h3>
<p contenteditable="true">${skills}</p>
    `;

// Display the generated resume
resumeDisplayElement.innerHTML = resumeHTML;
// Generate a shareable URL with the username only
const shareableURL =
`${window.location.origin}?username=${encodeURIComponent(username)}`;
shareablelinkContainer.style.display = 'block';
shareablelinkElement.href = shareableURL;
shareablelinkElement.textContent = shareableURL;
});

downloadPdfButton.addEventListener('click', () => {
window.print();

});

window.addEventListener('DOMContentLoaded', () => {
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
if (username) {


const savedResumeData = localStorage.getItem(username);
if (savedResumeData) {
const resumeData = JSON.parse(savedResumeData);
(document.getElementById('username') as HTMLInputElement).value =
username;
(document.getElementById('name') as HTMLInputElement).value =
resumeData.name;
(document.getElementById('email') as HTMLInputElement).value =
resumeData.email;
(document.getElementById('phone') as HTMLInputElement).value =
resumeData.phone;
(document.getElementById('education') as HTMLTextAreaElement).value =
resumeData.education;
(document.getElementById('experience') as HTMLTextAreaElement).value
= resumeData.experience;
(document.getElementById('skills') as HTMLTextAreaElement).value =
resumeData.skills; }
}
});

