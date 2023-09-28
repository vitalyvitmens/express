document.addEventListener('click', (event) => {
  const id = event.target.dataset.id

  if (event.target.dataset.type === 'remove') {
    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  } else if (event.target.dataset.type === 'edit') {
    // обработка клика на клиенте
    const newTitle = prompt('Введите новое название')

    if (newTitle) {
      edit(id, newTitle).then(() => {
        console.log('From app.js edit id:', id)
        console.log('From app.js edit newTitle:', newTitle)
        // event.target.closest('li')
      })
    }
  }
})

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(id, title) {
  console.log('From app.js function edit(id):', id)
  console.log('From app.js function edit(title):', title)
  await fetch(`/${id}`, { method: 'PUT' })
}
