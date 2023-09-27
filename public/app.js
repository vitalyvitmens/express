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
      edit(newTitle).then(() => {
        console.log('editId:', id)
        // event.target.closest('li')
      })
    }
  }
})

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(id) {
  await fetch(`/${id}`, { method: 'PUT' })
}
