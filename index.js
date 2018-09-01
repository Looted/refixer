const program = require('commander');
const fs = require('fs');
program
  .version('1.0.0')
  .parse(process.argv);

fs.readFile(program.args[0], 'utf8', (err, data) => {
    const html = data;
    const bodyRegex = /<a href="#footnote-(\d\d?)" id="footnote-ref-(\d\d?)">\[(\d\d?)\]<\/a>/gi;
    let fixedHtml = html.replace(bodyRegex, function(match, a, b, c) {
        return `<a href="#footnote-${a-2}" id="footnote-ref-${b-2}">[${c-1}]</a>`
    });

    const referencesRegex = /<li id="footnote-(\d\d?)">/gi;
    fixedHtml = fixedHtml.replace(referencesRegex, function(match, a) {
        return `<li id="footnote-${a-2}">`
    });

    const arrowRegex = /<a href="#footnote-ref-(\d\d?)">↑<\/a>/gi;
    fixedHtml = fixedHtml.replace(arrowRegex, function(match, a) {
        return `<a href="#footnote-ref-${a-2}">↑</a>`
    });

    fs.writeFile('refixed_'+program.args[0], fixedHtml, (err) => {

    }); 
});
