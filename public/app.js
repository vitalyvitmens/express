document.addEventListener('click', (event) => {
  const id = event.target.dataset.id

  if (event.target.dataset.type === 'remove') {
    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  }

  if (event.target.dataset.type === 'edit') {
    const newTitle = prompt('Введите новое название')

    if (newTitle) {
      edit({ title, id }).then(() => {
        event.target.dataset.title = newTitle
      })
    }
  }
})

// if (event.target.dataset.type === 'edit') {
//   const $task = event.target.closest('li')
//   const title = event.target.dataset.title
//   const initialHtml = $task.innerHTML

//   $task.innerHTML = `
//     <input type="text" value="${title}">
//     <div>
//       <button class="btn btn-success" data-type="save">Сохранить</button>
//       <button class="btn btn-danger" data-type="cancel">Отменить</button>
//     </div>
//   `

//   const taskListener = ({ target }) => {
//     if (target.dataset.type === 'cancel') {
//       $task.innerHTML = initialHtml
//       $task.removeEventListener('click', taskListener)
//     }
//     if (target.dataset.type === 'save') {
//       const title = $task.querySelector('input').value
//       edit({ title, id }).then(() => {
//         $task.innerHTML = initialHtml
//         $task.querySelector('span').innerText = title
//         $task.querySelector('[data-type=edit]').dataset.title = title
//         $task.removeEventListener('click', taskListener)
//       })
//     }
//   }

//   $task.addEventListener('click', taskListener)
// }
// })

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(newNote) {
  await fetch(`/${newNote.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
  })
}
