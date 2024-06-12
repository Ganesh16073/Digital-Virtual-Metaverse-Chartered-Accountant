document.getElementById('itrForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    fetch('/recommend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.url)
    .then(url => {
        const params = new URLSearchParams(url.split('?')[1]);
        const recommendedForm = params.get('form');
        localStorage.setItem('recommendedForm', recommendedForm);
        window.location.href = '/recommendation.html';
    });
});
