import pushkin from './default/pushkin.index.mjs'

export default function ( url = false ) {
  return new Promise(async (resolve, reject) => {
      try {
          if(url) {
              let script = document.createElement('script')
              script.type ='module'
              script.src = `${url}`
              this.DOM.script().appendChild(script)
              script.onload = () => {
                  resolve({
                      success: true,
                      status: "true",
                      message: ''
                  })
              }
              script.onerror = function(e) {
                  alert("Error loading " + this.src);
                  reject(e)
              };
          } else {
              eval(pushkin)
              resolve({
                  success: true,
                  status: "true",
                  message: ''
              })
          }
      } catch (e) {
          console.error(e)
          resolve({
              success: false,
              status: "not ok",
              message: e
          })
      }
  })
}
