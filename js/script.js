const usuarios = [{
    nombre: 'Braian',
    mail: 'braianfernandez@gmail.com',
    pass: 'brfr134'
    },
    {
    nombre: 'Cintia',
    mail: 'cintiarodriguez@gmail.com',
    pass: '160596'
    },
    {
    nombre: 'Mirta',
    mail: 'mirtabeatriz@gmail.com',
    pass: 'mirtabz123'
    }]
    
    
    const productos = [{
    nombre: 'Boina Negra',
    precio: '$1200'
    },
    {
    nombre: 'Boina Cuadrille',
    precio: '$1000'
    }]
    
    
    
    
    const inputMailLogin = document.getElementById('emailIngresado'),
        inputPassLogin = document.getElementById('passIngresada'),
        checkRemember = document.getElementById('recordar'),
        btnLogin = document.getElementById('login'),
        modalEl = document.getElementById('myModal'),
        
        contTarjetas = document.getElementById('tarjetas'),
        elementosToggleables = document.querySelectorAll('.toggeable');
    
        function validarUsuario(userDB, mail, pass){
            let encontrado = userDB.find(userDB => userDB.mail == mail)
    if (typeof encontrado === 'undefined'){
        return false;
    } else{
        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
        }
    
        function guardarDatos(usuarioDB, storage) {
            const usuario = {
                'name': usuarioDB.nombre,
                'user': usuarioDB.mail,
                'pass': usuarioDB.pass
            }
    
            storage.setItem('usuario', JSON.stringify(usuario));
        }
    
        function borrarDatos() {
            localStorage.clear();
            sessionStorage.clear();
        }
    
        function recuperarUsuario(storage) {
            return JSON.parse(storage.getItem('usuario'));
        }
    
    
        function mostrarInfoProducto (array){
            contTarjetas.innerHTML = '';
    
            array.forEach(element => {
            let html = `<div class="card cardProducto" id="tarjeta${element.nombre}">
                <h3 class="card-header" id="nombreProducto"> Nombre: ${element.nombre}  
                </h3>
                <img src="${element.img}" alt="${element.nombre}" class="card-img-bottom" id="fotoProducto"></img>
                <div class="card-body">
                    <p class="card-text" id="precioProducto">Precio: ${element.precio}</p>
                </div>
            </div>`
    
        });
    
    
        }
    
    
        function presentarInfo(array, clase){
            array.forEach(element => {
                element.classList.toggle(clase);
            })
        }
    
    
        function estaLogueado(usuario){
    
            if (usuario){
                saludar(usuario);
                mostrarInfoProducto(producto);
                presentarInfo(elementosToggleables, 'd-none');
            }
        }
    
    
    
        function saludar(usuario) {
            nombreUsuario.innerHTML = `Bienvenido/a, <span>$(usuario.name}</span>`
        }
    
    
        btnLogin.addEventListener('click', (e) => {
            e.preventDefault();
            
            if(!inputMailLogin.value || !inputPassLogin.value){
                alert('Todos los campos son requeridos');
            }else{
                let data = validarUsuario(usuarios, inputMailLogin.value, inputPassLogin.value)
             if(!data){
                alert('Usuario y/o contraseña erróneos');
             }else{
                if(checkRecordar.checked){
                    guardarDatos(data,localStorage);
                    saludar(recuperarUsuario(localStorage));
                }else{
                    guardarDatos(data, sessionStorage);
                    saludar(recuperarUsuario(sessionStorage));
                }
    modal.hide()
    
    mostrarInfoProducto(productos);
    presentarInfo(elementosToggleables, 'd-none');
    
             } 
            }
    
        })
    
    
        window.onload=()=>{
            estaLogueado(recuperarUsuario(localStorage));
        }