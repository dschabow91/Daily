const reportForm = document.getElementById('reportForm');
reportForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(reportForm).entries());
    await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    alert('Report submitted!');
    reportForm.reset();
});

const pmForm = document.getElementById('pmForm');
pmForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(pmForm).entries());
    await fetch('/api/pm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    alert('PM Task added!');
    pmForm.reset();
});
