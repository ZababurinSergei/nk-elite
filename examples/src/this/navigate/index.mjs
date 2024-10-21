import {logger} from '@libp2p/logger'
const log = logger('navigate')

/**
 * Render the array of html files, to the
 * selected container.
 * @param props
 */
function render(props = {
    root: window.document.body,
    pages: ['name'],
    container: undefined,
    pathname: new URL("../", import.meta.url)
}) {
    const template = document.createElement("template");
    pages.forEach(async element => {
        let itemHtml = await fetch(`${pathname}${element}.html`)
        itemHtml = await itemHtml.text()
        template.innerHTML = itemHtml;
    });

    if(props.container) {
        root.querySelector(`${container}`).append(template.content);
    } else {
        console.log('!!! RENDER !!!', {
            props: props,
            template: template.content
        })
    }
}

export const navigate = function () {
    navigation.addEventListener("navigate", (event) => {
        const shouldNotIntercept = (event) => {

            console.log('!!!!!!!!!!!!!!!! navigate !!!!!!!!!!!!!!!!!!!!')
            return false
        }
        // Exit early if this navigation shouldn't be intercepted,
        // e.g. if the navigation is cross-origin, or a download request
        if (shouldNotIntercept(event)) {
            return;
        }

        const url = new URL(event.destination.url);

        const renderPlaceholder = async () => {
            debugger
            return true
        }

        const getContent = async (pathname) => {
            debugger
            return ``
        }

        const renderPage = async () => {
            debugger
        }

        if (url.pathname.startsWith("/articles/")) {
            event.intercept({
                async handler() {
                    // The URL has already changed, so show a placeholder while
                    // fetching the new content, such as a spinner or loading page
                    await renderPlaceholder();

                    // Fetch the new content and display when ready
                    const content = await getContent(url.pathname);
                    await renderPage(content);
                },
            });
        }
    });
}

export {render};


