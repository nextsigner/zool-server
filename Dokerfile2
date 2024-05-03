# Usa una imagen base que contenga un sistema operativo base
FROM ubuntu:20.04
ENV DEBIAN_FRONTEND noninteractive

# Actualiza el sistema e instala GCC 17 y otras herramientas de compilación
RUN apt-get update && apt-get install -y \
    g++7 git nano

ENV NODE_VERSION=14.14.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

#MongoDB
RUN apt install -y mongodb
RUN service mongodb start

# Establece el directorio de trabajo
WORKDIR /root/zs

# Puedes agregar más instrucciones aquí según tus necesidades

# Define el comando predeterminado para ejecutar cuando se inicie el contenedor
CMD ["bash"]
