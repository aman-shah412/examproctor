export default function swDev() {
    navigator.serviceWorker
        .register('/service.js')
        .then((registration) => {
        })
        .catch((error) => {
            alert("Please some other browser, this browser is not compatible")
            console.error('Service Worker registration failed:', error);
        });
}