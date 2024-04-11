function save() {
  var title = document.getElementById('eventTitle').value;
  var description = document.getElementById('eventDescription').value;
  var date = document.getElementById('eventDate').value;

  if (title !== "" && description !== "" && date !== "") {
  document.getElementById('displayEventTitle').innerText = title;
  document.getElementById('displayEventDescription').innerText = description;
  document.getElementById('displayEventDate').innerText = date;

  document.getElementById('addWish').style.display = "inline-block";
  document.getElementById('print').style.display = "inline-block";
  document.getElementById('rowWish').style.display = "flex";
} else {
  document.getElementById('addWish').style.display = "none";
  document.getElementById('print').style.display = "none";
  document.getElementById('rowWish').style.display = "none";
}

  document.getElementById('eventTitle').value = "";
  document.getElementById('eventDescription').value = "";
  document.getElementById('eventDate').value = "";
}

function add() {
  
  var giftName = document.getElementById('giftName').value;
  var giftImage = document.getElementById('giftImage').value;
  var giftPrice = document.getElementById('giftPrice').value;
  var giftLink = document.getElementById('giftLink').value;

if (giftName !== "" && giftImage !== "" && giftPrice !== "" && giftLink !== ""){
  var newItem = document.createElement('div');
  newItem.className = "wishlist-item";
  newItem.innerHTML = '<h3>' + giftName + '</h3>' + 
                      '<img src="' + giftImage + '" alt="' + giftName + '">' +
                      '<h5>' + giftPrice + ' руб.' + '</h5>' +
                      '<button class="bt" onclick="remove(this)"><i class="bi bi-trash3-fill" ></i></button>' +
                      '<button class="bt edit-btn" data-bs-toggle="modal" data-bs-target="#editGiftModal" onclick="edit(this.parentNode)"><i class="bi bi-pencil-fill"></i></button>'+ 
                      '<button class="btn btn-dark shop" data-link="' + giftLink + '" onclick="redirect(this)">В магазин</button>'; // добавляем атрибут data-link

  document.getElementById('wishlistItems').appendChild(newItem);}
  else{
    
      alert("Пожалуйста, заполните все поля для добавления подарка.");
    }
  

  document.getElementById('giftName').value = "";
  document.getElementById('giftImage').value = "";
  document.getElementById('giftPrice').value = "";
  document.getElementById('giftLink').value = "";
}

function redirect(button) {
  var giftLink = button.getAttribute('data-link');
  window.open(giftLink, '_blank'); 
}

function remove(element) {
  element.parentNode.remove();
}

const today = new Date();
const formattedToday = today.toISOString().slice(0, 10);
document.getElementById('eventDate').setAttribute('min', formattedToday);

function edit(element) {
  var giftName = element.querySelector('h3').innerText;
  var giftImage = element.querySelector('img').getAttribute('src');
  var giftPrice = element.querySelector('h5').innerText;
  var giftLink = element.querySelector('.shop').getAttribute('data-link');
  
  
  document.getElementById('editGiftName').value = giftName;
  document.getElementById('editGiftImage').value = giftImage;
  document.getElementById('editGiftPrice').value = giftPrice;
  document.getElementById('editGiftLink').value = giftLink;

  var saveButton = document.getElementById('saveEdit');
  saveButton.onclick = function() {
    element.querySelector('h3').innerText = document.getElementById('editGiftName').value;
    element.querySelector('img').setAttribute('src', document.getElementById('editGiftImage').value);
    element.querySelector('img').setAttribute('alt', document.getElementById('editGiftName').value);
    element.querySelector('h5').innerText = document.getElementById('editGiftPrice').value;
    element.querySelector('.shop').setAttribute('data-link', document.getElementById('editGiftLink').value);

  };

 
}

function printWishlist() {
  var wishlistItems = document.getElementById('wishlistItems').children;

  var printContent = '<h1 style="text-align: center;">Список желаний</h1><ul> <style>@media print { img { max-width: 500px; max-height: 500px; } }</style>';

  for (var i = 0; i < wishlistItems.length; i++) {
    var itemName = wishlistItems[i].querySelector('h3').textContent;
    var itemImage = wishlistItems[i].querySelector('img').getAttribute('src');
    var itemPrice = wishlistItems[i].querySelector('h5').textContent;

    printContent += '<li>' + itemName + ' - ' + itemPrice + '<br/><img src="' + itemImage + '"></li>';
  }

  printContent += '</ul>';

  var w = window.open();
  w.document.write(printContent);
  w.print();
  w.close();
}

document.addEventListener("DOMContentLoaded", function() {
  printWishlist();
});
