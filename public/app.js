document.addEventListener('click', (event) => {
  const id = event.target.dataset.id

  if (event.target.dataset.type === 'remove') {
    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  } else if (event.target.dataset.type === 'edit') {
    const newTitle = prompt('Введите новое название')

    if (newTitle) {
      edit(id, newTitle).then(() => ({
        id: id,
        title: newTitle,
      }))
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
