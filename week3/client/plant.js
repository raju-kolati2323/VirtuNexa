const SERVER_LINK = 'https://plant-care-pbf7.onrender.com';
const SCHEDULE_API = `${SERVER_LINK}/api/schedule`;

function getAuthToken() {
    return localStorage.getItem('authToken');
}

document.addEventListener('DOMContentLoaded', () => {
    loadSchedules();

    document.getElementById('plantForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const plantName = document.getElementById('plantName').value.trim();
        const watering = parseInt(document.getElementById('wateringInterval').value);
        const pruning = parseInt(document.getElementById('pruningInterval').value);
        const fertilizing = parseInt(document.getElementById('fertilizingInterval').value);

        if (!plantName || watering <= 0 || pruning <= 0 || fertilizing <= 0) {
            alert('Please fill in all fields with valid values.');
            return;
        }

        try {
            const response = await fetch(SCHEDULE_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: JSON.stringify({ plantName, watering, pruning, fertilizing }),
            });
        
            const result = await response.json();
        
            if (!response.ok) {
                throw new Error(result.message || 'Failed to save schedule.');
            }
        
            alert(result.message || 'Schedule saved successfully!');
            await loadSchedules();
            document.getElementById('plantForm').reset();
        } catch (error) {
            console.error(error);
            alert(error.message || 'Error saving schedule.');
        }
        
    });
});

// Fetch all schedules
async function loadSchedules() {
    try {
        const response = await fetch(SCHEDULE_API, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        const result = await response.json();

        if (response.ok && result.schedule) {
            displaySchedules(result.schedule, result.message);
        } else {
            throw new Error(result.message || 'Failed to load schedules.');
        }
    } catch (error) {
        console.error('Failed to load schedules:', error);
        displaySchedules([], error.message || 'Could not load plant schedules.');
    }
}

function displaySchedules(schedules, message = '') {
    const resultContainer = document.getElementById('result');
    if (!resultContainer) return;

    const list = document.getElementById('remindersList');
    if (!schedules.length) {
        resultContainer.style.display = 'block';
        resultContainer.innerHTML = `
            <h3>Plant Care Reminders</h3>
            <div class="alert alert-info mt-3">${message}</div>
        `;
        return;
    }

    resultContainer.innerHTML = `
        <h3>Plant Care Reminders</h3>
        <ul id="remindersList" class="list-group"></ul>
    `;

    const updatedList = document.getElementById('remindersList');
    if (!updatedList) return;

    schedules.forEach(schedule => {
        const today = new Date();

        const wateringDate = schedule.watering > 0
            ? new Date(today.getTime() + schedule.watering * 24 * 60 * 60 * 1000).toDateString()
            : '';

        const pruningDate = schedule.pruning > 0
            ? new Date(today.getTime() + schedule.pruning * 24 * 60 * 60 * 1000).toDateString()
            : '';

        const fertilizingDate = schedule.fertilizing > 0
            ? new Date(today.getTime() + schedule.fertilizing * 24 * 60 * 60 * 1000).toDateString()
            : '';

        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row gap-3';

        item.innerHTML = `
            <div class="schedule-info">
                <h5 class="mb-2">${schedule.plantName}</h5>
                ${wateringDate ? `
                    <div class="task-row">
                        <span>💧 Watering:</span> 
                        <span class="badge">${wateringDate}</span>
                    </div>` : ''}
                ${pruningDate ? `
                    <div class="task-row">
                        <span>✂️ Pruning:</span> 
                        <span class="badge">${pruningDate}</span>
                    </div>` : ''}
                ${fertilizingDate ? `
                    <div class="task-row">
                        <span>🌱 Fertilizing:</span> 
                        <span class="badge">${fertilizingDate}</span>
                    </div>` : ''}
            </div>
            <button class="btn btn-danger btn-sm mt-3 mt-md-0 align-self-start" onclick="deleteSchedule('${schedule._id || schedule.id}')">Delete</button>
        `;

        updatedList.appendChild(item);
    });

    resultContainer.style.display = 'block';
}


// Delete a schedule
async function deleteSchedule(id) {
    if (!confirm('Are you sure you want to delete this schedule?')) return;

    try {
        const response = await fetch(`${SCHEDULE_API}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
    
        const result = await response.json();
    
        if (!response.ok) throw new Error(result.message || 'Failed to delete schedule.');
    
        alert(result.message || 'Schedule deleted successfully!');
        await loadSchedules();
    } catch (error) {
        console.error('Error deleting schedule:', error);
        alert(error.message || 'Failed to delete schedule.');
    }
    
}
