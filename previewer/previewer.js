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
    if(CSS)
    {
        const rulesArray = Array.from(CSS.cssRules)
        
        return rulesArray.find(rule=>
            rule.selectorText == name
        )
    }
    else return undefined
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

let unloaded = 0

async function imgCreation(images)
{
    unloaded = images.length
    const body = document.body
    
    return new Promise
    (
        function(fulfill)
        {
            for(link of images)
            {
                let figure = body.appendChild(document.createElement('figure'))
                let img = figure.appendChild(document.createElement('img'))

                img.src = link
                img.alt="There's something wrong with this JSON string."
                img.addEventListener
                ('load',
                    function()
                    {
                        unloaded--
                        if(!unloaded)
                            fulfill(document.documentElement.getBoundingClientRect().height)
                    }
                )

                let filter = RegExp('\/[^/.]+\.')
                let name = link.match(filter)[0].slice(1,-1)
                
                figure.appendChild(document.createElement('figcaption')).innerText = name
            }
        }
    )
}

// ---------------------------------------------------

// -----------------DIAGONAL CHANGING-----------------

function changeDiagonal(htmlHeight)
{
    const previewerCSS = findCSS('previewer.css')
    let rule = findRule(previewerCSS, 'div')
    
    if(rule)
        window.addEventListener
        ('resize',
            function()
            {
                let width = innerWidth
                let height = Math.max(innerHeight, htmlHeight)
            
                const angle = Math.atan2(height,width)
                const length = Math.hypot(width,height)
                
                rule.style.setProperty('--angle',angle+'rad')
                rule.style.setProperty('--diagonal',length+'px')
            }
        )
}

// ---------------------------------------------------

getImages()
    .then(imgCreation)
    .then(changeDiagonal)
    .catch(reason=>console.log(reason))
