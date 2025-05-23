let skill_main = document.querySelectorAll('.skill-main');

const skill_content = document.querySelectorAll(".skill-content");
for (let i = 0; i < skill_content.length; i++) {
    skill_main[i].addEventListener('mouseover', function() {
        skill_content[i].classList.add('active');
    });
}
for (let i = 0; i < skill_content.length; i++) {
    skill_main[i].addEventListener('mouseout', function() {
        skill_content[i].classList.remove('active');
    });
}
