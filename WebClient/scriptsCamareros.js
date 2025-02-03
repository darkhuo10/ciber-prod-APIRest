let waiters = [
    { id: 1, name: 'usuario1', lastName: 'apellido1', phone: '123456789', email: 'usuario1@example.com', password: 'password1' },
    { id: 2, name: 'usuario2', lastName: 'apellido2', phone: '987654321', email: 'usuario2@example.com', password: 'password2' }
];

function loadWaiters() {
    const tableBody = document.querySelector("#waitersTable tbody");
    tableBody.innerHTML = '';

    waiters.forEach(waiter => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${waiter.name}</td>
            <td>${waiter.lastName}</td>
            <td>
                <button class="edit-btn" onclick="openEditModal(${waiter.id})">Editar</button>
                <button class="delete-btn" onclick="deleteWaiter(${waiter.id})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function openEditModal(id) {
    const waiter = waiters.find(waiter => waiter.id === id) || { id: null, name: '', lastName: '', phone: '', email: '', password: '' };

    document.getElementById('editName').value = waiter.name;
    document.getElementById('editLastName').value = waiter.lastName;
    document.getElementById('editPhone').value = waiter.phone;
    document.getElementById('editEmail').value = waiter.email;
    document.getElementById('editPassword').value = waiter.password;

    const passwordField = document.getElementById('editPassword');
    const button = document.getElementById('showPasswordButton');
    passwordField.type = 'password';
    button.textContent = 'Ver Contraseña';

    const modal = document.getElementById('editModal');
    modal.style.display = 'block';

    document.getElementById('editForm').onsubmit = function(event) {
        event.preventDefault();
        waiter.name = document.getElementById('editName').value;
        waiter.lastName = document.getElementById('editLastName').value;
        waiter.phone = document.getElementById('editPhone').value;
        waiter.email = document.getElementById('editEmail').value;
        waiter.password = document.getElementById('editPassword').value;

        if (waiter.id === null) {
            waiter.id = waiters.length ? waiters[waiters.length - 1].id + 1 : 1;
            waiters.push(waiter);
        }

        modal.style.display = 'none';
        loadWaiters();
    };
}

function closeModal() {
    const passwordField = document.getElementById('editPassword');
    passwordField.type = 'password';  // Ocultar la contraseña si se cierra el modal
    document.getElementById('editModal').style.display = 'none';
    document.getElementById('editForm').reset(); // Reiniciar el formulario para agregar nuevos camareros
}

function deleteWaiter(id) {
    waiters = waiters.filter(waiter => waiter.id !== id);
    loadWaiters();
}


