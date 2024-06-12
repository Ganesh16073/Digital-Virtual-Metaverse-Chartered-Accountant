document.addEventListener('DOMContentLoaded', function () {
    const resultMessage = localStorage.getItem('resultMessage');
    document.getElementById('resultMessage').textContent = resultMessage;
});
