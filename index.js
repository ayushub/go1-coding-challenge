const learnerAndCourses = function (dataset) {
    //assuming valid JSON so no duplicate learners
    
    let singleLearnerCourseList = new Set(), dups = [];

    //traverse through the json obj
    for (let learner in dataset){
        //check if it has courses
        if(dataset[learner].length > 0){
            let courses = dataset[learner];
            let newCourses = [];
            for(let i in courses){
                //if already added then its a repeat course
                if(singleLearnerCourseList.has(courses[i])){
                    dups.push(courses[i]);
                    singleLearnerCourseList.delete(courses[i]);
                } else if (!dups.includes(courses[i]) && 
                           !newCourses.includes(courses[i])) {
                    newCourses.push(courses[i]);
                }
            }
            if(newCourses.length > 0) newCourses.forEach(c => singleLearnerCourseList.add(c));
        }
    }
    return [...singleLearnerCourseList];
};

const quizResults = function (answers, responses) {
    let index = -1;
    var counter = answers.map(a => 0);
    //go through each response
    for (let i in responses){
        let response = responses[i];
        if (typeof(response) == 'object' && response.length == answers.length){
            let count = response.map((a, idx) => a === answers[idx]);
            console.log(count)
            counter = counter.map((c,i) => {
                if(count[i]) c++;
                return c;
            })
            console.log(counter)
        }
    }
    index = counter.indexOf(Math.max(...counter));

    return "The easiest question is index " + index;
}

const watchedCourses = function(courses) {
    let courseList = {};
    let cList = {};

    for (let i in courses){
        for(let c in courses[i]){
            //cater for last course of the session
            let c2 = courses[i][parseInt(c) + 1] || 'none';
            if (c2) {
                let combo = courses[i][c] + '<->' + c2;
                let cur = cList[combo];
                if(cur == undefined){
                    cur = 1;
                } else cur++;
                cList[combo] = cur;
            }
        }
    }
    let cList2 = {};
    for (let combo in cList){
        let csplit = combo.split('<->');
        let betterMatch = combo;
        Object.keys(cList).forEach(com => {
            if(com.startsWith(csplit[0])){
                //assuming same number of watches mean pick the first occurrence
                if((cList[com] > cList[betterMatch] || betterMatch.endsWith('none')) && !com.endsWith('none') ){
                    betterMatch = com;
                }
                else if(com !== betterMatch) delete cList[com];
            }
        });
    }
    console.log(cList);
    for( let combo in cList){
        let csplit = combo.split('<->');
        courseList[csplit[0]] = csplit[1];
    }
console.log(courseList);
    return courseList;
}

const concurrentLearners = function(sessions){
    let sesh = 0, start = 0, end = 0;
    let longestSesh = new Set();
    
    
    let concUsers = new Set();
    for(let s = 0; s < sessions.length; s++){
        start = sessions[s][1];
        end = sessions[s][2];
        concUsers.add(sessions[s][0]);
        for(let u = s + 1; u < sessions.length; u++){
            if(!concUsers.has(sessions[u][0]) && 
            ((sessions[u][1] > start && sessions[u][1] < end) || 
            ((sessions[u][1] > start && sessions[u][2] < end)) )){
                    concUsers.add(sessions[u][0]);
                }
        }
        if(concUsers.size > sesh) {
            sesh = concUsers.size;
            longestSesh = new Set(concUsers);
        }

        // console.log(concUsers)
        concUsers.clear();
    }
    console.log(longestSesh)
    return sesh;
}

module.exports = 
{
    learnerAndCourses: learnerAndCourses,
    quizResults: quizResults,
    watchedCourses: watchedCourses,
    concurrentLearners: concurrentLearners
};

