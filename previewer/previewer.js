// console.log('hi')

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
    for(img of images)
        body.appendChild(document.createElement('img')).src = img
}

getImages()
    .then(imgCreation)
    .catch(reason=>console.log(reason))
