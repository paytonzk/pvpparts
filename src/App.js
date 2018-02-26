const app = {
  init(selectors) {
    this.myStorage = localStorage
    this.parts = []
    this.max = 1
    this.list = document.querySelector(selectors.listSelector)
    this.template = document.querySelector(selectors.templateSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener(
        'submit', 
        this.handleSubmit.bind(this)
      )
  },

  favpart(part, ev) {
    const listItem = ev.target.closest('.part')
    part.fav = !part.fav

    if (part.fav) {
      listItem.classList.add('fav')
    } else {
      listItem.classList.remove('fav')
    }
  },

  removepart(part, ev) {
    const listItem = ev.target.closest('.part')
    listItem.remove()

    const i = this.parts.indexOf(part)
    this.parts.splice(i, 1)
  },

  uppart(part, ev){
    const li = ev.target.parentNode.parentNode
    if(li.previousElementSibling === null){
      return;
    }
    this.list.insertBefore(li, li.previousElementSibling)
    const pos = this.parts.indexOf(part)
    const temp = this.parts[pos]
    this.parts[pos] = this.parts[pos - 1]
    this.parts[pos - 1] = temp
  },

  downpart(part, ev){
    const li = ev.target.parentNode.parentNode
    if(li.nextElementSibling === null){
      return
    }
    const nextSibling = li.nextElementSibling
    this.list.insertBefore(nextSibling, li)
    const pos = this.parts.indexOf(part)
    const temp = this.parts[pos]
    this.parts[pos] = this.parts[pos + 1]
    this.parts[pos + 1] = temp
  },

  renderListItem(part) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = part.id
    item
      .querySelector('.part-name')
      .textContent = part.name

    item
      .querySelector('button.remove')
      .addEventListener(
        'click', 
        this.removepart.bind(this, part)
      )

    item
      .querySelector('button.fav')
      .addEventListener(
        'click', 
        this.favpart.bind(this, part)
      )

      item
      .querySelector('button.up')
      .addEventListener(
        'click', 
        this.uppart.bind(this, part)
      )

      item
      .querySelector('button.down')
      .addEventListener(
        'click', 
        this.downpart.bind(this, part)
      )
    
    return item
  },

  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target
    const part = {
      id: this.max,
      name: f.partName.value,
      fav: false,
    }

    this.parts.unshift(part)

    const listItem = this.renderListItem(part)
    localStorage.setItem(this.max, listItem)
    this.list
      .insertBefore(listItem, this.list.firstElementChild)

    this.max ++
    f.reset()
  },

  search(){
    const input = document.getElementById('myInput')
    const filter = input.value.toUpperCase()
    const items = this.list.getElementsByTagName('li')
    for (i = 0; i < items.length; i++) {
        a = items[i];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = ""
        } else {
            items[i].style.display = "none"
        }
    }
  },
}

app.init({
  formSelector: 'form#part-form',
  listSelector: '#part-list',
  templateSelector: '.part.template',
})