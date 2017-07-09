import _ from 'lodash';
export default function parseCSSforCy(callback){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'style/residue_style.css');
    xhr.send(null);

    xhr.onreadystatechange = function(){
        const DONE = 4;
        const OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                callback(parseCSS(xhr.response));
            }
        }
    };
}


function parseCSS(response) {
    let result = [];
    let styles = response.split('}');

    styles.forEach((style)=>{
        if (style.length) {
            style = style.split(' {');
            let selector = _.trim(style[0]);
            let lines = style[1].split('\n');
            let parsedStyle = {};

            _.each(lines, (line)=>{
                if (line.length) {
                    line = line.split(': ');
                    parsedStyle[`${_.trim(line[0])}`] = `${_.trim(line[1])}`
                }
            });

            result.push({
                'selector': selector,
                style: parsedStyle
            })
        }
    });
    return result;
}

