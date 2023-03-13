// querySelector methodu ile html'de ki ilgili eventlere id üzerinden erişiyoruz.
let userFormDOM = document.querySelector('#userForm');
let userListDOM = document.querySelector('#userList');
let taskDOM = document.querySelector('#task');
let allLiDOM = document.querySelector('li');

// Liste içerisine yeni bir task eklemek için bu fonksiyon çalışıyor.
function elementAdd(){

    // İnputun içerisiği boşsa error ver ve kayıt yapma. Ve trim fonksiyonu "boşluk" karakteri girildiyse bunu boş kabul etmesi için var.
    if(!taskDOM.value  || !taskDOM.value.trim()){

        // Sağ üst köşe de çıkmasını istediğimiz bildirim.
        $(".error").toast('show')

    }else{

        // inputdan bilgi geldiyse task ekleme fonksiyonuna inputun değerini gönderiyoruz. 
        addTask(taskDOM.value);

        // inputun içerisini sıfırladık.
        taskDOM.value = "";
    }
}

// Liste icerisinde bulunan secilen task'in silinmesini ilgilendiren fonksiyon.
function elementDelete(item){

    // remove methodu ile ilgili taski silmiş oluyoruz.
    item.remove();

    // localStorage üzerinden veriyi silmek için.
    removeStorage(item);
}

// Üzerine basılan taskin tamamlandığını belirtmek için rengini değiştiriyoruz.
function markTask(){

    // Bootsrap özelliğini kullanarak 'checked' yani işaretlendi olarak göstererek bu sayede tamamlandı işlemini yapıyoruz. 
    this.classList.toggle('checked');
}

// Task eklemek için kullanıyoruz. task parametresi gönderiyoruz.
const addTask = (task) => {

    // Yeni bir li oluşturuyoruz.
    let liDOM = document.createElement('li');

    // Oluşturduğumuz li elementinin içeriğini belirtiyoruz. 
    liDOM.innerHTML = `
    ${task}
    <span class="btn btn-secondary badge badge-primary badge-pill" onclick="elementDelete(parentNode)">x</span>
    `
    liDOM.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'); // classList verdik.

    liDOM.addEventListener("click", markTask);  // Taskin tamamlanmasındaki tıklama eventini burada veriyoruz. Fonksiyon yukarıda tanımlanmıştı.

    // En dışta yer alan listenin içerisine eklenmiştir.
    userListDOM.append(liDOM);

    // Ekleme işleminin tamamlandığını gösteren bildirim.
    $(".success").toast('show');

    // localStorage içerisine veriyi eklemek için kullandığımız fonksiyon.
    setStorage();
} 

// localStorage içerisine veri kaydetmek için kullanıyoruz.
function setStorage(){
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));
    toDoList.push(`${taskDOM.value}`);
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

// localStorage içerisinden veri silmek için kullanıyoruz.
function removeStorage(item){
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));
    let index = toDoList.indexOf(item);
    if (index > -1) {
    toDoList.splice(index, 1);
    }
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

function localSelf(){
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));
    if(!toDoList) {toDoList = []};
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

function localDOM(){
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));
    toDoList.forEach((e, index) => {
        let liDOM = document.createElement("li");
        liDOM.innerHTML = `
        ${toDoList[index]}
        <span class="btn btn-secondary badge badge-primary badge-pill" onclick="elementDelete(parentNode)">x</span>
        `
        liDOM.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'); // classList verdik.

        liDOM.addEventListener("click", markTask);  // Taskin tamamlanmasındaki tıklama eventini burada veriyoruz. Fonksiyon yukarıda tanımlanmıştı.

        // En dışta yer alan listenin içerisine eklenmiştir.
        userListDOM.append(liDOM);
    })
}

localSelf()

localDOM()