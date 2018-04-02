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

## Тестирование
Добавлены модульные и интеграционные тесты.
Для тетирования промисов я использовал плагин chai-as-promised(расширяет возможности стнадартного chai).

Для модульных тестов нужно склонировать демо-репозиторий
```
npm run clone-repo
```
далее запустить команду:
```
npm test
```

Для запуска интеграционных тестов нужно сперва установить selenium локально, потом запустить его
```
npm run selenium:install
npm run selenium
```
далее в новой вкладке терминала запустить hermione
```
npm run hermione
```

