// -----------------SUPPORT FUNCTIONS-----------------

function findCSS(name)
{
    const sheetsArray = Array.from(document.styleSheets)
    let filter = RegExp('\/[^/]+\.css')

    return sheetsArray.find(sheet=>
        (sheet.href!=null ? sheet.href.match(filter)[0].slice(1) : null) == name
    )
}

function findRule(CSS, name)
{
    const rulesArray = Array.from(CSS.cssRules)
    
    return rulesArray.find(rule=>
        rule.selectorText == name
    )
}

// ---------------------------------------------------

// -------------------IMAGE CAPTURE-------------------

async function getImages()
{
    const response = await fetch('images.json')
    const imagesNames = await response.json()

    if(!Array.isArray(imagesNames))
        return Promise.reject("JSON isn't an array")
    
    for(let i=0;i<imagesNames.length;i++)
        imagesNames[i] = 'images/'+imagesNames[i]

    return imagesNames
}

function imgCreation(images)
{
    const body = document.body
    for(link of images)
    {
        let figure = body.appendChild(document.createElement('figure'))
        let img = figure.appendChild(document.createElement('img'))

        img.src = link
        img.alt="There's something wrong with this JSON string."

        let filter = RegExp('\/[^/.]+\.')
        let name = link.match(filter)[0].slice(1,-1)
        
        figure.appendChild(document.createElement('figcaption')).innerText = name
    }
}

getImages()
    .then(imgCreation)
    .catch(reason=>console.log(reason))

// ---------------------------------------------------

// -------------------DIAGONAL ANGLE-------------------

const DiagonalAngle = Math.atan2(innerHeight,innerWidth)
const previewerCSS = findCSS('previewer.css')

let rule = findRule(previewerCSS, 'body')
rule.style.setProperty('--angle',DiagonalAngle+'rad')

// ----------------------------------------------------

// ------------------DIAGONAL LENGTH------------------

const DiagonalLength = Math.hypot(innerHeight,innerWidth)
rule.style.setProperty('--diagonal',DiagonalLength+'px')

// ---------------------------------------------------
