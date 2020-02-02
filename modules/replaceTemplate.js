module.exports  = (template, course) => {
    let output = template.replace(/{%COURSENAME%}/g, course.name);
    output = output.replace(/{%FROM%}/g, course.where);
    output = output.replace(/{%DURATION%}/g, course.duration);
    output = output.replace(/{%TEACHER%}/g, course.teacher);
    output = output.replace(/{%PRICE%}/g, course.price);
    output = output.replace(/{%DESCRIPTION%}/g, course.description);
    output = output.replace(/{%ID%}/g, course.id);

    if (!course.completed) {
       output =  output.replace(/{%NOT_FINISHED%}/g, 'not-finished');
    }



    return output;
}
