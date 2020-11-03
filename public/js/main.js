function addSkillsToForm() {
    var skills = [];
    var elems = $(".form-skill");
    for (let i = 0; i < elems.length; i++) {
        skills.push($(elems[i]).attr("data-value"));
    }
    $("#form-skills-input").val(JSON.stringify(skills));
    console.log(JSON.stringify(skills))
}


function addSkill(e) {
    let value = $(e).parent().find('input').val();
    if (value) {
        let skill = `<div class="col-lg-6 form-skill" data-value="${value}"><i class="fas fa-circle"></i>&nbsp;` + value + `&nbsp;<i class="far fa-times-circle" onclick="deleteLanguage(this)"></i></div>`;
        $(e).parent().before(skill);
    }
    addSkillsToForm()
}

function deleteLanguage(e) {
    $(e).parent().remove();
    addSkillsToForm()

}