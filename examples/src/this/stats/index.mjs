export default function (){
    let timerId = null
    let perf = {}
    perf.exception = {}

    function logEntry(entry) {
        const objDict = {
            "type": entry.entryType,
            "name": entry.name,
            "start": entry.startTime,
            "duration": entry.duration,
        };

        if (entry.entryType === 'navigation') {
            perf.performance = [{
                name: entry.name,
                pathname: (new URL(entry.name)).pathname,
                start: objDict.start,
                current: objDict.start,
                duration: entry.duration,
                delta: entry.duration,
                end: 0,
                isSending: false
            }, {}]
        }

        if (entry.entryType === 'resource') {
            if (window.location.pathname === perf.performance[0].pathname && !perf.performance[0].isSending) {
                perf.performance[0].delta = objDict.start - perf.performance[0].current
                perf.performance[0].current = objDict.start
                perf.performance[0].duration = perf.performance[0].duration + perf.performance[0].delta
                perf.performance[0].end = objDict.duration

                if (!perf.performance[1].name) {
                    perf.performance[1].name = objDict.name
                    perf.performance[1].duration = objDict.duration
                }

                clearTimeout(timerId)

                timerId = setTimeout(() => {
                    clearTimeout(timerId)
                    perf.performance[0].duration = perf.performance[0].duration + perf.performance[0].end
                    console.log('Performance: ', perf.performance[0])
                    for (let item of perf.performance) {

                        // post('/api/v1/metric', {
                        //     "uiResponse" : {
                        //         "deltaTime": item.duration,
                        //         "path": (new URL(item.name)).pathname
                        //     }
                        // })
                    }

                    perf.performance[0].isSending = true
                }, 5000);
            }
        }
    }

    // // Call to log all previous and future User Timing entries.
    function logUserTiming() {
        if (!PerformanceObserver.supportedEntryTypes.includes("element")) {
            console.log("element are not observable");
        } else {
            perf.observer.observe({type: "element", buffered: true});
        }

        if (!PerformanceObserver.supportedEntryTypes.includes("event")) {
            console.log("event are not observable");
        } else {
            perf.observer.observe({type: "event", buffered: true});
        }

        if (!PerformanceObserver.supportedEntryTypes.includes("first-input")) {
            console.log("first-input are not observable");
        } else {
            perf.observer.observe({type: "first-input", buffered: true});
        }

        if (!PerformanceObserver.supportedEntryTypes.includes("navigation")) {
            console.log("navigation are not observable");
        } else {
            perf.observer.observe({type: "navigation", buffered: true});
        }
        //
        if (!PerformanceObserver.supportedEntryTypes.includes("resource")) {
            console.log("resource are not observable");
        } else {
            perf.observer.observe({type: "resource", buffered: true});
        }

        if (!PerformanceObserver.supportedEntryTypes.includes("visibility-state")) {
            console.log("visibility-state are not observable");
        } else {
            perf.observer.observe({type: "visibility-state", buffered: true});
        }

        if (!PerformanceObserver.supportedEntryTypes.includes("layout-shift")) {
            console.log("layout-shift are not observable");
        } else {
            perf.observer.observe({type: "layout-shift", buffered: true});
        }

        if (!PerformanceObserver.supportedEntryTypes.includes("longtask")) {
            console.log("longtask are not observable");
        } else {
            perf.observer.observe({type: "longtask", buffered: true});
        }

        if (!PerformanceObserver.supportedEntryTypes.includes("largest-contentful-paint")) {
            console.log("largest-contentful-paint are not observable");
        } else {
            perf.observer.observe({type: "largest-contentful-paint", buffered: true});
        }

        if (!PerformanceObserver.supportedEntryTypes.includes("mark")) {
            console.log("Marks are not observable");
        } else {
            perf.observer.observe({type: "mark", buffered: true});
        }
        if (!PerformanceObserver.supportedEntryTypes.includes("measure")) {
            console.log("Measures are not observable");
        } else {
            perf.observer.observe({type: "measure", buffered: true});
        }
    }

    // Call to stop logging entries.
    function stopLoggingUserTiming() {
        perf.observer.disconnect();
    }

    // Call to force logging queued entries immediately.
    function flushLog() {
        perf.observer.takeRecords().forEach(entry => {
            logEntry(entry);
        });
    }

    perf.observer = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
            logEntry(entry);
        });
    });

    logUserTiming()

}