Para que todo corra, hay que asegurarse que se tenga contenedor de RabbitMQ corriendo en docker.

Inicializar el docker:
docker run -it -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management

Una vez que este iniciado en docker, iniciar sesion en RabbitMQ:
http://localhost:15672/ 
user: guest
pass: guest