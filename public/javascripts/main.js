//Angel Jair Tagua Gonzalez
try {
  const $btn = document.getElementById("btn");
  const formulario = ($btn, callback) => {
    $btn.addEventListener("click", callback);
  };
  formulario($btn, () => {
    let $email = document.getElementById("email").value;
    let expresionRegular =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (!expresionRegular.test($email)) {
      alert("CORREO INVALIDO");
    } else {
      let $nameForm = document.getElementById("name").value;
      let $mensaje = document.getElementById("mensaje").value;
      let numero = +529613865736;
      let win = window.open(
        `https://wa.me/${numero}?text=Hola%20mi%20nombre%20es%20${$nameForm}
        %20${$email}, Asunto: %20${$mensaje}`,
        "_blank"
      );
    }
  });
  const $user1 = document.getElementById("user1");
  const $user2 = document.getElementById("user2");
  const $user3 = document.getElementById("user3");

  const informationUser1 = ($user1, callback) => {
    $user1.addEventListener("click", callback);
  };
  const informationUser2 = ($user2, callback) => {
    $user2.addEventListener("click", callback);
  };
  const informationUser3 = ($user3, callback) => {
    $user3.addEventListener("click", callback);
  };

  informationUser1($user1, () => {
    const comment1 = document.getElementById("comment1");
    if (comment1.classList.contains("comment")) {
      comment1.innerHTML += `<p>a lo largo de mucho tiempo, estuve en la busqueda de un producto del cual me hidratara la piel sin sensacion grasosa, y finalmente lo encontre</p>`;
      comment1.classList.add("textoagregado");
      comment1.classList.remove("comment");
    } else {
      comment1.textContent = ` Los producto de clean skin restauro mi piel por completo `;
      comment1.classList.add("comment");
    }
  });

  informationUser2($user2, () => {
    const comment2 = document.getElementById("comment2");
    if (comment2.classList.contains("comment")) {
      comment2.innerHTML += `<p>debido a que mi tipo de piel es mixta, este producto me quito el acne de la zona T de mi rostro, la linea de productos de clean skin no irritan la piel</p>`;
      comment2.classList.add("textoagregado");
      comment2.classList.remove("comment");
    } else {
      comment2.textContent = ` En particular compre el produto pearl skin...`;
      comment2.classList.add("comment");
    }
  });
  informationUser3($user3, () => {
    const comment3 = document.getElementById("comment3");
    if (comment3.classList.contains("comment")) {
      comment3.innerHTML += `<p> son productos naturales, sin quimicos o parabenos, siento alivio porque se que piel no esta siendo dañada por algun quimico</p>`;
      comment3.classList.add("textoagregado");
      comment3.classList.remove("comment");
    } else {
      comment3.textContent = ` Los productos de clean skin me agradan debido que `;
      comment3.classList.add("comment");
    }
  });
} catch (e) {
  window.alert("Han manipulado el archivo JavaScript");
}
