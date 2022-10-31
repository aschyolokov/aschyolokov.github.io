'use strict';

// --------------------------------------------------------------------- [Class Vector] ---------------------------------------------------
// Контроль расположения объектов в двухмерном пространстве и управление их размером и перемещением

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // Создает и возвращает новый Vector, координаты равны сумме соответствующих векторов
  plus(vector) {
    if (!(vector instanceof Vector)) {
      throw new Error('Можно прибавлять к вектору только вектор типа Vector');
    }

    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  // Создает и возвращает новый Vector, координаты равны произведению координат исходного вектора на множитель
  times(multiple) {
    return new Vector(this.x * multiple, this.y * multiple);
  }
}

// --------------------------------------------------------------------- [Class Actor] ---------------------------------------------------
// Контроль всех движущихся объектов на игровом поле и контроль их пересечения

class Actor {
  constructor(pos = new Vector(), size = new Vector(1,1), speed = new Vector()) {
    if (!(pos instanceof Vector) || !(size instanceof Vector) || !(speed instanceof Vector)) {
      throw new Error('В параметры можно передать только объект типа Vector');
    }

    this.pos = pos;
    this.size = size;
    this.speed = speed;
  }

  act () {}

  get left() {
    return this.pos.x;
  }

  get top() {
    return this.pos.y;
  }

  get right() {
    return this.left + this.size.x;
  }

  get bottom() {
    return this.top + this.size.y;
  }

  get type() {
    return 'actor';
  }

  // Проверка на пересечение текущего объекта с переданным объектом, возвращает true, если пересекаются
  isIntersect(actor) {
    if (!(actor instanceof Actor)) {
      throw new Error('Нужно добавить параметр или в параметре объект не типа Vector');
    }
    
    return this !== actor && 
           this.right > actor.left &&
           this.left < actor.right &&
           this.bottom > actor.top &&
           this.top < actor.bottom;
  }
}

// --------------------------------------------------------------------- [Class Level] ---------------------------------------------------
// Схема игрового поля конкретного уровня, контроль всех движущихся объектов и логика игры

class Level {
  constructor(grid = [], actors = []) {
    this.grid = grid; // Сетка игрового поля. Двумерный массив строк
    this.actors = actors; // Список движущихся объектов игрового поля
    this.player = this.actors.find((actor) => actor.type === 'player'); // Движущийся объект
    this.height = grid.length;
    this.status = null; // Состояние прохождения уровня
    this.finishDelay = 1; // Таймаут после окончания игры
  }

  get width() {
    const rowsGridLength = this.grid.map(row => row.length);

    return this.height > 0 ? Math.max(...rowsGridLength) : 0;
  }

  // Проверка завершения прохождения уровня
  isFinished() {
    return this.status !== null && this.finishDelay < 0;
  }

  // Определяет, расположен ли какой-то другой движущийся объект в переданной позиции
  actorAt(actor) {
    if (!(actor instanceof Actor)) {
      throw new Error('Нужно добавить параметр или в параметре объект не типа Vector');
    }

    return this.actors.find(item => item.isIntersect(actor));
  }

  // Определяет, нет ли препятствия в указанном месте, и контроллирует выход объекта за границы игрового поля
  obstacleAt(pos, size) {
    if (!(pos instanceof Vector) || !(size instanceof Vector)) {
      throw new Error('В параметры передан объект не типа Vector');
    }

    const currentActor = new Actor(pos, size);
    const currentActorLeft = Math.floor(currentActor.left);
    const currentActorRight = Math.ceil(currentActor.right);
    const currentActorTop = Math.floor(currentActor.top);
    const currentActorBottom = Math.ceil(currentActor.bottom);

    if (currentActorLeft < 0 || currentActorRight > this.width || currentActorTop < 0) {
      return 'wall';
    }
    
    if (currentActorBottom > this.height) {
      return 'lava';
    }

    for (let y = currentActorTop; y < currentActorBottom; ++y) {
      for (let x = currentActorLeft; x < currentActorRight; ++x) {
        const type = this.grid[y][x];
        if (type) {
          return type;
        }
      }
    }
  }

  // Удаляет переданный объект с игрового поля
  removeActor(actor) {
    if (actor !== undefined) {
      this.actors.splice(this.actors.indexOf(actor), 1);
    }
  }

  // Определяет, остались ли еще объекты переданного типа на игровом поле
  noMoreActors(typeActor) {
    return !this.actors.some(actor => actor.type === typeActor);
  }

  // Меняет состояние игрового поля при касании игрока каких-либо объектов или препятствий
  playerTouched(type, coin) {
    switch(type) {
      case 'lava':
      case 'fireball': 
        this.status = 'lost';
        break;
      case 'coin':
        if (coin !== undefined) {
          this.removeActor(coin);
        }

        if (this.noMoreActors(type)) {
          this.status = 'won';
        }
        break;
      default:
        return;
    }
  }
}

// --------------------------------------------------------------------- [Class LevelParse] ---------------------------------------------------
// Создание игрового поля Level

class LevelParser {
  constructor(set) {
    this.set = set; // Словарь движущихся объектов игрового поля
  }

  // Возвращает конструктор объекта по его символу, используя словарь
  actorFromSymbol(symbol) {
    if (symbol && this.set !== undefined) {
      return this.set[symbol];
    }
  }

  // Возвращает строку, соответствующую символу припятствия
  obstacleFromSymbol(symbol) {
    if (symbol) {
      switch (symbol) {
        case 'x': 
          return 'wall';
        case '!':
          return 'lava';
        default:
          return;
      }
    }
  }
  // Принимает массив строк и преобразует его в массив массивов, в ячейках которого хранится либо строка соответствующая препятствию, либо undefined
  createGrid(list) {
    const listElemsGrid = list.map(str => str.split(''));

    return listElemsGrid.map(row => {
      return row.map(cell => this.obstacleFromSymbol(cell));
    });
  }

  // Принимает массив строк и преобразует его в массив движущихся объектов
  createActors(strList) {
    const actionObjList = [];

    strList.forEach((itemX, i) => {
      itemX.split('').forEach((itemY, j) => {
        if (typeof this.actorFromSymbol(itemY) === 'function') {
          actionObjList.push(new (this.actorFromSymbol(itemY))(new Vector(j, i)));
        }
      });
    });

    return actionObjList.filter(actor => actor instanceof Actor);
  }

  // Принимает массив строк, создает и возвращает игровое поле, заполненное препятсвиями и движущимися объектами 
  parse(plan) {
    return new Level(this.createGrid(plan), this.createActors(plan));
  }
}

// --------------------------------------------------------------------- [Class Fireball] ---------------------------------------------------
// Прототип для движущихся препятствий

class Fireball extends Actor {
  constructor(pos = new Vector(0, 0), speed = new Vector(0, 0)) {
    super(pos, new Vector(1, 1), speed);
  }

  get type() {
    return 'fireball';
  }

  // Создает и возвращает Vector следующей позиции
  getNextPosition(time = 1) {
    return new Vector(this.pos.x + (this.speed.x * time), this.pos.y + (this.speed.y * time));
  }

  // Обработка столкновения с препятствием (изменение вектора направления на противоположный)
  handleObstacle() {
    const MULTIPLE = -1;
    const thisSpeedX = this.speed.x * MULTIPLE;
    const thisSpeedY = this.speed.y * MULTIPLE;
    this.speed = new Vector(thisSpeedX, thisSpeedY);
  }

  // Обновление состояния движущегося объекта
  act(time, level) {
    if (level.obstacleAt(this.getNextPosition(time), this.size)) {
      this.handleObstacle();
    } else {
      this.pos = this.getNextPosition(time);
    }
  }
}

// --------------------------------------------------------------------- [Class HorizontalFireball] ---------------------------------------------------
// Объект, движущийся по горизонтали, и при столкновении с препятствием изменяет направление на противоположное
class HorizontalFireball extends Fireball {
  constructor(pos) {
    super(pos, new Vector(2, 0));
  }
}

// --------------------------------------------------------------------- [Class VerticalFireball] ---------------------------------------------------
// Объект, движущийся по вертикали, и при столкновении с препятствием изменяет направление на противоположное
class VerticalFireball extends Fireball {
  constructor(pos) {
    super(pos, new Vector(0, 2));
  }
}

// --------------------------------------------------------------------- [Class FireRain] ---------------------------------------------------
// Объект, движущийся по горизонтали, и при столкновении с препятствием начинает движение из исходного положения, которое задано при создании
class FireRain extends Fireball {
  constructor(pos) {
    super(pos, new Vector(0, 3));
    this.basePos = this.pos; // Начальная позиция
  }

  handleObstacle() {
    this.pos = new Vector(this.basePos.x, this.basePos.y);
  }
}

// --------------------------------------------------------------------- [Class Coin] ---------------------------------------------------
// Монета
class Coin extends Actor {
  constructor(pos) {
    super(pos, new Vector(0.6, 0.6));
    this.pos = this.pos.plus(new Vector(0.2, 0.1))
    this.basePos = this.pos; // Начальная позиция
    this.springSpeed = 8; // Скорость подпрыгивания
    this.springDist = 0.07; // Радиус подпрыгивания
    this.spring = Math.random() * 2 * Math.PI; // Фаза подпрыгивания
  }

  get type() {
    return 'coin';
  }
  
  // Обновление фазы подпрыгивания
  updateSpring(time = 1) {
    this.spring += this.springSpeed * time;
  }

  // Обновление текущей фазы
  getSpringVector() {
    const newY = Math.sin(this.spring) * this.springDist;
    return new Vector(0, newY);
  }

  // Обновление текущей фазы
  getNextPosition(time = 1) {
    this.updateSpring(time);
    return this.basePos.plus(this.getSpringVector());
  }

  act(time = 1) {
    this.pos = this.getNextPosition(time);
  }
}

// --------------------------------------------------------------------- [Class Player] ---------------------------------------------------
// Игрок
class Player extends Actor {
  constructor(pos) {
    super(pos, new Vector(0.8, 1.5), new Vector(0, 0));
    this.pos = this.pos.plus(new Vector(0, -0.5));
  }

  get type() {
    return 'player';
  }
}

// --------------------------------------------------------------------- Start game ---------------------------------------------------

// Словарь объектов
const actorDict = {
  'x': Actor,
  '!': Actor,
  '@': Player,
  'o': Coin,
  '=': HorizontalFireball,
  '|': VerticalFireball,
  'v': FireRain
};

const parser = new LevelParser(actorDict);

loadLevels()
  .then(schemas => runGame(JSON.parse(schemas), parser, DOMDisplay)
  .then(() => alert('Поздравляю! Вы прошли игру!')));