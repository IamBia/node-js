const http = require('http');
const url = require('url');
const fs = require('fs');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');


const templateOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const templateCourse = fs.readFileSync(`${__dirname}/templates/course.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const courseData = JSON.parse(data);

const slugs = courseData.map(el => slugify(el.name, { lower: true } ))
// console.log(slugs)

const server = http.createServer((req, res) => {

    const {query, pathname} = url.parse(req.url, true);

    if (pathname === '/overview' || pathname === '/') {

        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHtml = courseData.map(el => replaceTemplate(templateCard, el)).join('');
        const output = templateOverview.replace('{%COURSE_CARDS%}', cardsHtml);
        // console.log(cardsHtml);

        res.end(output);
    } else if (pathname === '/course') {

        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const course = courseData[query.id];
   
        output = replaceTemplate(templateCourse, course);
        res.end(output);
      
    } else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>Page not found</h1>')
    }

    // console.log(res);
});

server.listen(8000, '127.0.0.1')