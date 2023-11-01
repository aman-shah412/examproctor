self.addEventListener('message', async (event) => {
    if (event.data.action === 'storeWebcamData' && event.data.data) {
        const id = event.data.data.id
        const webcamBlob = event.data.data.webcamBlob;
        const recordingnumber = event.data.data.recordingnumber
        const timer = event.data.data.timer
        const refreshed = event.data.data.refreshed

        const formData = new FormData()
        formData.append("chunk", webcamBlob)
        formData.append("recordnumber", recordingnumber)
        formData.append("id", id)
        formData.append("refreshed", refreshed)
        formData.append("timer", timer)

        const res = await fetch('http://localhost:8004/webcamvideo', {
            method: 'POST',
            body: formData,
        })
    }

    if (event.data.action === 'storeScreenData' && event.data.data) {
        const id = event.data.data.id
        const screenBlob = event.data.data.screenBlob;
        const recordingnumber = event.data.data.recordingnumber
        const timer = event.data.data.timer
        const refreshed = event.data.data.refreshed

        const formData = new FormData()
        formData.append("chunk", screenBlob)
        formData.append("recordnumber", recordingnumber)
        formData.append("id", id)
        formData.append("refreshed", refreshed)
        formData.append("timer", timer)

        const res = await fetch('http://localhost:8004/screenvideo', {
            method: 'POST',
            body: formData,
        })
    }
});

