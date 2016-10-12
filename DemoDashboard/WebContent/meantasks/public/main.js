var update = document.getElementById('update')
alert('update')
update.addEventListener('click', function () {
// Send PUT Request here
}
)


app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({Item: 'Monsoon'}, {
    $set: {
      Item: req.body.Item,
      Details: req.body.Details
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

fetch({ /* request */ })
.then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.log(data)
  window.location.reload(true)
})
