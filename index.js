//Задание 2 - Создайте программу, которая будет добавлять посты на страницу.

const postsDisplay = document.querySelector(".main-formDisplay"); //находим разметку, куда будут помещаться созданные посты

let btn = document.querySelector(".button_createPost"); // находим кнопку и задаем переменную
let totalStringVDom = " ";

btn.onclick = function (e) {
  //создаем функцию, которая будет срабатывать при клике на кнопку
  e.preventDefault(); //отменяем дефолтное submit у кнопки

  let post = {
    //задаем переменную для поста и помещаем в массив значения для title и body, которые будем получать из полей ввода
    title: document.getElementById("postTitle").value,
    body: document.getElementById("postBody").value,
  };
  fetch("https://jsonplaceholder.typicode.com/posts", {
    //пишем функцию, которая делает POST-запрос по указанному выше адресу, передает туда свойства из массива, созданного выше
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      //имеет свойство headers c единственным заголовком, указанным ниже
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json()) //преобразовывает данные в json
    .then((post) => {
      //помещает значение из массива, созданного ранее (post) в разметку
      totalStringVDom =
        `<div class="post"><div class="post_title">${post.title}</div>
      <div class="post_body">${post.body}</div></div>` + totalStringVDom;
      postsDisplay.innerHTML = totalStringVDom;
      (document.getElementById("postTitle").value = " "), //очищает поля ввода
        (document.getElementById("postBody").value = " ");
    });
};

//Задание 1 - Нужно получить с сервера список постов и отобразить его на странице.

const postsList = document.querySelector(".main-list"); //находим разметку, куда нужно поместить посты

const createCard = (obj) => {
  // создаем функцию, которая создает элементы разметки и помещает туда элементы из массива (посты)
  const item = document.createElement("div"); // создаем переменную, которая создает div, который будет содержать в себе пост
  item.className = "list_item"; //добавляем класс с выше созданной переменной
  const title = document.createElement("div"); // создаем переменную, которая создает div, который будет содержать в себе название поста
  title.className = "item_title"; //добавляем класс с выше созданной переменной
  title.textContent = `Title: ${obj.title}`; //добавляем текстовое содержимое к выше созданной переменной
  const body = document.createElement("div"); // создаем переменную, которая создает div, который будет содержать в себе сам пост
  body.className = "item_body"; //добавляем класс с выше созданной переменной
  body.textContent = `Article: ${obj.body}`; //добавляем текстовое содержимое к выше созданной переменной

  item.append(title); // вставляем название поста в div, содержащий пост
  item.append(body); // вставляем тело поста в div, содержащий пост

  return item; // возвращаем карточку с постом
};

const addCard = (objItem, container) => {
  // создаем функцию, которая будет добавлять новые посты к уже созданным
  const item = createCard(objItem); // создаем переменную и передаем ей созданный ранее объект
  container.append(item); //вставляем объект выше в контейнер
};

fetch("https://jsonplaceholder.typicode.com/posts") //создаем функцию, которая делает GET запрос по адресу https://jsonplaceholder.typicode.com/posts
  .then((response) => response.json()) // преобразовывает полученные данные в массив
  .then(
    (
      posts //применяет к элементам массива функцию, которая
    ) =>
      posts.forEach((element) => {
        addCard(element, postsList); // создает из каждого карточку по выше созданной функции и добавляет их на страницу
      })
  );
