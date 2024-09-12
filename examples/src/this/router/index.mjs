export default function (){

    navigation.addEventListener("navigate", (event) => {
        const shouldNotIntercept = (event) => {

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
