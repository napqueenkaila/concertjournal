function convertTimestamp(timestamp) {
    const date = new Date(timestamp * 1000)
    const dateFormat = date.toDateString()
    return dateFormat
}

function joinSupportingActs(arr) {
    const acts = Array.isArray(arr) ? arr.join(", ") : "-"
    return acts
}

function getSlideImgs(imgUrls, mainImg) {
    const obj = {original: mainImg}
    
    const slideImgs = imgUrls.map(item => {
        return ({ original: item, originalWidth: 1000, originalHeight: 600 })
    })
    slideImgs.unshift(obj)
    return slideImgs
}


export {joinSupportingActs, convertTimestamp, getSlideImgs}