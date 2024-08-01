var modal = document.getElementById('myModal');
var btn = document.getElementById("sized");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
};

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//Manejo del registro
registerForm.onsubmit = function(event) {
    event.preventDefault();

// Obtine valores del formulario
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

// Hace una validacion para verificar si el usario ya existe 
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
        alert('El usuario ya existe.');
        return;
    }

// Guarda el nuevo usuario
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registro exitoso.');

    registerForm.reset();
    
};

// Manejo del login
loginForm.onsubmit = function(event) {
    event.preventDefault(); 

// Obtiene los valores del usuario
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

// Verificar la existencia de usuario
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert('Inicio de sesión exitoso.');
        // Redirigir a la página de administracion
        window.location.href = 'admin.html'; 
    } else {
        alert('Email o contraseña incorrectos.');
    }

    loginForm.reset();
};

