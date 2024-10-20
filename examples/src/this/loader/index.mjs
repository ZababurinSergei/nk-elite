export const loader = (url, data = undefined) => {
    return new Promise(function (resolve, reject) {
        let verifyScript = true
        let Script = {}

        for(let item of document.head.querySelectorAll('script')){
            if(item.src.indexOf(`${url}`) > 0){
                verifyScript = false
                Script = item
            }
        }

        if(verifyScript){
            let load = document.createElement('script');
            load.src = url
            if(data) {
                for(let key in data) {
                    load.dataset[key] = data[key]
                }
            }
            console.log('-----------------', load)
            document.head.appendChild(load)
            load.onload = (out) =>{
                // document.dispatchEvent( new CustomEvent(`${name}-loading`))
                resolve(true)
            }
        } else {
            resolve(true)
        }
    })
}

export default  {
    description: 'loader'
}