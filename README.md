# Weather Now

Aplicação web que exibe a temperatura em três cidades diferentes utilizando a [API do OpenWeatherMap](https://openweathermap.org/api).

## Executando a aplicação

Esse repositório contém toda a estrutura da camada de front-end (que é visualizada no client-side).

Para acessar a aplicação em ambiente de desenvolvimento (dev), é necessário instalar os pacotes necessários e então acionar o servidor local.

### Instalando os pacotes do Node (NPM)

Executar o comando ```npm install``` na raiz do projeto.

#### Variável de ambiente

Para que a chamada à API do OpenWeatherMap funcione corretamente, um arquivo ```.env``` deve ser criado na pasta raiz do projeto contendo o _ACCOUNT_APPID_ da conta que será utilizada seguindo o formato abaixo.

```
ACCOUNT_APPID=87be0f03d77bdbe5bba92410c0f4d160
```

### Ligando o servidor local com a aplicação

Após instalados todos os pacotes, executar o comando ```npm run dev``` também na raiz do projeto.

Uma nova aba do navegador padrão será aberta executando a aplicação em ambiente de desenvolvimento.

## Principais recursos utilizados

* Webpack - https://webpack.js.org/
* React - https://reactjs.org/
* Moment.js - https://momentjs.com/
* Sass - https://sass-lang.com/