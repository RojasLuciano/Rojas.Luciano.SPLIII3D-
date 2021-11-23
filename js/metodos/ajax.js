// Metodos Ajax

export const getDatosAjax = (callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        const datos = JSON.parse(xhr.responseText);
        callback(datos);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        console.error(`Error: ${xhr.status} : ${statusText}`);
      }
    } else {
  
    }
   
  };

  //abrir la petecion
  xhr.open("GET", "http://localhost:3000/anuncios");
  //enviar la peticion
  xhr.send();
  
};

//Post
export const postDatosAjax = (objeto, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        const data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        console.error(`Error: ${xhr.status} : ${statusText}`);
      }
    } else {
      //inyectarSpinner();
    }

    //removerSpinner();
  };
  xhr.open("POST", "http://localhost:3000/anuncios");
  //seteamos las cabecera
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.send(JSON.stringify(objeto));
};
//delete solo necesito el ID
export const deleteDatosAjax = (id, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        const data = JSON.parse(xhr.responseText);
        //removerSpinner();
        callback(data);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        console.error(`Error: ${xhr.status} : ${statusText}`);
      }
    } else {
      //inyectarSpinner();
    }
    
  };

  xhr.open("DELETE", `http://localhost:3000/anuncios/${id}`);

  xhr.send();
};

export const putDatosAjax = (id, objeto, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        const data = JSON.parse(xhr.responseText);
        //removerSpinner();
        callback(data);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        console.error(`Error: ${xhr.status} : ${statusText}`);
      }
    } else {
      //inyectarSpinner();
    }
     //saco
  };
  xhr.open("PUT", `http://localhost:3000/anuncios/${id}`); // a la ruta el maando el ID
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.send(JSON.stringify(objeto)); // en la cabecera envio el objeto
  
};
