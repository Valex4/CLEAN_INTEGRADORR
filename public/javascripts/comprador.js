const $btnSignIn= document.querySelector('.sign-in-btn'),
      $btnSignUp = document.querySelector('.sign-up-btn'),  
      $signUp = document.querySelector('.sign-up'),
      $signIn  = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active')
    }
});


const impresion1 = () =>{
    let expresionRegular =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let formularios = document.forms.registroComprador;
    let correo1 = formularios.elements.correo1;
    let nombre = formularios.elements.Usuario;
    let contra1 = formularios.elements.contra1;
    let apPaterno = formularios.elements.ap_paterno;
    let apMaterno = formularios.elements.ap_materno;
    let direccion = formularios.elements.direccion;
    if (
      !expresionRegular.test(correo1.value) ||
      nombre.value == "" ||
      contra1.value == "" ||
      apPaterno.value == "" ||
      apMaterno.value == "" ||
      direccion.value == "" 
    ) {
      
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: 'Se ha registrado correctamente!'
      })
    } else {  
      Swal.fire({
        timer: 2500,
        icon: 'error',
        title: 'Oops...',
        text: 'Error!',
        footer: '<a href="">Why do I have this issue?</a>'  
      });
    }
}

const impresion = () => {
    let expresionRegular =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let formularios = document.forms.loginComprador;
    let correo = formularios.elements.correo1;
    let contra = formularios.elements.contra1;

    if (
      !expresionRegular.test(correo.value) ||
      contra.value == "" 
    ) {
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error!',
        footer: '<a href="">Why do I have this issue?</a>'
      });
    }
};