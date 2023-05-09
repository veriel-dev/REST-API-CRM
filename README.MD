# Web Services, API'S y REST API'S .

## Web Services

Un Web Services es un software que permite intercambiar datos entre aplicaciones vía web utilizando un protocolo de comunicación HTTP.

En su forma más simple se dice que cuando una computadora se conecta a otra para obtener información en un web service. 
Exist una gran cantidad estándares: `XML`, `SOAP`, `REST` y `GRAPHQL`.

## API'S

API = Application Programming Interface
Se denomina `interfaz de progrmación de aplicaciones` a ls funciones o méodos que ofrece una librería para ser utilizada por otro software y acceder a sus recursos.

No siempre es vía web, puede ser que se accedan a laos recursos por medio de una arhcivo.

Par acceder al servicio hay que envair una petición estructuradad.

* Web Services ----- Apis
* Apis -----!---- Web Services 

## REST API'S

* REST = Representational State Transfer

* Es un estilos arquitectura de software que define un patrón para hacer apis.
Define cómo se acceder a los recursos de un api existente.

* Pueden ser consumidas en cualquier lenguaje de programación.

* Responde a los Request de http: GET, POST, PUT, DELETE.



# x-forwarded-for 

El campo de encabezado HTTP x-forwarded-for es un método común para identificar la dirección IP de origen de un cliente que se conecta a un servidor web a través de un proxy HTPP o un balanceador de carga.