FROM node:20

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia os arquivos do projeto para o container
COPY . .

# Instala as dependências
RUN npm install

# Expõe a porta 3000
EXPOSE 3000

# Define o comando para rodar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]
