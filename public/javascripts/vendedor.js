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
  entrada=false;
  let expresionRegular =/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      let formulario1 = document.forms.registroVendedor;
      let nombre=formulario1.elements.nombreUsuario;
      let correo1 = formulario1.elements.correo;
      let contrasena1 = formulario1.elements.contraseña;
      let ap_paterno = formulario1.elements.ap_paterno;
      let ap_materno = formulario1.elements.ap_materno;
  
      if(!expresionRegular.test(correo1.value) || contrasena1.value==="" || nombre.value=="" || ap_paterno.value==""  || ap_materno.value=="") {
      Swal.fire({
        timer: 2500,
        icon: 'error',
        title: 'Oops...',
        text: 'Error!',
        footer: '<a href="">Why do I have this issue?</a>'  
      });
      return RETOR(entrada);
    } else {
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
    }
}

const impresion = () => {
  entrada=false
    let expresionRegular =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let formularios = document.forms.loginVendedor;
    let correo = formularios.elements.correo;
    let contra = formularios.elements.contraseña;

    if (
      !expresionRegular.test(correo.value) ||
      contra.value == "" 
    ) {
        Swal.fire({
          timer: 2500,
          icon: 'error',
          title: 'Oops...',
          text: 'Error!',
          footer: '<a href="">Why do I have this issue?</a>'  
        });
        return RETOR(entrada)
    } else {
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
    }
};