// console.log('hi')

async function getImages()
{
    const response = await fetch('images.json')
    const imagesNames = await response.json()
    console.log(imagesNames)
}

getImages()//.catch(()=>console.log('goes wrong'))