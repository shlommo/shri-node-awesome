# Домашнее задание по темам "Инфраструктура", "Node.js", "Тесты"


## Установка
```
npm i
```

Сервер стартует по адресу: http://0.0.0.0:8080/
## Запуск сервера в Dev режиме
```
npm start

npm run server:dev
```
## Запуск сервера в Production режиме
```
npm run server:prod
```

### Dev-сборка(слежение за изменением проекта)
```
npm run watch
```

### Production-сборка
```
npm run build
```

Чтобы развернуть docker контейнер для запуска приложения на хероку, необходимо было выполнить команды:
```
heroku stack:set container -a shri-node-awesome-master
heroku stack:set container -a shri-node-awesome-production
```

Travis CI:
https://travis-ci.org/szhakupbekov/shri-node-awesome/branches
